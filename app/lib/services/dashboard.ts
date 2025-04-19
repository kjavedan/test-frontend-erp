import axiosInstance from "@/app/lib/config/api";
import { ENDPOINTS } from "@/app/lib/config/constants";

export const dashboardService = {
  getAccountantData: async () => {
    const response = await axiosInstance.get(ENDPOINTS.DASHBOARD.ACCOUNTANT);
    return response.data;
  },
};
