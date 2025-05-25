'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/postHogClient'
import { usePathname, useSearchParams } from "next/navigation"
import posthog from '@/lib/postHogClient'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    posthog.capture('$pageview');
  }, [usePathname, useSearchParams]);

  useEffect(() => {
    const onBeforeUnload = () => posthog.capture('$pageleave')
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [])

  return null
}
