'use client'

// pages/auth/callback.tsx
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Callback() {
  useEffect(() => {
    const handleCallback = async () => {
      // ✅ Exchange Supabase access token for your custom JWT
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      const session = data?.session

      if (error || !session) {
        window.location.href = '/auth'
        return
      }

      // ✅ Exchange Supabase access token for your custom JWT
      await fetch('/api/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: session.access_token }),
      })

      // ✅ Redirect to your app's homepage or dashboard
      window.location.href = '/'
    }

    handleCallback()
  }, [])

  return <p>Signing you in...</p>
}
