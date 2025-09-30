import { api } from '@/core/lib/api';
import type { ApiResponse } from '@/core/types/api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * @service taskService
 * @summary Provides methods for all task-related backend operations.
 * @domain task
 * @type api-service
 */
export const taskService = {
  /**
   * @method list
   * @summary Fetches all tasks for the authenticated user.
   * @returns {Promise<Task[]>} A list of tasks.
   */
  async list(): Promise<Task[]> {
    const response = await api.get<ApiResponse<Task[]>>('/internal/tasks');
    return response.data.data;
  },

  /**
   * @method create
   * @summary Creates a new task.
   * @param {CreateTaskDto} data - The data for the new task.
   * @returns {Promise<Task>} The newly created task.
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<ApiResponse<Task>>('/internal/tasks', data);
    return response.data.data;
  },

  /**
   * @method update
   * @summary Updates an existing task.
   * @param {number} id - The ID of the task to update.
   * @param {UpdateTaskDto} data - The data to update.
   * @returns {Promise<Task>} The updated task.
   */
  async update(id: number, data: UpdateTaskDto): Promise<Task> {
    const response = await api.put<ApiResponse<Task>>(`/internal/tasks/${id}`, data);
    return response.data.data;
  },

  /**
   * @method delete
   * @summary Deletes a task.
   * @param {number} id - The ID of the task to delete.
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/internal/tasks/${id}`);
  },
};
