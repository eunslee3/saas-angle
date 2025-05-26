import { cookies } from 'next/headers'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('your_auth_cookie_name')?.value

  return !!token
}
