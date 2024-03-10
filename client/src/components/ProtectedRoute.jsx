import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
    return isLoggedIn ? component : <Navigate to="/login" replace />;
  };

export default ProtectedRoute;