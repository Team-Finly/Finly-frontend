import { Navigate, Outlet } from "react-router-dom";
import { tokenStorage } from "@/utils/tokenStorage";

const PublicRoute = () => {
  const token = tokenStorage.get();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;