"use client";

import ApexCharts from "apexcharts";
import { useEffect, useId } from "react";
import { formatNumber } from "@/lib/utils/format";
import { FinancialsType } from "@/types/dashboard";

type DistributionData = {
  label: string;
  percentage: number;
  value: number;
  color: string;
  icon: React.ReactNode;
};

export default function FinancialProfitDistribution(props: FinancialsType) {
  const chartId = useId();

  const data: DistributionData[] = [
    {
      label: "Profit",
      percentage: props.profitDistribution.profit | 0,
      value: props.revenue | 0,
      color: "#1C64F2",
      icon: (
        <svg
          className="size-5 "
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
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
      ),
    },
    {
      label: "Expenses",
      percentage: props.profitDistribution.expenses | 0,
      value: props.expenses | 0,
      color: "#16BDCA",
      icon: (
        <svg
          className="size-5"
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
            d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
          />
        </svg>
      ),
    },
    {
      label: "Assets",
      percentage: props.profitDistribution.assets | 0,
      value: props.stockValue,
      color: "#C81E1E",
      icon: (
        <svg
          className="size-5"
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
            d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
          />
        </svg>
      ),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
      height: 40,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100%",
        distributed: false,
        dataLabels: {
          position: "center",
          hideOverflowingLabels: true,
        },
      },
    },
    colors: data.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    series: data.map((item) => ({
      name: item.label,
      data: [item.percentage],
    })),
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}%`,
      },
      style: {
        fontSize: "12px",
      },
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: 20,
        top: -10,
        bottom: -10,
      },
    },
    xaxis: {
      categories: [""],
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
    legend: {
      show: false,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
  };

  useEffect(() => {
    let chart: ApexCharts | undefined;

    if (typeof window !== "undefined") {
      const element = document.getElementById(chartId);
      if (element) {
        chart = new ApexCharts(element, options);
        chart.render();
      }
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    //eslint-disable-next-line
  }, [chartId]);

  return (
    <div className="w-full min-w-[350px] p-4">
      <div className="mb-2 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-start">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <span>{item.icon}</span>
              <span className="text-sm ">{item.label}</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${formatNumber(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!(!props.revenue && !props.expenses && !props.stockValue) && (
        <>
          <div id={chartId}></div>
          <div className="mt-2 flex items-center justify-center gap-4">
            {data.map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
