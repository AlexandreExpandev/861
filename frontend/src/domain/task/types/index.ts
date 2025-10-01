import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createTaskDtoSchema = z.object({
  title: z
    .string()
    .min(1, 'O título da tarefa é obrigatório.')
    .max(255, 'O título não pode ter mais de 255 caracteres.'),
  description: z.string().max(1000, 'A descrição não pode ter mais de 1000 caracteres.').optional(),
});

export const updateTaskDtoSchema = createTaskDtoSchema.partial().extend({
  status: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskDto = z.infer<typeof createTaskDtoSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskDtoSchema>;
