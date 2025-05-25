'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/posthogClient'

export default function PostHogProvider() {
  useEffect(() => {
    initPostHog()
  }, [])

  return null
}
