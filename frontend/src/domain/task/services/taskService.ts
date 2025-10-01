import { api } from '@/core/lib/api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * @service taskService
 * @summary Provides methods for task-related API calls.
 * @domain task
 * @type api-service
 */
export const taskService = {
  /**
   * @endpoint GET /internal/tasks
   * @summary Fetches all tasks for the user.
   */
  list: async (): Promise<Task[]> => {
    return api.get('/internal/tasks');
  },

  /**
   * @endpoint GET /internal/tasks/:id
   * @summary Fetches a single task by its ID.
   */
  getById: async (id: number): Promise<Task> => {
    return api.get(`/internal/tasks/${id}`);
  },

  /**
   * @endpoint POST /internal/tasks
   * @summary Creates a new task.
   */
  create: async (data: CreateTaskDto): Promise<Task> => {
    return api.post('/internal/tasks', data);
  },

  /**
   * @endpoint PUT /internal/tasks/:id
   * @summary Updates an existing task.
   */
  update: async (id: number, data: UpdateTaskDto): Promise<Task> => {
    return api.put(`/internal/tasks/${id}`, data);
  },

  /**
   * @endpoint DELETE /internal/tasks/:id
   * @summary Deletes a task.
   */
  delete: async (id: number): Promise<{ message: string }> => {
    return api.delete(`/internal/tasks/${id}`);
  },
};
