import { useState, useEffect, ReactNode, JSX } from "react";
import { AuthContext } from "./AuthContext";
import { UserDataFormType, ServerErrorMessage } from "../types";
import axiosInstance from "../axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserDataFormType | null>(null);
  const [authChanged, setAuthChanged] = useState(false); // State to trigger re-renders

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to check auth:", error);
        setUser(null);
      }
    };
    checkAuth();
  }, [authChanged]); // Trigger useEffect when authChanged toggles

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
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.data.user);
      setAuthChanged((prev) => !prev); // Toggle authChanged to trigger re-render
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
      setAuthChanged((prev) => !prev); // Toggle authChanged to trigger re-render
    } catch (error) {
      throw new Error((error as ServerErrorMessage).response.data.message);
    }
  };

  const logout = async (): Promise<void> => {
    await axiosInstance.post("/auth/logout", {});
    setUser(null);
    setAuthChanged((prev) => !prev); // Toggle authChanged to trigger re-render
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
