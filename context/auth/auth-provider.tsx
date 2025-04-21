import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./auth-context";
import { LoginFormData, User, VerifyOtpData } from "@/types/auth";
import { HTTP_STATUS } from "@/lib/config/constants";
import { useRouter } from "next/navigation";

// API endpoints
const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  VERIFY_OTP: "/api/auth/verify-otp",
} as const;

// Error messages
const ERROR_MESSAGES = {
  LOGIN_FAILED: "Login failed",
  OTP_VERIFICATION_FAILED: "Failed to verify OTP",
  PASSWORD_NOT_SET: "Password not set",
} as const;

// Success messages
const SUCCESS_MESSAGES = {
  LOGIN_SUCCESSFUL: "Login successful!",
} as const;

/**
 * AuthProvider component that manages authentication state and provides
 * authentication-related functions to its children.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Handles the login process by making an API call and managing the response.
   * @param data - Login form data containing email, userType, and ipAddress
   */
  const login = async (data: LoginFormData) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        handleLoginError(response.status, result, data);
        return;
      }

      redirectToOtpPage(data);
    } catch (error) {
      toast.error(ERROR_MESSAGES.LOGIN_FAILED);
      throw error;
    }
  };

  /**
   * Handles different login error scenarios based on HTTP status codes.
   */
  const handleLoginError = (
    status: number,
    result: { error: string },
    data: LoginFormData,
  ) => {
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
      case HTTP_STATUS.NOT_FOUND:
        toast.error(result.error);
        break;
      case HTTP_STATUS.FORBIDDEN:
        toast.error(ERROR_MESSAGES.PASSWORD_NOT_SET);
        break;
      case HTTP_STATUS.LOCKED:
        redirectToOtpPage(data);
        break;
      default:
        throw new Error(result.error || ERROR_MESSAGES.LOGIN_FAILED);
    }
  };

  /**
   * Redirects to the OTP page with the necessary parameters.
   */
  const redirectToOtpPage = (data: LoginFormData) => {
    const params = new URLSearchParams({
      email: data.email,
      userType: data.userType,
      ipAddress: data.ipAddress || "",
    });
    router.push(`/otp?${params.toString()}`);
  };

  /**
   * Verifies the OTP code and updates the authentication state.
   * @param data - OTP verification data
   */
  const verifyOtp = async (data: VerifyOtpData) => {
    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
        throw new Error(result.error || ERROR_MESSAGES.OTP_VERIFICATION_FAILED);
      }

      setUser(result.data.user);
      setIsAuthenticated(true);
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESSFUL);
      router.push("/dashboard");
    } catch (error) {
      toast.error(ERROR_MESSAGES.OTP_VERIFICATION_FAILED);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
