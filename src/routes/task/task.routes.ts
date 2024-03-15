import { Router } from 'express';
import TaskController from '../../controllers/task/task.controller';

const taskRoutes =  Router()

//primeiro passo criar a rota

taskRoutes.post('/',TaskController.store)
taskRoutes.get('/', TaskController.index)
taskRoutes.get('/:id',TaskController.show)
taskRoutes.delete('/:id',TaskController.delete)
taskRoutes.put('/:id',TaskController.update)

export default taskRoutes

