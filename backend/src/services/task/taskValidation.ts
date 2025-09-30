import { z } from 'zod';
import { TaskStatus } from './taskTypes';

/**
 * @summary Validation schema for task creation
 */
export const taskCreateSchema = z.object({
  title: z.string()
    .min(1, 'O título da tarefa é obrigatório.')
    .max(255, 'O título não pode ter mais de 255 caracteres.'),
  description: z.string()
    .max(1000, 'A descrição não pode ter mais de 1000 caracteres.')
    .optional()
});

/**
 * @summary Validation schema for task updates
 */
export const taskUpdateSchema = z.object({
  title: z.string()
    .min(1, 'O título da tarefa é obrigatório.')
    .max(255, 'O título não pode ter mais de 255 caracteres.'),
  description: z.string()
    .max(1000, 'A descrição não pode ter mais de 1000 caracteres.')
    .optional(),
  status: z.enum([TaskStatus.Pendente, TaskStatus.EmAndamento, TaskStatus.Concluida])
    .optional()
});
