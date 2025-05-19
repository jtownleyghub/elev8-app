import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for an authenticated route
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/goals") ||
    request.nextUrl.pathname.startsWith("/tasks") ||
    request.nextUrl.pathname.startsWith("/life-areas") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/settings")

  // In a real app, you would check for a valid session/token here
  // For now, we'll use localStorage in the client components

  // Allow all requests to proceed - authentication will be handled client-side
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/goals/:path*",
    "/tasks/:path*",
    "/life-areas/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
}
