import { z } from 'zod';

/**
 * @summary
 * Validation schema for task creation
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

/**
 * @summary
 * Validation schema for task updates
 */
export const updateTaskSchema = createTaskSchema.partial().extend({
  completed: z.boolean().optional(),
});

/**
 * @summary
 * Validation schema for task ID parameter
 */
export const taskIdSchema = z.object({
  id: z.coerce.number().positive('Task ID must be a positive number'),
});
