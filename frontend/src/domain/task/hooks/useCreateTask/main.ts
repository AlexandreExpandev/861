import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { taskService } from '../../services/taskService';
import { TASK_QUERY_KEY } from '../useTaskList/main';
import type { CreateTaskDto } from '../../types';

/**
 * @hook useCreateTask
 * @summary Provides a mutation for creating a new task.
 * @domain task
 * @type domain-hook
 * @category data
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.create(data),
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEY],
      });
    },
    onError: (error) => {
      toast.error(`Failed to create task: ${error.message}`);
    },
  });
};
