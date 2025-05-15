"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/">SaaS Twist</Link>
          </div>

          <div className="flex space-x-4">
            <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")}`}>
              Ideas
            </Link>
            <Link href="/filters" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/filters")}`}>
              Filters
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
