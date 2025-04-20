import axiosInstance from "@/lib/config/api";
import { ENDPOINTS } from "@/lib/config/constants";

export const dashboardService = {
  getAccountantData: async () => {
    const response = await axiosInstance.get(ENDPOINTS.DASHBOARD.ACCOUNTANT);
    return response.data;
  },
};
