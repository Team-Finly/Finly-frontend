import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  // 1. 로그인 상태 확인 (지금은 api가 없으니 로컬스토리지 활용)
  const isAuthenticated = localStorage.getItem('');
  const location = useLocation();

  // 2. 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 로그인 되어 있으면 자식 컴포넌트를 보여줌
  return <Outlet />;
}

export default ProtectedRoute;