export type UserType = "root" | "garage" | "agent" | "driver";

export interface LoginFormData {
  email: string;
  password: string;
  userType: UserType;
  ipAddress?: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
  userType: UserType;
  ipAddress?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  // Add other user fields as needed
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
