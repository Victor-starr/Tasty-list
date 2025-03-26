import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthGuard() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
