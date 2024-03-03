import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import SpotFeed from '../components/SpotFeed/SpotFeed';
import SpotPage from '../components/SpotPage/SpotPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "category/:category",
        element: <SpotFeed />
      },
      {
        path: "spot/:spotId",
        element: <SpotPage />
      }
    ],
  },
]);