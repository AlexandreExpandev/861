import { z } from 'zod';
import { TaskPriority } from './taskTypes';

/**
 * @summary Validation schema for task creation
 */
export const taskCreateSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string()
    .max(500, 'Description must be 500 characters or less')
    .optional()
    .default(''),
  dueDate: z.string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Due date must be a valid date'
    })
    .transform(val => new Date(val)),
  priority: z.number()
    .int()
    .min(0)
    .max(2)
    .default(TaskPriority.Medium)
});

/**
 * @summary Validation schema for task updates
 */
export const taskUpdateSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z.string()
    .max(500, 'Description must be 500 characters or less')
    .optional()
    .default(''),
  dueDate: z.string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Due date must be a valid date'
    })
    .transform(val => new Date(val)),
  priority: z.number()
    .int()
    .min(0)
    .max(2),
  completed: z.boolean().optional()
});
