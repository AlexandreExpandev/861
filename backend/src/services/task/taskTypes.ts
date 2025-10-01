/**
 * @summary
 * Task entity interface
 */
export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * @summary
 * Task creation parameters
 */
export interface TaskCreateParams {
  userId: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}

/**
 * @summary
 * Task update parameters
 */
export interface TaskUpdateParams {
  userId: number;
  taskId: number;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  completed?: boolean;
}
