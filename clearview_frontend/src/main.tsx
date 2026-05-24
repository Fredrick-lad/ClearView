import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./components/landingpage.tsx";
import NotFound from "./components/NotFound.tsx";
import Budgeting from "./components/budgeting.tsx";
import { Login, Register, Forgotpassword } from "./components/onboading.tsx";
import Dashboard from "./components/dashboard.tsx";

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
        element: <Dashboard />,
      },
      {
        path: "/budgeting",
        element: <Budgeting />,
      },
      {
        path: "/forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
