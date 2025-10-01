import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Textarea } from '@/core/components/Textarea';
import { createTaskDtoSchema, type CreateTaskDto } from '../../types';
import { useCreateTask } from '../../hooks/useCreateTask';
import type { CreateTaskFormProps } from './types';

/**
 * @component CreateTaskForm
 * @summary A form for creating a new task.
 * @domain task
 * @type domain-component
 * @category form
 */
export const CreateTaskForm = ({ onSuccess, onCancel }: CreateTaskFormProps) => {
  const { mutate: createTask, isPending } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskDtoSchema),
  });

  const onSubmit = (data: CreateTaskDto) => {
    createTask(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">Create New Task</h2>
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <Textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Task'}
        </Button>
      </div>
    </form>
  );
};
