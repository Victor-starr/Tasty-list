import { useState, useEffect, ReactNode, JSX } from "react";
import { AuthContext } from "./AuthContext";
import { UserDataFormType, ServerResponde } from "../types";
import axiosInstance from "../axiosInstance";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserDataFormType | null>(null);
  const [loading, setLoading] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData: UserDataFormType): Promise<ServerResponde> => {
    if (!userData.email || !userData.password) {
      throw {
        message: "All fields are required",
        status: 400,
      };
    }
    const res = await axiosInstance.post("/auth/login", userData);
    setJustLoggedIn(true);
    await checkAuth();
    return res;
  };

  const register = async (
    userData: UserDataFormType
  ): Promise<ServerResponde> => {
    if (!userData.username || !userData.email || !userData.password) {
      throw {
        message: "All fields are required",
        status: 400,
      };
    }
    const res = await axiosInstance.post("/auth/register", userData);
    return res;
  };

  const logout = async (): Promise<ServerResponde> => {
    const res = await axiosInstance.post("/auth/logout", {});
    setUser(null);
    setJustLoggedIn(false);
    await checkAuth();
    return res;
  };

  const profileUpdate = async (formData: FormData): Promise<ServerResponde> => {
    if (!formData.get("username") || !formData.get("email")) {
      throw {
        message: "Username and email are required",
        status: 400,
      };
    }
    const res = await axiosInstance.put("/auth/profile-update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await checkAuth();
    return res;
  };

  const profilePasswordUpdate = async (
    userData: UserDataFormType
  ): Promise<ServerResponde> => {
    if (!userData.password || !userData.rePassword) {
      throw {
        message: "All fields are required",
        status: 400,
      };
    }
    if (userData.password !== userData.rePassword) {
      throw {
        message: "Passwords do not match",
        status: 400,
      };
    }
    const res = await axiosInstance.put("/auth/profile-newpassword", userData);
    return res;
  };

  const profileDelete = async (): Promise<ServerResponde> => {
    const res = await axiosInstance.delete("/auth/profile-delete");
    setUser(null);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        profileUpdate,
        profilePasswordUpdate,
        profileDelete,
        justLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
