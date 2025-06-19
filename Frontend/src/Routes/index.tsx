import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import LandingPage from "../Screens/HomeSection/LandingPage";
import LoginScreen from "../Screens/LoginSignup/LoginScreen";
import SignupScreen from "../Screens/LoginSignup/SignupScreen";
import ProtectedLayout from "../Layout/ProtectedLayout";
import ForgetPassword from "../Screens/LoginSignup/ForgetPassword";
import AboutPage from "../Screens/AboutSection/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      //   { index: true, element: <LandingPage /> },
      { index: true, element: <LoginScreen /> },
      { path: "signup", element: <SignupScreen /> },
      { path: "forgot-password", element: <ForgetPassword /> },

    ],
  },
  {
    path: "/home",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },

    ],
  },
]);
