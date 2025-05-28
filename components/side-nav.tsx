'use client'

import React, { useState } from 'react'
import {
  Menu,
  X,
  BookOpen,
  Bookmark,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  {
    name: 'Get Started',
    icon: BookOpen,
    href: '/get-started',
  },
  // {
  //   name: 'Saved Ideas',
  //   icon: Bookmark,
  //   href: '/saved',
  // },
  {
    name: 'Idea Feed',
    icon: Sparkles,
    href: '/feed',
  },
]

const bottomNavItems = [
  {
    name: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    name: 'Help',
    icon: HelpCircle,
    href: '/help',
  },
]

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => setIsOpen(!isOpen)
  const router = useRouter()

  const logout = async () => {
    // Step 1: Sign out of Supabase
    await supabase.auth.signOut()
  
    // Step 2: Clear your auth_token cookie via API
    await axios.post('/api/auth/logout')
  
    // Step 3: Redirect to login or landing page
    router.push('/auth')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm lg:hidden z-20"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 bottom-0 left-0 z-30
          w-[220px] bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          transition-transform duration-200 ease-in-out
          lg:translate-x-0 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo section */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 flex-1">
            <Image src='beachhead_logo1.svg' alt='Beachhead Logo' width={32} height={32} />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Beachhead
            </span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        {/* Bottom nav */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {/* {bottomNavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          ))} */}
          <button
            className="w-full flex items-center space-x-2 px-3 py-2 mt-2 rounded-lg text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
      {/* Toggle button for larger screens */}
      {!isOpen && (
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>
      )}
    </>
  )
}
