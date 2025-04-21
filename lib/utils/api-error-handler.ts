import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";
import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/lib/config/constants";

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  if (!(error instanceof AxiosError)) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }

  const { status, data } = error.response || {};

  return NextResponse.json(
    {
      error: data?.detail || "Operation failed",
      status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
    { status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR },
  );
}
