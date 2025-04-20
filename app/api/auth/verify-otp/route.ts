import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth";
import { withErrorHandler } from "@/lib/utils/route-handler";
import { HTTP_STATUS } from "@/lib/config/constants";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  return withErrorHandler(req, async () => {
    const data = await req.json();
    const response = await authService.verifyOtp(data);

    // Check if we have a successful response
    if (response && response.accessToken && response.refreshToken) {
      const { accessToken, refreshToken, user } = response;
      const cookieStore = cookies();

      // Set access token cookie
      cookieStore.set({
        name: "access_token",
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Set refresh token cookie
      cookieStore.set({
        name: "refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Log the cookies that were set
      const allCookies = cookieStore.getAll();
      console.log("Cookies after setting:", allCookies);

      // Return a consistent response structure
      return NextResponse.json(
        {
          data: user,
          status: HTTP_STATUS.OK,
        },
        { status: HTTP_STATUS.OK },
      );
    }

    // Return the original response if verification failed
    return response;
  });
}
