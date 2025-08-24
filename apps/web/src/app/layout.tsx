import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Health Vault",
  description: "A secure platform for managing your health information",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
