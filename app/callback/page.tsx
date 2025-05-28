'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Callback() {
  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()
      const session = data?.session

      if (error || !session) {
        window.location.href = '/auth'
        return
      }

      await axios.post('/api/auth/callback', {
        access_token: session.access_token,
      })

      window.location.href = '/'
    }

    handleCallback()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl font-medium mb-4"
      >
        Hang tight — we’re signing you in!
      </motion.div>

      <motion.div
        className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
    </div>
  )
}
