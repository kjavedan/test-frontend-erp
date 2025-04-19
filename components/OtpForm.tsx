"use client";
import { useState } from "react";
import { UserType, VerifyOtpData } from "@/app/lib/types/auth";
import { Button } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export function EmailVerificationOTPForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const userType = (searchParams.get("userType") as UserType) || "root";
  const ipAddress = searchParams.get("ipAddress") || undefined;

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `#otp-${index + 1}`,
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");

      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        return;
      }

      const formData: VerifyOtpData = {
        email,
        userType,
        ipAddress,
        otp,
      };

      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to verify OTP");
        return;
      }

      // Handle successful verification (e.g., redirect to dashboard)
      router.push("/dashboard");
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white px-4 py-8 dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="hidden w-full max-w-md bg-primary-600 p-12 lg:block lg:h-screen">
          <div className="mb-8 flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center text-2xl font-semibold text-white"
            >
              <Image
                width={100}
                height={50}
                alt=""
                src="./gh_small_logo.svg"
                className="mr-2 size-11"
              />
            </a>
            <a
              href="/login"
              className="inline-flex items-center text-sm font-medium text-primary-100 hover:text-white"
            >
              <svg
                className="mr-1 size-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </a>
          </div>
        </div>
        <div className="mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0">
          <div className="w-full">
            <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your email address
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              We emailed you a six-digit code to&nbsp;
              <span className="font-medium text-gray-900 dark:text-white">
                {email}
              </span>
              . Enter the code below to confirm your email address.
            </p>
            <form onSubmit={onSubmit}>
              <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <label htmlFor={`otp-${index}`} className="sr-only">
                      OTP digit {index + 1}
                    </label>
                    <input
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className={`block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 focus:border-ghred-500 focus:ring-ghred-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 sm:size-16 sm:py-4 sm:text-4xl ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    />
                  </div>
                ))}
              </div>
              {error && (
                <p className="mb-4 text-sm text-red-600 dark:text-red-600">
                  {error}
                </p>
              )}
              <p className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
                Make sure to keep this window open while checking your inbox.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="xl"
                  className="w-full bg-ghred-500 hover:bg-ghred-600 [&>span]:text-sm"
                >
                  {isSubmitting ? "Verifying..." : "Verify account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
