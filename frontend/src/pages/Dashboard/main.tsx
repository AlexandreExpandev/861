import { useAuth } from '@/core/contexts/auth';
import { useTasks } from '@/domain/task';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { Task } from '@/domain/task/types';

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
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </header>

      <main className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <Link to="/dashboard/tasks/new">
            <Button variant="default">+ New Task</Button>
          </Link>
        </div>
        <div className="mt-4">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {tasks && (
            <ul className="space-y-2">
              {tasks.map((task: Task) => (
                <li key={task.id} className="rounded border p-3 bg-white shadow-sm">
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
                </li>
              ))}
            </ul>
          )}
          {!isLoading && tasks?.length === 0 && (
            <div className="text-center py-8 border-dashed border-2 rounded-lg">
              <p>You have no tasks yet. Create one!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
