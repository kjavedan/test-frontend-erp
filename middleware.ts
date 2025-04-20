import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKENS } from "./lib/config/constants";

// Define public and private routes
const publicRoutes = ["/login", "/otp"];
const privateRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(TOKENS.ACCESS);

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if the route is private
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If user is not authenticated and trying to access private route
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access public route
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Run middleware on all routes except static files and api routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
