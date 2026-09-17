import type { User } from "@/types/auth.types";
export async function login(_email: string, _password: string): Promise<User> {
    return { id: "1", name: "Administrator", role: "admin" };
}
