"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { deleteSession, getSession } from "@/services/userService";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = async () => {
    await deleteSession();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getSession();

      if (response.success) setIsAuthenticated(response.data.isAuthenticated);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Ocorreu um erro ao carregar o contexto da aplicação!");
  }
  return context;
};
