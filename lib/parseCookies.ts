// lib/parseCookies.ts
export function parseCookies(cookieHeader: string | null) {
  const cookies: Record<string, string> = {}

  if (!cookieHeader) return cookies

  const pairs = cookieHeader.split(';')

  for (const pair of pairs) {
    const [key, ...v] = pair.trim().split('=')
    cookies[key] = decodeURIComponent(v.join('='))
  }

  return cookies
}
