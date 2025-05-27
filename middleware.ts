import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

// This is a simple middleware to handle authentication
// In a real application, you would verify the session/token
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isApi = request.nextUrl.pathname.startsWith('/api')

  // If the token is not present, redirect to the login page
  if (!token) {
    if (isApi) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized', status: 401 }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Exclude Supabase auth routes too
    '/((?!api|_next|favicon.ico|auth|landing-page|beachhead_logo1.svg|ben.jpg|sarah.jpg|mike.jpg|auth/v1/|callback).*)',
  ],
}

