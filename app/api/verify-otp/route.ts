import { NextRequest } from "next/server";
import { authService } from "@/app/lib/services/auth";

import { withErrorHandler } from "@/app/lib/utils/route-handler";

export async function POST(req: NextRequest) {
  return withErrorHandler(req, async () => {
    const data = await req.json();
    return authService.verifyOtp(data);
  });
}
