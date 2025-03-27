import { useState, useEffect, ReactNode, JSX } from "react";
import { AuthContext } from "./AuthContext";
import { UserDataFormType, ServerResponde } from "../types";
import axiosInstance from "../axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserDataFormType | null>(null);
  const [loading, setLoading] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false); // New flag

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to check auth:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData: UserDataFormType): Promise<ServerResponde> => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.rePassword === ""
    ) {
      throw {
        response: { status: 400, data: { message: "All fields are required" } },
      };
    }
    if (userData.password !== userData.rePassword) {
      throw {
        response: { status: 400, data: { message: "Passwords do not match" } },
      };
    }
    const res = await axiosInstance.post("/auth/login", userData);
    setJustLoggedIn(true); // Set the flag to true after login
    await checkAuth();
    return res;
  };

  const register = async (
    userData: UserDataFormType
  ): Promise<ServerResponde> => {
    if (
      userData.username === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      throw {
        response: { status: 400, data: { message: "All fields are required" } },
      };
    }
    const res = await axiosInstance.post("/auth/register", userData);
    return res;
  };

  const logout = async (): Promise<ServerResponde> => {
    const res = await axiosInstance.post("/auth/logout", {});
    setUser(null);
    setJustLoggedIn(false); // Reset the flag on logout
    await checkAuth();
    return res;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, justLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
