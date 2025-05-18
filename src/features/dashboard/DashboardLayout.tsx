// src/features/dashboard/DashboardLayout.tsx
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {


  return (
    <div className="flex h-screen w-full">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/" className="block hover:text-purple-300">Blogs</Link>
          <Link to="/projects" className="block hover:text-purple-300">Projects</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
