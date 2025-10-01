import { z } from 'zod';
import { TaskPriority } from './taskTypes';

/**
 * @summary Validation schema for task creation and updates
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]).optional(),
  completed: z.boolean().optional(),
});

/**
 * @summary Validation schema for task ID parameter
 */
export const taskIdSchema = z.object({
  id: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: 'Task ID must be a valid number',
  }),
});
