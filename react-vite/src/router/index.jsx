import { createBrowserRouter } from 'react-router-dom';

import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import SpotFeed from '../components/SpotFeed/SpotFeed';

import UserPage from '../components/UserPage/UserPage';


import SpotPage from '../components/SpotPage/SpotPage';




export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: [<Layout/>, <LandingPage />],
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path: "user",
        element: <UserPage />
      },
    ],
  },
]);