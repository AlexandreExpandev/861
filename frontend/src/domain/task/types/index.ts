export type TaskStatus = 'Pendente' | 'Em Andamento' | 'Concluída';

// This represents the full Task object returned by the backend.
// It may contain fields not directly used in the creation form.
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string | null;
  priority: number; // Assuming 1: low, 2: medium, 3: high
  createdAt: string;
  updatedAt: string;
}

// This DTO aligns with the simplified feature spec for creating a task.
export interface CreateTaskDto {
  title: string;
  description?: string;
}

export type UpdateTaskDto = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;
