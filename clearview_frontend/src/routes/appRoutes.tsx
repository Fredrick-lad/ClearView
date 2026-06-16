import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import { Login, Register, Forgotpassword } from "../onboarding/onboading";
import LandingPage from "../components/landingpage";
import MainScreen from "../screens/MainScreen";
import ProtectedRoute from "../components/protectedRoute";
import { UserProvider } from "../hooks/context/userContext";
import EnvelopeContext from "../hooks/context/generalContext";
import OnboardingWelcome from "../onboarding/Step1";
import OnboardingStep2 from "../onboarding/Step2";
import OnboardingStep3 from "../onboarding/Step3";

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
        path: "/register",
        element: (
          <UserProvider>
            <Register />
          </UserProvider>
        ),
      },
      {
        path: "*",
        element: <LandingPage />,
      },
      {
        path: "/onboardingStep1",
        element: (
          <UserProvider>
            <OnboardingWelcome />
          </UserProvider>
        ),
      },
      {
        path: "/onboardingStep2",
        element: (
          <UserProvider>
            <OnboardingStep2 />
          </UserProvider>
        ),
      },
      {
        path: "/onboardingStep3",
        element: (
          <UserProvider>
            <EnvelopeContext>
              <OnboardingStep3 />
            </EnvelopeContext>
          </UserProvider>
        ),
      },
    ],
  },
]);
export default routes;
