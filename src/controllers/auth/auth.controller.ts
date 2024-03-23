import { Request, Response } from 'express'
import User from '../../models/user.entity'
import Token from '../../models/token.entity'
import bcrypt from 'bcrypt'

export default class AuthController {
  static async store(req: Request, res: Response) {
    const { name, email, password } = req.body

    if (!name) return res.status(400).json({ error: 'O nome é obrigatório' })
    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!password) return res.status(400).json({ error: 'A senha é obrigatória' })

    const user = new User()
    user.name = name
    user.email = email
    // Gera a hash da senha com bcrypt - para não salvar a senha em texto puro
    user.password = bcrypt.hashSync(password, 10) //10 é os rounds
    await user.save() //await espera tudo terminar para devolver o objeto

    // Não vamos retornar a hash da senha
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!password) return res.status(400).json({ error: 'A senha é obrigatória' })

    //if(!email || !password )return res.status(400).json({ error: 'O email e senha são  obrigatórios' })

    const user = await User.findOneBy({ email })
    if (!user) return res.status(401).json({ error: 'Usuário ou senha não encontrado' })

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) return res.status(401).json({ error: 'Senha inválida' })

    // Remove todos os tokens antigos do usuário (não fazer quando quer que ele seja válido em 
    //para acesso em outros dispositivos por exemplo) depende do sistema que usa mais logins
    await Token.delete(
      { user: { id: user.id } }
    )
    //criar um token novo
    const token = new Token()

    // Gera um token aleatório
    //ex 1
    //let numberRand =  Math.random()
    //numberRand *= user.id
    //const stringRand =  numberRand.toString(36) + Date().toString()
    // ou 
    //const stringRand = id.toString(36) + new Date().to
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)//opção do professor

    // Define a data de expiração do token para 1 hora
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    // Gera um refresh token aleatório
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)

    token.user = user
    await token.save()

    //devolvendo as informações para o usuário as informações para novo token
    return res.json({
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }

  static async refresh(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) return res.status(400).json({ error: 'O refresh token é obrigatório' })

    const token = await Token.findOneBy({ refreshToken: authorization })
    if (!token) return res.status(401).json({ error: 'Refresh token inválido' })

    // Verifica se o refresh token ainda é válido
    if (token.expiresAt < new Date()) {
      await token.remove()
      return res.status(401).json({ error: 'Refresh token expirado' })
    }

    // Atualiza os tokens
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await token.save()

    return res.json({
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }

  static async logout(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) return res.status(400).json({ error: 'O token é obrigatório' })

    // Verifica se o token existe
    const userToken = await Token.findOneBy({ token: authorization })
    if (!userToken) return res.status(401).json({ error: 'Token inválido' })

    // Remove o token
    await userToken.remove()

    // Retorna uma resposta vazia
    return res.status(204).json()
  }
}
