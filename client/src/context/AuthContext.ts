import { createContext } from "react";
import { UserDataFormType } from "../types";

interface AuthContextType {
  user: UserDataFormType | null;
  loading: boolean;
  login: (userData: UserDataFormType) => Promise<void>;
  register: (userData: UserDataFormType) => void;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
