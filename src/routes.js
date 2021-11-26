import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import DashboardAppother from './pages/DashboardAppother';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Home from './pages/Home';
import User from './pages/User';
import Families from './pages/Families';
import Exams from './pages/Exam';
import Tests from './pages/Tests';
import StartTest from './pages/StartTest';
import AddFamily from './pages/AddFamily';
import Account from './pages/Account';
import ConfigWebcam from './pages/ConfigWebcam';
import NotFound from './pages/Page404';
import Entrega from './pages/Entrega';
import Addphoto from './pages/Addphoto';
import ToAssignTest from './pages/ToAssignTests';
import ProfileOther from './pages/ProfileOther';
import Events from './pages/Events';
import Profile from './pages/Profile';
import TestDetails from './pages/TestDetails';
import EventDetails from './pages/EventDetails';
import PaymentRegistration from './pages/PaymentRegistration';
import CreateEvent from './pages/CreateEvent';
import CreateTest from './pages/CreateTest';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/homeschooling/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'other', element: <DashboardAppother /> },
        { path: 'user', element: <User /> },
        { path: 'family', element: <Families /> },
        { path: 'exam', element: <Exams /> },
        { path: 'test', element: <Tests /> },
        { path: 'toassingtest', element: <ToAssignTest /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profileOther', element: <ProfileOther /> },
        { path: 'starttest', element: <StartTest /> },
        { path: 'profile', element: <Profile /> },
        { path: 'events', element: <Events /> }
      ]
    },
    {
      path: '/homeschooling',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/homeschooling/ap" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'family', element: <Families /> },
        { path: 'home', element: <Home /> },
        { path: 'events', element: <Events /> },
        { path: 'events/:id', element: <EventDetails /> },
        { path: 'events/create', element: <CreateEvent /> },
        { path: 'tests', element: <Tests /> },
        { path: 'tests/:id', element: <TestDetails /> },
        { path: 'tests/create', element: <CreateTest /> },
        { path: ':resouce/:resourceId/:paymentStatus', element: <PaymentRegistration /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'entrega', element: <Entrega /> },
        { path: 'configwebcam', element: <ConfigWebcam /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'addfamily', element: <AddFamily /> },
        { path: 'addphoto', element: <Addphoto /> },
        { path: 'account', element: <Account /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
