import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
