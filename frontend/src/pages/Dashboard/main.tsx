import { useAuth } from '@/core/contexts/auth';

/**
 * @page DashboardPage
 * @summary The main dashboard page shown after a user logs in.
 * @domain functional
 * @type dashboard-page
 * @category management
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <p className="text-lg text-gray-600">
        This is your dashboard. The task list and creation features will be implemented here.
      </p>
      {/* Task list and create task components will go here */}
    </div>
  );
};
