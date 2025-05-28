import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Image src='beachhead_logo1.svg' alt='Beachhead Logo' width={32} height={32} />
            <span onClick={() => router.push('/')} className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white">
              Beachhead
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/auth')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02]"
            >
              Try it free →
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
