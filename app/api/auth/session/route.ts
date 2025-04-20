import { NextRequest, NextResponse } from "next/server";
import { UserSession } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const session: UserSession = await request.json();

    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error setting session:", error);
    return NextResponse.json(
      { error: "Failed to set session" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    // Clear the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete("session");

    return response;
  } catch (error) {
    console.error("Error clearing session:", error);
    return NextResponse.json(
      { error: "Failed to clear session" },
      { status: 500 },
    );
  }
}
