import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  // Clear the auth_token cookie
  const cookie = serialize('auth_token', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // expire it
  })

  const res = NextResponse.json({ success: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
