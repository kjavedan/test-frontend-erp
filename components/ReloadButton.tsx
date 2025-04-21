"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { retryDashboardData } from "@/app/actions/dashboard";

export default function ReloadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      const result = await retryDashboardData();

      if (result.error) {
        if (result.error === "No token found") {
          router.push("/session-expired");
          return;
        }
        throw new Error(result.error);
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-32 flex !w-full flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Access Denied
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          You dont have permission to view this page. Please try again.
        </p>
        <button
          onClick={handleRetry}
          disabled={isLoading}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Try Again"}
        </button>
      </div>
    </div>
  );
}
