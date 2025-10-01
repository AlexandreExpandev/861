import { useQuery } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';

/**
 * @hook useTaskList
 * @summary Fetches the list of tasks for the authenticated user.
 * @domain task
 * @type data-hook
 */
export const useTaskList = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.list,
  });
};
