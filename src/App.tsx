import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
  Outlet,
} from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import StatsPage from './pages/stats/StatsPage';
import AnalysisPage from './pages/stats/AnalysisPage';
import RecordHomePage from './pages/record/RecordHomePage';
import FragmentPage from './pages/record/FragmentPage';
import FragmentDetailPage from './pages/record/FragmentDetailPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: 'stats',
        element: <StatsPage />,
      },
      {
        path: 'stats/analysis',
        element: <AnalysisPage />,
      },
      {
        path: 'record',
        element: <RecordHomePage />,
      },
      {
        path: 'fragment',
        element: <FragmentPage />,
      },
      {
        path: 'fragment/detail',
        element: <FragmentDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
