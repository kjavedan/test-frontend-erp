import { HTTP_STATUS } from "../config/constants";
import { ApiResponse } from "@/types/api";
import { handleApiError } from "./api-error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function withErrorHandler<T>(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<T>,
): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await handler(request);

    // If the response is already a NextResponse, return it as is
    if (data instanceof NextResponse) {
      return data;
    }

    // Otherwise, wrap the response
    return NextResponse.json(
      { data, status: HTTP_STATUS.OK },
      { status: HTTP_STATUS.OK },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
