import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { NotificationContext } from "../../context/NotificationContext";

function Logout() {
  const { logout } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutFunction = async () => {
      const res = await logout();
      showNotification(res);
      navigate("/");
    };

    logoutFunction();
  }, [logout, showNotification, navigate]);

  return null;
}

export default Logout;
