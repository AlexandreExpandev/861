import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/core/components/ProtectedRoute';

/**
 * @component DashboardLayout
 * @summary A layout for authenticated sections of the application.
 * It uses ProtectedRoute to ensure only logged-in users can access its children.
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Can add a shared header or sidebar here */}
        <main>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};
