import { requireAuth } from '@/lib/authGuard'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  requireAuth()

  return (
    <>
      {children}
    </>
  )
}
