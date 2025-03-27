import { createContext } from "react";
import { UserDataFormType, ServerResponde } from "../types";

interface AuthContextType {
  user: UserDataFormType | null;
  loading: boolean;
  login: (userData: UserDataFormType) => Promise<ServerResponde>;
  register: (userData: UserDataFormType) => Promise<ServerResponde>;
  logout: () => Promise<ServerResponde>;
  justLoggedIn: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => ({ data: { message: "" }, status: 200 }),
  register: async () => ({ data: { message: "" }, status: 200 }),
  logout: async () => ({ data: { message: "" }, status: 200 }),
  justLoggedIn: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
