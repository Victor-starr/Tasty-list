import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { UserDataFormType, ServerErrorMessage } from "../types";

const useAuthAPI = () => {
  const { login, register, logout } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<UserDataFormType>>({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearPasswords = () => {
    setFormData((prev) => ({
      ...prev,
      password: "",
      rePassword: "",
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await login(formData as UserDataFormType);
      showNotification(res);
      navigate("/");
    } catch (err) {
      showNotification(err as ServerErrorMessage);
      clearPasswords();
    }
  };

  const handleRegister = async () => {
    try {
      const res = await register(formData as UserDataFormType);
      showNotification(res);
      navigate("/auth/login");
    } catch (err) {
      showNotification(err as ServerErrorMessage);
      clearPasswords();
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      showNotification(res);
      navigate("/");
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    }
  };

  return {
    formData,
    handleInput,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuthAPI;
