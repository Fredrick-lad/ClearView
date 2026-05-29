import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import { Login, Register, Forgotpassword } from "../onboarding/onboading";
import LandingPage from "../components/landingpage";
import OnboardingScreen from "../screens/OnboardingScreen";
import MainScreen from "../screens/MainScreen";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <MainScreen />,
      },
      {
        path: "/forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "onboarding",
        element: <OnboardingScreen />,
      },
      {
        path: "*",
        element: <LandingPage />,
      },
    ],
  },
]);
export default routes;
