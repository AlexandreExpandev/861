import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/core/components/ProtectedRoute';

/**
 * @component DashboardLayout
 * @summary A layout for authenticated, private pages of the application.
 * @type layout-component
 * @category navigation
 */
export const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* A common header or sidebar for the dashboard could go here */}
        <main>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};
