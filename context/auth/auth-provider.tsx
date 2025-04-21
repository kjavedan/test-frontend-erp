import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./auth-context";
import { LoginFormData, User, VerifyOtpData } from "@/types/auth";
import { HTTP_STATUS } from "@/lib/config/constants";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (data: LoginFormData) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          toast.error(result.error);
          return;
        case HTTP_STATUS.FORBIDDEN:
          toast.error("Password not set");
          return;
        case HTTP_STATUS.NOT_FOUND:
          toast.error(result.error);
          return;
        case HTTP_STATUS.LOCKED:
          const params = new URLSearchParams({
            email: data.email,
            userType: data.userType,
            ipAddress: data.ipAddress || "",
          });
          router.push(`/otp?${params.toString()}`);
          return;
        default:
          throw new Error(result.error || "Login failed");
      }
    }

    // Create URL parameters from login data
    const params = new URLSearchParams({
      email: data.email,
      userType: data.userType,
      ipAddress: data.ipAddress || "",
    });

    // Navigate to OTP page with the data
    router.push(`/otp?${params.toString()}`);
  };

  const verifyOtp = async (data: VerifyOtpData) => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error);
      throw new Error(result.error || "Failed to verify OTP");
    }

    // Set user data and authentication state
    setUser(result.data.user);
    setIsAuthenticated(true);

    toast.success("Login successful!");
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        //
        login,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
