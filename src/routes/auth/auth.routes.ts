import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const authRoutes = Router()

authRoutes.post('/register', AuthController.store) //chama o auth controller par salvar o usuário
authRoutes.post('/login', AuthController.login)
authRoutes.post('/refresh', AuthController.refresh)
authRoutes.post('/logout', AuthController.logout)
authRoutes.get('/', authMiddleware, AuthController.index)
authRoutes.get('/:id', authMiddleware, AuthController.show) //chama o auth controller para mostrar o usuário
authRoutes.put('/:id', authMiddleware, AuthController.update) //chama o auth controller para atualizar o usuário
authRoutes.delete('/:id', authMiddleware, AuthController.delete) //chama o auth controller para deletar o usuário

export default authRoutes