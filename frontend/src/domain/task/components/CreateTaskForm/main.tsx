import { useState } from 'react';
import { useTasks } from '@/domain/task/hooks/useTasks';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Textarea } from '@/core/components/Textarea';

interface CreateTaskFormProps {
  onTaskCreated: () => void;
  onCancel: () => void;
}

/**
 * @component CreateTaskForm
 * @summary A form for creating a new task.
 * @domain task
 * @type domain-component
 * @category form
 */
export const CreateTaskForm = ({ onTaskCreated, onCancel }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string }>({});

  const { createTask, isCreating } = useTasks();

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório.';
    } else if (title.length > 255) {
      newErrors.title = 'O título não pode ter mais de 255 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await createTask({ title, description });
      alert('Tarefa criada com sucesso!'); // Simple success feedback
      onTaskCreated();
    } catch (error: any) {
      console.error('Failed to create task:', error);
      alert(`Erro ao criar tarefa: ${error.message || 'Tente novamente.'}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-4 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold">Nova Tarefa</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Comprar leite"
          disabled={isCreating}
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição (Opcional)
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Ir ao mercado depois do trabalho"
          disabled={isCreating}
        />
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isCreating}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Salvando...' : 'Salvar Tarefa'}
        </Button>
      </div>
    </form>
  );
};
