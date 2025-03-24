import { createContext } from "react";
import { UserDataFormType } from "../types";

interface AuthContextType {
  user: UserDataFormType | null;
  login: (userData: UserDataFormType) => Promise<void>;
  register: (userData: UserDataFormType) => void;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
