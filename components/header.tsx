"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark } from "lucide-react"

export default function Header() {
  const pathname = usePathname()

  return (
    <nav className="border-b w-full">
      <div className="px-4">
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
    </nav>
  )
}
