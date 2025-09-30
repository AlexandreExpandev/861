import { useAuth } from '@/core/contexts/auth';
import { useTasks } from '@/domain/task';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

/**
 * @page DashboardPage
 * @summary The main dashboard for authenticated users to manage their tasks.
 * @domain task
 * @type dashboard-page
 * @category management
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { tasks, isLoading, error } = useTasks();

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </header>

      <main className="mt-8">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <div className="mt-4">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {tasks && (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="rounded border p-2 my-2">
                  {task.title}
                </li>
              ))}
            </ul>
          )}
          {tasks?.length === 0 && <p>You have no tasks yet. Create one!</p>}
        </div>
      </main>
    </div>
  );
};
