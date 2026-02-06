import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import type { RouteObject } from "react-router-dom";

const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
    handle: { showNav: false },
  },
  {
    path: 'signup',
    element: <SignupPage />,
    handle: { showNav: false },
  },
  {
    path: 'onboarding',
    element: <OnboardingPage />,
    handle: { showNav: false },
  },
  
];

export default authRoutes;  