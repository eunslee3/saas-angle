// pages/api/auth/exchange.ts
import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  const { access_token } = await req.json()

  if (process.env.NODE_ENV !== 'production') {
    console.log('access_token:', access_token)
  }

  const { data, error } = await supabase.auth.getUser(access_token)

  if (process.env.NODE_ENV !== 'production') {
    console.log('user data:', JSON.stringify(data))
    console.log('error:', error)
  }

  const user = data.user

  if (!user) {
    return NextResponse.json({ error: 'Invalid token', status: 401 }, { status: 401 })
  }

  // Identify the correct identity provider
  const githubIdentity = user.identities?.find(i => i.provider === 'github')
  const googleIdentity = user.identities?.find(i => i.provider === 'google')
  const activeIdentity = githubIdentity || googleIdentity || user.identities?.[0]

  const provider = activeIdentity?.provider
  const providerId = activeIdentity?.id

  // Extract first and last name
  const fullName = user.user_metadata.full_name || ''
  const parts = fullName.trim().split(' ')
  const firstName = parts[0]
  const lastName = parts.length > 1 ? parts[parts.length - 1] : ''

  // Check if user exists
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (userError || error) {
    return NextResponse.json({ error: 'User fetch error', status: 401 }, { status: 401 })
  }

  // If user doesn't exist, create a new user
  if (!userData) {
    await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        auth_provider: provider,
        provider_id: providerId,
        first_name: firstName,
        last_name: lastName,
      })
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

  const res = NextResponse.json({ success: true, userId: user.id })
  res.headers.set('Set-Cookie', cookie)
  return res
}
