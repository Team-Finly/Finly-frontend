import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StatsPage from './pages/stats/StatsPage';
import AnalysisPage from './pages/stats/AnalysisPage';
import RecordHomePage from './pages/record/RecordHomePage';
import FragmentPage from './pages/record/FragmentPage';
import FragmentDetailPage from './pages/record/FragmentDetailPage';
import SearchPage from './pages/record/SearchPage';
import SearchResultPage from './pages/record/SearchResultPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <></>,
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
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
