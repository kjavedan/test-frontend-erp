import { HTTP_STATUS, TOKENS } from "@/lib/config/constants";
import { cookies } from "next/headers";
import { dashboardService } from "@/services/dashboard";
import DashboardContent from "@/components/DashboardContent";
import { DashboardAccountantType } from "@/types/dashboard";

import ReloadButton from "@/components/ReloadButton";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKENS.ACCESS)?.value;

  if (!token) {
    redirect("/session-expired");
  }

  try {
    const data: DashboardAccountantType =
      await dashboardService.getAccountantData(token);
    return <DashboardContent {...data} />;
  } catch (error: any) {
    if (error?.status === HTTP_STATUS.FORBIDDEN) {
      return (
        <div className="!w-full">
          <ReloadButton />
        </div>
      );
    }
  }
}
