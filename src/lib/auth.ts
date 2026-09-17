import type { User } from "@/types/auth.types";
export function isAuthenticated(user: User | null) {
  return Boolean(user);
}
