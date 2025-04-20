import { withErrorHandler } from "@/lib/utils/route-handler";
import { NextRequest } from "next/server";
import { authService } from "@/services/auth";

export async function POST(request: NextRequest) {
  return withErrorHandler(request, async (request) => {
    const data = await request.json();
    return authService.login(data);
  });
}
