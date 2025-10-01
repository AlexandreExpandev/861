import { useQuery } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';

export const TASK_QUERY_KEY = 'tasks';

/**
 * @hook useTaskList
 * @summary Fetches the list of tasks for the authenticated user.
 * @domain task
 * @type domain-hook
 * @category data
 */
export const useTaskList = () => {
  return useQuery({
    queryKey: [TASK_QUERY_KEY],
    queryFn: taskService.list,
  });
};
