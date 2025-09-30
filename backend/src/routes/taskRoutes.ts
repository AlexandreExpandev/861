import { Router } from 'express';
import * as taskController from '../api/internal/task/controller';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { taskCreateSchema, taskUpdateSchema } from '../services/task/taskValidation';

const router = Router();

// Task routes
router.get('/', taskController.listHandler);
router.post('/', validationMiddleware(taskCreateSchema), taskController.createHandler);
router.get('/:id', taskController.getHandler);
router.put('/:id', validationMiddleware(taskUpdateSchema), taskController.updateHandler);
router.delete('/:id', taskController.deleteHandler);

export default router;
