import { Routes, Route } from "react-router-dom";
import Login from "@/features/auth/Login";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import Blogs from "@/features/dashboard/Blogs";
import Projects from "@/features/dashboard/Projects";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Blogs />} />
      <Route path="projects" element={<Projects />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
