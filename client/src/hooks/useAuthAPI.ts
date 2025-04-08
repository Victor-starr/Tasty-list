import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { UserDataFormType, ServerErrorMessage } from "../types";

const useAuthAPI = () => {
  const {
    user,
    login,
    register,
    logout,
    profileUpdate,
    profilePasswordUpdate,
    profileDelete,
  } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<UserDataFormType>>({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    rePassword: "",
    profilePicture: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: user?.username || "",
      email: user?.email || "",
    }));
  }, [user]);

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

  const handleProfileUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username || "");
      formDataToSend.append("email", formData.email || "");
      if (formData.profilePicture instanceof File) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const res = await profileUpdate(formDataToSend);
      showNotification(res);
      navigate("/auth/profile");
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    }
  };

  const hanlderProfilePasswordUpdate = async () => {
    try {
      const res = await profilePasswordUpdate(formData as UserDataFormType);
      showNotification(res);
      navigate("/auth/profile");
    } catch (err) {
      showNotification(err as ServerErrorMessage);
      clearPasswords();
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(
    typeof user?.profilePicture === "string" ? user.profilePicture : null
  );
  const [invalidImage, setInvalidImage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePicture: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setInvalidImage(false);
      };
      reader.onerror = () => {
        setInvalidImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await profileDelete();
      showNotification(res);
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
    handleProfileUpdate,
    hanlderProfilePasswordUpdate,
    handleDelete,
    handleFileChange,
    previewImage,
    invalidImage,
  };
};

export default useAuthAPI;
