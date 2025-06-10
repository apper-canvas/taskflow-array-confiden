import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Outlet />
    </div>
  );
}

export default Layout;