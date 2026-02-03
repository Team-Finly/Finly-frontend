import AnalysisPage from "@/pages/stats/AnalysisPage";
import StatsPage from "@/pages/stats/StatsPage";
import type { RouteObject } from "react-router-dom";

const statsRoutes: RouteObject[] = [
  {
    path: 'stats',
    element: <StatsPage />,
    handle: { showNav: true },
  },
  {
    path: 'stats/analysis',
    element: <AnalysisPage />,
    handle: { showNav: false },
  },
];

export default statsRoutes;