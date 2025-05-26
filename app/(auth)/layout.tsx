import SideNav from '@/components/side-nav'
import { requireAuth } from '@/lib/authGuard'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  requireAuth()

  return (
    <>
    <SideNav />
    <main className="container mx-auto px-4 py-4 max-w-7xl">
      {children}
    </main>
    </>
  )
}
