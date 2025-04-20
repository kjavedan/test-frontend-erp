import axiosInstance from "@/lib/config/api";
import { ENDPOINTS } from "@/lib/config/constants";

import { LoginFormData, VerifyOtpData } from "@/types/auth";

export const authService = {
  login: async (data: LoginFormData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.VERIFY_OTP, data);
    return response.data;
  },
};
