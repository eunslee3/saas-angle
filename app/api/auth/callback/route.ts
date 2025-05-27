// pages/api/auth/exchange.ts
import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  const { access_token } = await req.json()
  const { data, error } = await supabase.auth.getUser(access_token)
  let provider: string | undefined
  let identityId: string | undefined
  let firstName: string | undefined
  let lastName: string | undefined

  const user = data.user;

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  if (user?.identities && user.identities.length > 0 && user.identities[0].provider) {
    provider = user.identities[0].provider
    identityId = user.identities[0].id
    const fullName = user.user_metadata.full_name
    const parts = fullName.trim().split(' ')
    firstName = parts[0]
    lastName = parts.length > 1 ? parts[parts.length - 1] : ''
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (userError || error || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  if (!userData || userData.length === 0) {
    await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        auth_provider: provider,
        provider_id: identityId,
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

  const res = NextResponse.json({ success: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
