import PersonaResultPage from "@/pages/onboarding/PersonaResultPage";
import PersonaTestPage from "@/pages/onboarding/PersonaTestPage";
import TermsDetail from "@/pages/onboarding/TermsDetail";
import TermsPage from "@/pages/onboarding/TermsPage";
import type { RouteObject } from "react-router-dom";
import Start from "@/pages/onboarding/start";
const onboardingRoutes: RouteObject[] = [
  {
    path: 'persona',
    element: <PersonaTestPage />,
    handle: { showNav: false },
  },
  {
    path: 'personaresult',
    element: <PersonaResultPage />,
    handle: { showNav: false },
  },
  {
    path: 'terms',
    element: <TermsPage />,
    handle: { showNav: false },
  },
  {
    path: 'termsdetail/:id',
    element: <TermsDetail />,
    handle: { showNav: false },
  },
  {
      path: 'start',
      element: <Start />,
      handle: { showNav: false },
    }
];

export default onboardingRoutes;