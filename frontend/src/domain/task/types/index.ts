/**
 * @type Task
 * @summary Represents a single task item.
 */
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
  creation_date: string;
}

/**
 * @type CreateTaskDto
 * @summary Data transfer object for creating a new task.
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
}

/**
 * @type UpdateTaskDto
 * @summary Data transfer object for updating an existing task.
 */
export type UpdateTaskDto = Partial<CreateTaskDto & { status: Task['status'] }>;
