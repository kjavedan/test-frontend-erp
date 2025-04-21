"use client";

import { useEffect, useId } from "react";
import { formatNumber } from "@/lib/utils/format";

// Create a client-side only wrapper for ApexCharts
const Chart = ({ chartId, options }: { chartId: string; options: any }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ApexCharts = require("apexcharts");
    const element = document.getElementById(chartId);
    if (element) {
      const chart = new ApexCharts(element, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartId, options]);

  return <div id={chartId} />;
};

export default function FinancialMetric(props: {
  label: string;
  value: number;
  growth: string;
}) {
  const chartId = useId();

  const options = {
    chart: {
      height: 130,
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New purchase",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="relative w-full max-w-sm border-r border-solid border-r-gray-100 bg-white p-4 dark:border-r-gray-700 dark:bg-gray-800">
      <div className="flex justify-between">
        <div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {props.label}
          </p>
          <h5 className="mt-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
            ${formatNumber(props.value)}
          </h5>
        </div>
        <div className="flex h-fit items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {!!props.value && (
            <svg
              className="mx-1 size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          )}
          {props.value ? props.growth : 0}%
        </div>
      </div>
      {!!props.value && <Chart chartId={chartId} options={options} />}
    </div>
  );
}
