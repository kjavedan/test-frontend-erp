"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function SessionExpiredDialog() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="mt-[-100px] w-full max-w-md rounded-lg bg-white p-6">
        <div className="text-center">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Session Expired
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Your session has ended. Please log in again to continue.
          </p>
          <Button
            onClick={handleLogin}
            className="!w-full !bg-ghred-500 hover:!bg-ghred-600 focus:!ring-ghred-700"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
