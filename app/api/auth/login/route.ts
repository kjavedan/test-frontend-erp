import { withErrorHandler } from "@/lib/utils/route-handler";
import { NextRequest } from "next/server";
import { authService } from "@/services/auth";

export async function POST(req: NextRequest) {
  return withErrorHandler(req, async (req) => {
    const data = await req.json();
    return authService.login(data);
  });
}
