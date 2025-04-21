import axiosInstance from "@/lib/config/api";
import { ENDPOINTS } from "@/lib/config/constants";

export const dashboardService = {
  getAccountantData: async (token: string) => {
    const response = await axiosInstance.get(ENDPOINTS.DASHBOARD.ACCOUNTANT, {
      headers: { token },
    });
    return response.data;
  },
};
