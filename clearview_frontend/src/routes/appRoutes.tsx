import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import { Login, Forgotpassword } from "../onboarding/onboading";
import LandingPage from "../components/landingpage";
import OnboardingScreen from "../screens/OnboardingScreen";
import MainScreen from "../screens/MainScreen";
import ProtectedRoute from "../components/protectedRoute";
import { UserProvider } from "../hooks/context/userContext";
import EnvelopeContext from "../hooks/context/generalContext";
import { User } from "lucide-react";

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
        path: "/login",
        element: (
          <UserProvider>
            <Login />
          </UserProvider>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <UserProvider>
            <ProtectedRoute>
              <EnvelopeContext>
                <MainScreen />
              </EnvelopeContext>
            </ProtectedRoute>
          </UserProvider>
        ),
      },
      {
        path: "/forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "/onboarding",
        element: (
          <UserProvider>
            <OnboardingScreen />
          </UserProvider>
        ),
      },
      {
        path: "*",
        element: <LandingPage />,
      },
    ],
  },
]);
export default routes;
