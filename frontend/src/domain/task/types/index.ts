export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskDto = Partial<CreateTaskDto> & { completed?: boolean };
