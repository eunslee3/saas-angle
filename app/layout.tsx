import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/side-nav"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import PostHogProvider from "@/hooks/PostHogProvider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beachhead",
  description: "Generate unique SaaS ideas and angles",
  generator: 'v0.dev',
  icons: {
    icon: '/beachhead_logo1.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
