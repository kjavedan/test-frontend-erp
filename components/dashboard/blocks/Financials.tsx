import { FinancialsType } from "@/types/dashboard";
import FinancialMetric from "../element/FinancialMetric";
import FinancialProfitDistribution from "../element/FinancialProfitDistribution";

export default function Financials(props: FinancialsType) {
  return (
    <div className="">
      <div className="flex !w-full border-y border-gray-100 py-4 dark:border-gray-700">
        <FinancialMetric
          label="Revenue"
          value={props.revenue}
          growth={"+2,4"}
        />
        <FinancialMetric
          label="Expenses"
          value={props.expenses}
          growth={"+1,24"}
        />
        <FinancialMetric
          label="Stock value"
          value={props.stockValue}
          growth={"+2,34"}
        />
        <FinancialProfitDistribution {...props} />
      </div>
      <button
        type="button"
        className="mt-4 rounded-lg border border-gray-200 px-5 py-1.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
      >
        View Financials reports
      </button>
    </div>
  );
}
