import { useState } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: "khaled",
    id: "1",
    email: "devkahled",
    userType: "root",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Add initialization logic here
  // This will be where we check for tokens and fetch user data

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
