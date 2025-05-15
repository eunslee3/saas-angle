import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware to handle authentication
// In a real application, you would verify the session/token
export function middleware(request: NextRequest) {
  // For demonstration purposes only
  // In a real app, you would check for a valid session or token
  const isAuthenticated = false

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/signup"]

  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect authenticated users away from login/signup pages
  // if (isAuthenticated && isPublicPath) {
  //   return NextResponse.redirect(new URL("/", request.url))
  // }

  // // Redirect unauthenticated users to login page
  // if (!isAuthenticated && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
