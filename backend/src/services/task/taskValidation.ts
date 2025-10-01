import { z } from 'zod';
import { TaskPriority } from './taskTypes';

/**
 * @summary Validation schema for task creation and updates
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  dueDate: z.string().datetime().optional().nullable(),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]),
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
