import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { useTaskList } from '@/domain/task';
import type { Task as TaskType } from '@/domain/task/types';

/**
 * @component TaskList
 * @summary Displays the list of user's tasks.
 * @domain task
 * @type page-component
 * @category display
 */
export const TaskList = () => {
  const { data: tasks, isLoading, error } = useTaskList();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load tasks: {error.message}</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">You have no tasks yet. Create one!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{task.title}</h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              {task.status}
            </span>
          </div>
          {task.description && <p className="mt-2 text-sm text-gray-600">{task.description}</p>}
        </div>
      ))}
    </div>
  );
};
