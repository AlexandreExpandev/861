/**
 * @summary
 * Task entity interface
 */
export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: number;
  completed: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @summary
 * Task creation interface
 */
export interface TaskCreate {
  title: string;
  description: string;
  dueDate?: string | null;
  priority: number;
}

/**
 * @summary
 * Task update interface
 */
export interface TaskUpdate {
  title: string;
  description: string;
  dueDate?: string | null;
  priority: number;
  completed?: boolean;
}

/**
 * @summary
 * Task priority enum
 */
export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}
