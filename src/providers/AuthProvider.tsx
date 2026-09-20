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
  useMemo,
  useState,
} from "react";
import type { User } from "@/types/auth.types";
import { login as loginRequest } from "@/services/auth.service";

type AuthContextValue = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  async function login(username: string, password: string) {
    const authenticatedUser = await loginRequest(
      username,
      password,
    );

    setUser(authenticatedUser);
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
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