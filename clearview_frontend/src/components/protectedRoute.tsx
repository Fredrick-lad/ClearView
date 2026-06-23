import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/context/userContext";
import LoadingScreen from "./loadingscreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userData, isLoading } = useAuth();
  const location = useLocation();

  try {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (userData === null) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
  } catch (error) {}
}
export default ProtectedRoute;
