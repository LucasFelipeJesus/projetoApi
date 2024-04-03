import { Router } from "express";
import PhoneController from "../../controllers/phone/phone.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const phoneRoutes = Router()

phoneRoutes.post('/', authMiddleware, PhoneController.store)
phoneRoutes.get('/', authMiddleware, PhoneController.index)
phoneRoutes.get('/:id', authMiddleware, PhoneController.show)
phoneRoutes.delete('/:id', authMiddleware, PhoneController.delete)
phoneRoutes.put('/:id', authMiddleware, PhoneController.update)

export default phoneRoutes