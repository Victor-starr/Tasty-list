import { Navigate, Outlet } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

export default function GuestGuard() {
  const { user, justLoggedIn } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (user && !justLoggedIn) {
      showNotification({
        data: { message: "You are already logged in" },
        status: 400,
      });
    }
  }, [user, justLoggedIn, showNotification]);

  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
