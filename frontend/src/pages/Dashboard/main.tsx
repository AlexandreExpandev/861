import { useTaskList } from '@/domain/task';

/**
 * @page DashboardPage
 * @summary The main page for authenticated users, displaying the task list.
 * @domain task
 * @type dashboard-page
 */
export const DashboardPage = () => {
  const { data: tasks, isLoading, error } = useTaskList();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error loading tasks: {error.message}</p>}
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="p-2 border-b">
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
