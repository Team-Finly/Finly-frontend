import { Navigate, Outlet, useLocation } from "react-router-dom";
import { tokenStorage } from "@/utils/tokenStorage";

const ProtectedRoute = () => {
  const token = tokenStorage.get();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;