import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', AuthController.store) //chama o auth controller par salvar o usuário
authRoutes.post('/login', AuthController.login)
authRoutes.post('/refresh', AuthController.refresh)
authRoutes.post('/logout', AuthController.logout)
authRoutes.get('/', AuthController.index)
authRoutes.get('/:id', AuthController.show) //chama o auth controller para mostrar o usuário
authRoutes.put('/:id', AuthController.update) //chama o auth controller para atualizar o usuário

export default authRoutes