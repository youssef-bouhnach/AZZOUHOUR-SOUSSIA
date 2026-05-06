import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.email_verified_at) return <Navigate to="/verify-email" />;
  
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;