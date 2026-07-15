import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Login/Register jaise public pages ke liye - agar already logged in hai to home bhej do
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;