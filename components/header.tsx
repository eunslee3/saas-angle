"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/">Beachhead</Link>
          </div>

          <div>
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Bookmark className="h-5 w-5" />
              <span>Saved</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
