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
import PublicRoute from "./PublicRoute";
import boothRoutes from "./boothRoutes";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout /> ,
    children: [
      ...onboardingRoutes,
      ...boothRoutes,
      {
        element: <PublicRoute />,
        children: [
          ...authRoutes,
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          ...mainRoutes,
          ...recordRoutes,
          ...statsRoutes,
          ...userRoutes,
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
        handle: { showNav: false },
      },
    ],
  },
];

export default routes;