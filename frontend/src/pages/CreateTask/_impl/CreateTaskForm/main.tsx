import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '@/domain/task';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { Textarea } from '@/core/components/Textarea';
import { CreateTaskDto } from '@/domain/task/types';

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'O título da tarefa é obrigatório.')
    .max(255, 'O título não pode ter mais de 255 caracteres.'),
  description: z
    .string()
    .max(1000, 'A descrição não pode ter mais de 1000 caracteres.')
    .optional(),
});

type CreateTaskFormInputs = z.infer<typeof createTaskSchema>;

/**
 * @component CreateTaskForm
 * @summary A form for creating a new task.
 * @domain task
 * @type domain-component
 * @category form
 */
export const CreateTaskForm = () => {
  const navigate = useNavigate();
  const { createTask, isCreating } = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormInputs>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = (data: CreateTaskFormInputs) => {
    const taskData: CreateTaskDto = {
      title: data.title,
      ...(data.description && { description: data.description }),
    };

    createTask(taskData, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            type="text"
            {...register('title')}
            className="mt-1"
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <Textarea
            id="description"
            {...register('description')}
            className="mt-1"
            aria-invalid={errors.description ? 'true' : 'false'}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? 'Saving...' : 'Save Task'}
          </Button>
        </div>
      </form>
    </div>
  );
};
