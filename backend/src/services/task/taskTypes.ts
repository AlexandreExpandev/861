/**
 * @summary Task entity interface
 */
export interface TaskEntity {
  idTask: number;
  idUser: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
  completed: boolean;
  dateCreated: Date;
  dateModified?: Date;
  deleted: boolean;
}

/**
 * @summary Parameters for creating a task
 */
export interface TaskCreateParams {
  idUser: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
}

/**
 * @summary Parameters for updating a task
 */
export interface TaskUpdateParams {
  idUser: number;
  idTask: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
  completed?: boolean;
}

/**
 * @summary Task priority enum
 */
export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2
}
