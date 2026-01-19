import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayout';
import RecordHomePage from './pages/record/RecordHomePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: 'record',
        children: [{ index: true, element: <RecordHomePage /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
