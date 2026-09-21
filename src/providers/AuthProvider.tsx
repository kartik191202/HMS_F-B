// "use client";
// import { createContext, useContext, useMemo, useState } from "react";
// import type { User } from "@/types/auth.types";

// const AuthContext = createContext<{ user: User | null; logout: () => void }>({
//   user: null,
//   logout: () => undefined,
// });
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>({
//     id: "1",
//     name: "Administrator",
//     role: "admin",
//   });
//   const value = useMemo(() => ({ user, logout: () => setUser(null) }), [user]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
// export function useAuth() {
//   return useContext(AuthContext);
// }


"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@/types/auth.types";
import {
  login as loginRequest,
  logout as logoutRequest,
} from "@/services/auth.service";

type AuthContextValue = {
  user: User | null;
  isAuthLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_STORAGE_KEY = "hms_authenticated_user";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = sessionStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
    } catch {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  async function login(username: string, password: string) {
    const authenticatedUser = await loginRequest(
      username,
      password,
    );

    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthLoading,
      login,
      logout,
    }),
    [user, isAuthLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}
