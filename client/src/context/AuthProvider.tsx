import { useState, useEffect, ReactNode, JSX } from "react";
import { AuthContext } from "./AuthContext";
import { UserDataFormType, ServerErrorMessage } from "../types";
import axiosInstance from "../axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserDataFormType | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to check auth:", error);
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after the check
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData: UserDataFormType): Promise<void> => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.rePassword === ""
    ) {
      throw new Error("All fields are required");
    }
    if (userData.password !== userData.rePassword) {
      throw new Error("Passwords do not match");
    }
    try {
      await axiosInstance.post("/auth/login", userData);
      await checkAuth(); // Refresh user state after login
    } catch (error) {
      throw new Error((error as ServerErrorMessage).response.data.message);
    }
  };

  const register = async (userData: UserDataFormType): Promise<void> => {
    if (
      userData.username === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      throw new Error("All fields are required");
    }
    try {
      await axiosInstance.post("/auth/register", userData);
    } catch (error) {
      throw new Error((error as ServerErrorMessage).response.data.message);
    }
  };

  const logout = async (): Promise<void> => {
    await axiosInstance.post("/auth/logout", {});
    setUser(null);
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
