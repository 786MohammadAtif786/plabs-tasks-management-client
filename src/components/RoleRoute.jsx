import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Usage: <RoleRoute allowedRoles={["admin", "manager"]}><TaskApproval /></RoleRoute>
const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // Role match nahi hua to home pe bhej do
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;