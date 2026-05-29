import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      setSession(false);
      <Navigate to="/landingpage" />;
    }
  }, []);

  return <>{session ? <Outlet /> : <Navigate to="/register" />}</>;
}

export default ProtectedRoute;
