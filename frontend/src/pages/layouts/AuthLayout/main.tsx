import { Outlet } from 'react-router-dom';

/**
 * @component AuthLayout
 * @summary A layout for authentication pages like login and register.
 * @type layout-component
 * @category navigation
 */
export const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Outlet />
    </main>
  );
};
