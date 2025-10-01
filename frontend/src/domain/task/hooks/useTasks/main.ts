import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import { CreateTaskDto, UpdateTaskDto } from '../../types';

const TASK_QUERY_KEY = 'tasks';

/**
 * @hook useTasks
 * @summary A hook to manage task data, including fetching, creating, updating, and deleting tasks.
 * @domain task
 * @type domain-hook
 * @category data
 */
export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: [TASK_QUERY_KEY],
    queryFn: taskService.list,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskDto) => taskService.create(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) => taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutateAsync,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutateAsync,
    isDeleting: deleteTaskMutation.isPending,
  };
};
