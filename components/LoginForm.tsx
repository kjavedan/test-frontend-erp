"use client";

import * as Yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { LoginFormData } from "@/app/lib/types/auth";
import { HTTP_STATUS } from "@/app/lib/config/constants";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    userType: Yup.string()
      .oneOf(
        ["root", "garage", "agent", "driver"] as const,
        "Invalid user type",
      )
      .required("User type is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
    ipAddress: Yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any,
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setServerError("");

      // Make API call to our Next.js API route
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case HTTP_STATUS.UNAUTHORIZED:
            console.error("Incorrect password");
            break;
          case HTTP_STATUS.FORBIDDEN:
            console.error("Password not set");
            break;
          case HTTP_STATUS.NOT_FOUND:
            console.log("/signup");
            break;
          case HTTP_STATUS.LOCKED:
            console.log("verify email");
            break;
          default:
            throw new Error(result.error || "Login failed");
        }
        return;
      }

      // Create URL parameters from login data
      const params = new URLSearchParams({
        email: data.email,
        userType: data.userType,
        ipAddress: data.ipAddress || "",
      });

      // Navigate to OTP page with the data
      router.push(`/otp?${params.toString()}`);
      // Handle successful login
      console.log("Login successful:", result);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Login failed");
      console.log(err);
    }
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image
          className="mb-6 mr-2"
          src="/gh_full_logo.svg"
          alt="logo"
          width={450}
          height={80}
        />
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <Card className="shadow-none">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <Label
                  htmlFor="email"
                  className={`mb-2 block dark:text-white ${errors.email ? "text-red-700 dark:text-red-500" : ""}`}
                >
                  Your email
                </Label>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  {...register("email")}
                  color={errors.email ? "failure" : "gray"}
                  className={`${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="userType"
                  className={`mb-2 block dark:text-white ${errors.userType ? "text-red-700 dark:text-red-500" : ""}`}
                >
                  User Type
                </Label>
                <Select
                  id="userType"
                  {...register("userType")}
                  color={errors.userType ? "failure" : "gray"}
                  className={`${errors.userType ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                >
                  <option value="">Select user type</option>
                  <option value="root">Root</option>
                  <option value="garage">Garage</option>
                  <option value="agent">Agent</option>
                  <option value="driver">Driver</option>
                </Select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.userType.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className={`mb-2 block dark:text-white ${errors.password ? "text-red-700 dark:text-red-500" : ""}`}
                >
                  Password
                </Label>
                <TextInput
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register("password")}
                  color={errors.password ? "failure" : "gray"}
                  className={`${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox id="remember" />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ghred-500 hover:bg-ghred-600"
              >
                Sign in
              </Button>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {" Don't have an account yet? "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
