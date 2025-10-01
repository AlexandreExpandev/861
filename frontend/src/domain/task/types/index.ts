import { z } from 'zod';

export const taskPrioritySchema = z.enum(['low', 'medium', 'high']);

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.string().datetime().nullable(),
  priority: taskPrioritySchema,
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createTaskDtoSchema = taskSchema.pick({
  title: true,
  description: true,
  dueDate: true,
  priority: true,
});

export const updateTaskDtoSchema = createTaskDtoSchema.partial().extend({
  completed: z.boolean().optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskPriority = z.infer<typeof taskPrioritySchema>;
export type CreateTaskDto = z.infer<typeof createTaskDtoSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskDtoSchema>;
