import { DashboardAccountantType } from "@/types/dashboard";
import Financials from "./dashboard/blocks/Financials";
import Stats from "./dashboard/blocks/Stats";

export default function DashboardContent(props: DashboardAccountantType) {
  return (
    <div className="!w-full space-y-6 dark:text-white">
      {/* Header */}
      <div className="rounded-lg border-2 border-dashed border-gray-100 p-4 dark:border-gray-700">
        <h2 className="text-2xl font-bold ">Welcome Bellinda! </h2>
        <p className="mt-1 text-sm text-gray-500">Tuesday,28 May, 2024</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid !w-full gap-6 rounded-lg p-4 shadow-md">
        <Stats {...props.stats} />

        <Financials {...props.financials} />
      </div>
    </div>
  );
}
