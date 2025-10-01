import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary The root layout component that contains the main outlet for all routes.
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
