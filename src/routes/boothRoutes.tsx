import type { RouteObject } from "react-router-dom";
import PersonaTest from "@/pages/booth/PersoanaTest";
import PersonaResult from "@/pages/booth/PersonaTestResult";

const boothRoutes: RouteObject[] = [
  {
    path: 'booth/personatest',
    element: <PersonaTest />,
    handle: { showNav: false },
  },
  {
    path: 'booth/personaresult',
    element: <PersonaResult />,
    handle: { showNav: false },
  },
];

export default boothRoutes;