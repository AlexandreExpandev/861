import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/core/contexts/auth';

/**
 * @page DashboardPage
 * @summary The main dashboard page shown after a user logs in.
 * @domain functional
 * @type dashboard-page
 * @category task-management
 */
export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard - TO DO List</title>
      </Helmet>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">This is your dashboard. Your tasks will be listed here.</p>
        {/* Task list and creation form will be implemented here */}
      </div>
    </>
  );
};
