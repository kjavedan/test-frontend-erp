import { formatNumber } from "@/lib/utils/format";

export default function StatMetric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div>
      <span className="text-sm text-gray-500">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <h4 className="text-2xl font-bold">{formatNumber(value)}</h4>
        <span className=" flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          <svg
            className="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </svg>
          <span>1.4%</span>
        </span>
      </div>

      <span className="mt-2 text-sm text-gray-500">vs last month</span>
    </div>
  );
}
