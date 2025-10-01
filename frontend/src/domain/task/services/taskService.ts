import { api } from '@/core/lib/api';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * @service taskService
 * @summary Provides methods for task-related API operations.
 * @domain task
 * @type api-service
 */
export const taskService = {
  /**
   * @endpoint GET /internal/tasks
   * @summary Fetches all tasks for the authenticated user.
   */
  list: (): Promise<Task[]> => api.get('/internal/tasks'),

  /**
   * @endpoint GET /internal/tasks/:id
   * @summary Fetches a single task by its ID.
   */
  get: (id: string): Promise<Task> => api.get(`/internal/tasks/${id}`),

  /**
   * @endpoint POST /internal/tasks
   * @summary Creates a new task.
   */
  create: (data: CreateTaskDto): Promise<Task> => api.post('/internal/tasks', data),

  /**
   * @endpoint PUT /internal/tasks/:id
   * @summary Updates an existing task.
   */
  update: (id: string, data: UpdateTaskDto): Promise<Task> =>
    api.put(`/internal/tasks/${id}`, data),

  /**
   * @endpoint DELETE /internal/tasks/:id
   * @summary Deletes a task.
   */
  delete: (id: string): Promise<{ message: string }> => api.delete(`/internal/tasks/${id}`),
};
