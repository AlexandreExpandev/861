import { useTasks } from '@/domain/task/hooks/useTasks';

/**
 * @component TaskList
 * @summary Displays a list of tasks for the user.
 * @domain task
 * @type domain-component
 * @category display
 */
export const TaskList = () => {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando tarefas...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Erro ao carregar tarefas: {(error as Error).message}
      </p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="font-bold text-lg">{task.title}</h3>
          {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
          <div className="text-xs text-gray-400 mt-2">
            Status: <span className="font-semibold">{task.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
