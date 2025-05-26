import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware to handle authentication
// In a real application, you would verify the session/token
export function middleware(request: NextRequest) {
  const token = request.cookies.get('your_auth_cookie_name')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /**
     * Protect everything except:
     * - login/signup pages (/auth)
     * - landing page (/ or /landingpage)
     * - static files (_next, favicon, etc.)
     */
    '/((?!_next|favicon.ico|auth|landingpage).*)',
  ],
}
