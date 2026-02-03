import HomePage from "@/pages/home/HomePage";
import MindScoreDetailPage from "@/pages/home/MindScoreDetailPage";
import NotificationPage from "@/pages/home/NotificationPage";
import ReportDetailPage from "@/pages/home/ReportDetailPage";
import type { RouteObject } from "react-router-dom";

const mainRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
    handle: { showNav: true },
  },
  {
    path: 'notification',
    element: <NotificationPage />,
    handle: { showNav: false },
  },
     
  {
    path: 'mindscore',
    element: <MindScoreDetailPage />,
    handle: { showNav: false },
  },
      
  {
    path: 'reports/:yearMonth',
    element: <ReportDetailPage />,
    handle: { showNav: false },
  },
];

export default mainRoutes;