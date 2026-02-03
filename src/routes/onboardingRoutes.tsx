import PersonaResultPage from "@/pages/onboarding/PersonaResultPage";
import PersonaTestPage from "@/pages/onboarding/PersonaTestPage";
import TermsPage from "@/pages/onboarding/TermsPage";
import type { RouteObject } from "react-router-dom";

const onboardingRoutes: RouteObject[] = [
  {
    path: 'onboarding/persona',
    element: <PersonaTestPage />,
    handle: { showNav: false },
  },
  {
    path: 'onboarding/personaresult',
    element: <PersonaResultPage />,
    handle: { showNav: false },
  },
  {
    path: 'terms',
    element: <TermsPage />,
    handle: { showNav: false },
  },
];

export default onboardingRoutes;