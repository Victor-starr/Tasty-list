import { Navigate, Outlet } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

export default function AuthGuard() {
  const { user, loading } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (loading && !user) {
      showNotification({
        data: { message: "You must be logged in to access this page" },
        status: 401,
      });
    }
  }, [user, loading, showNotification]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
