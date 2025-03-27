import { useEffect } from "react";
import useAuthAPI from "../../hooks/useAuthAPI";

function Logout() {
  const { handleLogout } = useAuthAPI();

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
}

export default Logout;
