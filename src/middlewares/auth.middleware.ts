import { Request, Response, NextFunction } from 'express' //nextfunction para chamar sequência
import Token from '../models/token.entity'

export default async function authMiddleware
    (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers //header de requisição deu se o nome de authorization mas pode ser como quiser

    //verificar se passou ao token 401 não autorizado 
    if (!authorization) return res.status(401).json({ error: 'Token não informado' })

    // Verifica se o token existe
    const userToken = await Token.findOneBy({ token: authorization })
    if (!userToken) return res.status(401).json({ error: 'Token inválido' })

    // Verifica se o token expirou
    if (userToken.expiresAt < new Date()) {//verifica se data do token é maior da data de hoje
        await userToken.remove()//apaga o token do banco
        return res.status(401).json({ error: 'Token expirado' }) //informa o tokem vencido 
    }

    // Adiciona o id do usuário no header da requisição se não está com token vencido
    req.headers.userId = userToken.userId.toString()

    // Continua a execução pode continuar
    next()
}