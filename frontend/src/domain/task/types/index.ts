/**
 * @type Task
 * @summary Represents a single task item.
 */
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @type CreateTaskDto
 * @summary Data transfer object for creating a new task.
 */
export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * @type UpdateTaskDto
 * @summary Data transfer object for updating an existing task.
 */
export type UpdateTaskDto = Partial<CreateTaskDto>;
