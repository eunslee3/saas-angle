// pages/api/auth/exchange.ts
import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  const { access_token } = await req.json()

  const { data: user, error } = await supabase.auth.getUser(access_token)
  if (error || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const customJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  const cookie = serialize('auth_token', customJwt, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  })

  const res = NextResponse.json({ success: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
