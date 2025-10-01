import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary The root layout component for the entire application.
 * @type layout-component
 */
export const RootLayout = () => {
  return (
    <div className="root-container">
      <Outlet />
    </div>
  );
};
