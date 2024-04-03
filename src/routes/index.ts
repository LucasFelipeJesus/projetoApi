import { Router } from 'express';
import taskRoutes from './task/task.routes'
import authRoutes from './auth/auth.routes'
import phoneRoutes from './phone/phone.routes'

const routes = Router()

routes.use('/task', taskRoutes)
routes.use('/auth', authRoutes)
routes.use('/phone', phoneRoutes)

export default routes
