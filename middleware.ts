import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

// This is a simple middleware to handle authentication
// In a real application, you would verify the session/token
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the root path
  if (pathname === "/") {
    return NextResponse.next()
  }

  const token = request.cookies.get('auth_token')?.value
  const isApi = pathname.startsWith('/api')

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

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Exclude API routes, static files, favicon, auth/landing pages, root, and assets
    '/((?!^/$|api|_next|favicon.ico|auth|beachhead_logo1.svg|ben.jpg|sarah.jpg|mike.jpg|auth/v1/|callback).*)',
  ],
}

