import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../../types';
import toast from 'react-hot-toast';

const TASK_QUERY_KEY = ['tasks'];

/**
 * @hook useTasks
 * @summary Manages server state for tasks, including fetching, creating, updating, and deleting.
 * @domain task
 * @type domain-hook
 * @category data
 */
export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery<Task[], Error>({
    queryKey: TASK_QUERY_KEY,
    queryFn: taskService.list,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskDto) => taskService.create(newTask),
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(`Failed to create task: ${err.message}`);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskDto }) =>
      taskService.update(id, data),
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(`Failed to update task: ${err.message}`);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => taskService.delete(id),
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(`Failed to delete task: ${err.message}`);
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
  };
};
