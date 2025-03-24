import { useState, useEffect, ReactNode, JSX } from "react";
import { AuthContext } from "./AuthContext";
import { UserDataFormType, ServerErrorMessage } from "../types";
import axiosInstance from "../axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserDataFormType | null>(null);

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
  }, [user]);

  const login = async (userData: UserDataFormType): Promise<void> => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.rePassword === ""
    ) {
      throw new Error("Front-end: All fields are required");
    }
    if (userData.password !== userData.rePassword) {
      throw new Error("Front-end: Passwords do not match");
    }
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.data.user);
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
      throw new Error("Front-end: All fields are required");
    }
    try {
      await axiosInstance.post("/auth/register", userData);
    } catch (error) {
      throw new Error((error as ServerErrorMessage).response.data.message);
    }
    // AUTO LOGIN AFTER REGISTER SUCCESS
    await login({
      email: userData.email,
      password: userData.password,
      rePassword: userData.password,
    });
  };

  const logout = async (): Promise<void> => {
    await axiosInstance.post("/auth/logout", {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
