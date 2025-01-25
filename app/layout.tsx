"use client"

import { SessionProvider } from "next-auth/react"
import "@/app/styles/global.css"
import Footer from "@/app/components/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  )
}