"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { User } from "@/types/auth.types";

const AuthContext = createContext<{ user: User | null; logout: () => void }>({
  user: null,
  logout: () => undefined,
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Administrator",
    role: "admin",
  });
  const value = useMemo(() => ({ user, logout: () => setUser(null) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
