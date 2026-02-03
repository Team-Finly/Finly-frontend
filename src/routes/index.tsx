import type { RouteObject } from "react-router-dom";
import AppLayout from '@/layouts/AppLayout';
import authRoutes from "./authRoutes";
import mainRoutes from "./mainRoutes";
import onboardingRoutes from "./onboardingRoutes";
import recordRoutes from "./recordRoutes";
import statsRoutes from "./statsRoutes";
import userRoutes from "./userRoutes";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/home/ErrorPage";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout /> ,
    children: [
      // 🔓 비로그인 상태에서 접근 가능한 경로
      ...authRoutes,

      // 🔐 로그인한 사용자만 접근 가능한 경로
      {
        element: <ProtectedRoute />,
        children: [
          ...mainRoutes,
          ...onboardingRoutes,
          ...recordRoutes,
          ...statsRoutes,
          ...userRoutes,
        ],
      },

      // 🚫 정의되지 않은 모든 경로는 에러 페이지로
      {
        path: '*',
        element: <ErrorPage />,
        handle: { showNav: false },
      },
    ],
  },
];

export default routes;