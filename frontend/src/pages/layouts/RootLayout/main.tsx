import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary The root layout component for the entire application.
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const RootLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
