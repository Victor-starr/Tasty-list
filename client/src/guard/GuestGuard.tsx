import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function GuestGuard() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
