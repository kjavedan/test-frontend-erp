import { NextRequest } from "next/server";
import { authService } from "@/services/auth";

import { withErrorHandler } from "@/lib/utils/route-handler";

export async function POST(req: NextRequest) {
  return withErrorHandler(req, async () => {
    const data = await req.json();
    return authService.verifyOtp(data);
  });
}
