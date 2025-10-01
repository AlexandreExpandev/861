import { Router } from 'express';
import { validationMiddleware } from '../middleware/validationMiddleware';
import * as taskController from '../api/internal/task/controller';
import { createTaskSchema } from '../services/task/taskValidation';

const router = Router();

// Task routes
router.get('/', taskController.listHandler);
router.post('/', validationMiddleware(createTaskSchema), taskController.createHandler);
router.get('/:id', taskController.getHandler);
router.put('/:id', validationMiddleware(createTaskSchema), taskController.updateHandler);
router.delete('/:id', taskController.deleteHandler);

export default router;
