import { HTTP_STATUS } from "../config/constants";
import { ApiResponse } from "@/types/api";
import { handleApiError } from "./api-error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function withErrorHandler<T>(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<T>,
): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await handler(req);
    return NextResponse.json(
      { data, status: HTTP_STATUS.OK },
      { status: HTTP_STATUS.OK },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
