import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';

/**
 * @component DashboardLayout
 * @summary Layout for authenticated sections of the application.
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="text-lg font-bold">
            TO DO List
          </Link>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
