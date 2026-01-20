import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
  Outlet,
} from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignupPage';
import StatsPage from './pages/stats/StatsPage';
import AnalysisPage from './pages/stats/AnalysisPage';
import RecordHomePage from './pages/record/RecordHomePage';


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
   
      {path: 'login',
       element: <LoginPage/>
      },
      {
        path: 'stats/analysis',
        element: <AnalysisPage />,
      },
      {
        path: 'record',
        element: <RecordHomePage />,
      },

      {path: 'login',
        element: <LoginPage/>
      },

      {path: 'signup', 
        element: <SignupPage />
      }

    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;