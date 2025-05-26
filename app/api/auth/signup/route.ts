import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { supabase } from '@/lib/supabaseClient'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const password_hash = await bcrypt.hash(password, 10)

  const { data: user, error } = await supabase
    .from('users')
    .insert({ email, password_hash })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' })

  const response = NextResponse.json({ success: true })
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
