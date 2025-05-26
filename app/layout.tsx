import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import PostHogProvider from "@/hooks/PostHogProvider"
const inter = Inter({ subsets: ["latin"] })
import { requireAuth } from "@/lib/authGuard"

export const metadata: Metadata = {
  title: "Beachhead",
  description: "Generate unique SaaS ideas and angles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  requireAuth() // This will redirect to login if the user is not authenticated
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider />
        <Header />
        <main className="container mx-auto px-4 py-4 max-w-7xl">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
