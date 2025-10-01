import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import taskRoutes from './taskRoutes';

const router = Router();

// Apply authentication middleware to all internal routes
router.use(authMiddleware);

// Task routes
router.use('/tasks', taskRoutes);

export default router;
