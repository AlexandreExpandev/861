import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { useAuth } from '@/core/contexts/auth';

/**
 * @component DashboardLayout
 * @summary Layout for the main application dashboard after authentication.
 * @type layout-component
 */
export const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TO DO List</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name}</span>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};
