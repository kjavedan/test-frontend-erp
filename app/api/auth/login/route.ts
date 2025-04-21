import { NextRequest } from "next/server";
import { authService } from "@/services/auth";
import { withErrorHandler } from "@/lib/utils/route-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(request, async (request) => {
    const data = await request.json();
    return authService.login(data);
  });
}
