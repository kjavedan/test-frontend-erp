"use server";

import { cookies } from "next/headers";
import { TOKENS } from "@/lib/config/constants";
import { dashboardService } from "@/services/dashboard";

export async function retryDashboardData() {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKENS.ACCESS)?.value;

  if (!token) {
    return { error: "No token found" };
  }

  try {
    const data = await dashboardService.getAccountantData(token);
    return { data };
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
