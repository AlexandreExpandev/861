import api from '@/core/lib/api';
import { Task } from '../types';

/**
 * @service taskService
 * @summary Provides methods for task-related API calls.
 * @domain task
 * @type api-service
 */
export const taskService = {
  /**
   * @summary Fetches all tasks for the current user.
   * @returns {Promise<Task[]>} A list of tasks.
   */
  list: async (): Promise<Task[]> => {
    const response = await api.get('/internal/tasks');
    return response.data.data;
  },

  // Other CRUD operations (create, get, update, delete) can be added here.
};
