import { Outlet } from 'react-router-dom';

/**
 * @component AuthLayout
 * @summary Layout for authentication pages (login, register).
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const AuthLayout = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Outlet />
    </main>
  );
};
