import Header from '@/components/header'
import { requireAuth } from '@/lib/authGuard'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  requireAuth()

  return (
    <>
      <Header />
      {children}
    </>
  )
}
