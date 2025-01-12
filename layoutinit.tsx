import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthConnect",
  description: "Healthcare Management Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav>{children}</MainNav>
      </body>
    </html>
  )
}

