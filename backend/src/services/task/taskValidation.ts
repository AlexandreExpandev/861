import { z } from 'zod';
import { TaskPriority } from './taskTypes';

/**
 * @summary
 * Validation schema for task creation
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').default(''),
  dueDate: z.string().datetime({ message: 'Invalid date format' }).nullable().optional(),
  priority: z
    .number()
    .int()
    .min(1, 'Priority must be between 1 and 3')
    .max(3, 'Priority must be between 1 and 3')
    .default(TaskPriority.Medium),
});

/**
 * @summary
 * Validation schema for task updates
 */
export const updateTaskSchema = createTaskSchema.extend({
  completed: z.boolean().optional(),
});
