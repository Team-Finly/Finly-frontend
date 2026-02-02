import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import PersonaTestPage from './pages/onboarding/PersonaTestPage';
import PersonaResultPage from './pages/onboarding/PersonaResultPage';
import TermsPage from './pages/onboarding/TermsPage';
import StatsPage from './pages/stats/StatsPage';
import AnalysisPage from './pages/stats/AnalysisPage';
import RecordHomePage from './pages/record/RecordHomePage';
import FragmentPage from './pages/record/FragmentPage';
import FragmentDetailPage from './pages/record/FragmentDetailPage';
import SearchPage from './pages/record/SearchPage';
import SearchResultPage from './pages/record/SearchResultPage';
import RecordCreatePage from './pages/record/RecordCreatePage';
import StockSearchPage from './pages/record/StockSearchPage';
import HomePage from './pages/home/HomePage';
import NotificationPage from './pages/home/NotificationPage';
import MindScoreDetailPage from './pages/home/MindScoreDetailPage';
import ReportDetailPage from './pages/home/ReportDetailPage';
import Profile from './pages/mypage/Profile';
import MyPersona from './pages/mypage/MyPersona';
import ProfileSettings from './pages/mypage/ProfileSettings';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { showNav: true },
      },
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
        path: 'stats',
        element: <StatsPage />,
        handle: { showNav: true },
      },
      {
        path: 'stats/analysis',
        element: <AnalysisPage />,
        handle: { showNav: false },
      },
      {
        path: 'record',
        element: <RecordHomePage />,
        handle: { showNav: true },
      },
      {
        path: 'fragment',
        element: <FragmentPage />,
        handle: { showNav: false },
      },
      {
        path: 'fragment/detail',
        element: <FragmentDetailPage />,
        handle: { showNav: false },
      },
      {
        path: 'search',
        element: <SearchPage />,
        handle: { showNav: false },
      },
      {
        path: 'search/result',
        element: <SearchResultPage />,
        handle: { showNav: false },
      },
      {
        path: 'record/create',
        element: <RecordCreatePage />,
        handle: { showNav: false },
      },
      {
        path: 'stock/search',
        element: <StockSearchPage />,
        handle: { showNav: false },
      },
      {
        path: 'onboarding/persona',
        element: <PersonaTestPage />,
        handle: { showNav: false },
      },
      {
        path: 'notification',
        element: <NotificationPage />,
        handle: { showNav: false },
      },
      {
        path: 'onboarding/personaresult',
        element: <PersonaResultPage />,
        handle: { showNav: false },
      },
      {
        path: 'mindscore',
        element: <MindScoreDetailPage />,
        handle: { showNav: false },
      },
      {
        path: 'terms',
        element: <TermsPage />,
        handle: { showNav: false },
      },
      {
        path: 'reports/:yearMonth',
        element: <ReportDetailPage />,
        handle: { showNav: false },
      },
      {
        path: 'profile',
        element: <Profile/>,
        handle: { showNav: true },
      },
      {
        path: 'mypersona',
        element: <MyPersona/>,
        handle: { showNav: true },
      },
      {
        path: 'profilesettings',
        element: <ProfileSettings/>,
        handle: { showNav: true },
      }
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
