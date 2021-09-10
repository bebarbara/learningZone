import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Families from './pages/Families';
import Exams from './pages/Exam';
import Tests from './pages/Tests';
import StartTest from './pages/StartTest';
import AddFamily from './pages/AddFamily';
import Account from './pages/Account';
import ConfigWebcam from './pages/ConfigWebcam';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'family', element: <Families /> },
        { path: 'exam', element: <Exams /> },
        { path: 'test', element: <Tests /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'starttest', element: <StartTest /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'configwebcam', element: <ConfigWebcam /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'addfamily', element: <AddFamily /> },
        { path: 'account', element: <Account /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
