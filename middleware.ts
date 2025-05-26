import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware to handle authentication
// In a real application, you would verify the session/token
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isApi = request.nextUrl.pathname.startsWith('/api')

  if (!token) {
    if (isApi) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized', status: 401 }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Exclude API routes, static files, favicon, auth/landing pages, and the logo SVG
    '/((?!api|_next|favicon.ico|auth|landing-page|beachhead_logo1.svg|ben.jpg|sarah.jpg|mike.jpg).*)',
  ],
}
