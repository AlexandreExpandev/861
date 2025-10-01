/**
 * @interface Task
 * @description Represents a task entity in the system
 */
export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @enum TaskPriority
 * @description Priority levels for tasks
 */
export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

/**
 * @interface TaskCreateInput
 * @description Input for creating a new task
 */
export interface TaskCreateInput {
  userId: number;
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: TaskPriority;
}

/**
 * @interface TaskUpdateInput
 * @description Input for updating an existing task
 */
export interface TaskUpdateInput extends TaskCreateInput {
  id: number;
  completed?: boolean;
}
