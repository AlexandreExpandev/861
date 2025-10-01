export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'completed' | 'userId' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDto = Partial<CreateTaskDto>;
