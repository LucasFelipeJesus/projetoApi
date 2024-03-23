import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', AuthController.store) //chama o auth controller par salvar o usuário
authRoutes.post('/login', AuthController.login)
//authRoutes.post('/refresh', AuthController.refresh)
//authRoutes.post('/logout', AuthController.logout)

export default authRoutes