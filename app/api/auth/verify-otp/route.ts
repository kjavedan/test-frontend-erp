import { cookies } from "next/headers";
import { authService } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/utils/route-handler";
import { HTTP_STATUS, TOKENS } from "@/lib/config/constants";

export async function POST(request: NextRequest) {
  return withErrorHandler(request, async () => {
    const data = await request.json();
    const response = await authService.verifyOtp(data);

    // Check if we have a successful response
    if (response && response.accessToken && response.refreshToken) {
      const { accessToken, refreshToken, user } = response;
      const cookieStore = cookies();

      // Set access token cookie
      cookieStore.set({
        name: TOKENS.ACCESS,
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes in seconds
      });

      // Set refresh token cookie
      cookieStore.set({
        name: TOKENS.REFRESH,
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      });
      const allCookies = cookieStore.getAll();

      // Return a consistent response structure
      return NextResponse.json(
        {
          data: { user },
          status: HTTP_STATUS.OK,
        },
        { status: HTTP_STATUS.OK },
      );
    }

    // Return the original response if verification failed
    return response;
  });
}
