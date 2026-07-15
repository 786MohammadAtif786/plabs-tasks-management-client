import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protected pages ke liye - agar login nahi hai to /login bhej do
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;