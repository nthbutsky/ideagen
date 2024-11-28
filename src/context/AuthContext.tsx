"use client";

import { User } from "@supabase/supabase-js";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";

const AuthContext = createContext<User | null>(null);

export const AuthProvider: FunctionComponent<{
  children: ReactNode;
  user: User | null;
}> = ({ children, user }) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
