import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { logOut } from "@/app/features/auth/authSlice";

const DashboardLayout = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden md:block relative w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <div >
          <nav className="space-y-4">
            <Link to="/" className="block hover:text-purple-300 text-white transition">
              Blogs
            </Link>
            <Link to="/projects" className="block hover:text-purple-300 text-white  transition">
              Projects
            </Link>
            <Link to="/experience" className="block hover:text-purple-300 text-white  transition">
              Experience
            </Link>
            <Link to="/skills" className="block hover:text-purple-300 text-white  transition">
              Skills
            </Link>
          </nav>
        </div>
        <Button variant="destructive" onClick={handleLogout} className="w-[80%] mt-6 text-white absolute bottom-8">
          Logout
        </Button>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white">
            <div>

              <h2 className="text-xl font-bold mb-6">Dashboard</h2>
              <nav className="space-y-4">
                <Link to="/" className="block hover:text-purple-300 transition">
                  Blogs
                </Link>
                <Link to="/projects" className="block hover:text-purple-300 transition">
                  Projects
                </Link>
                <Link to="/experience" className="block hover:text-purple-300 text-white  transition">
                  Experience
                </Link>
                <Link to="/skills" className="block hover:text-purple-300 text-white  transition">
                  Skills
                </Link>
              </nav>
              <Button variant="destructive" onClick={handleLogout} className="w-full mt-6 text-white">
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-muted overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
