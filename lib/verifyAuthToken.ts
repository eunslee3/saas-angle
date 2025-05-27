// lib/auth.ts
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { parseCookies } from './parseCookies'

export async function verifyAuthToken(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')

  const cookies = parseCookies(cookieHeader)
  console.log('cookies: ', cookies)
  const token = cookies['auth_token']
  console.log('token: ', token)

  if (!token) {
    throw new Error('Missing auth token')
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (err) {
    throw new Error('Invalid or expired token')
  }
}
