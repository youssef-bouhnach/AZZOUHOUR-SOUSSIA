import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user.email_verified_at) {
    return <Navigate to="/verify-email" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorizedPage" replace />;
  }

  if (user.role === 'admin') {
    window.location.href =
      (import.meta.env.VITE_APP_URL ?? "http://localhost:8000") + "/admin";
  }

  return children;
};

export default ProtectedRoute;
