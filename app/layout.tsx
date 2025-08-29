import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModeProvider } from "@/contexts/mode-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agnisethu 🔥 - India's Firewall of Trust",
  description:
    "A futuristic Indian solution against digital scams using AI, behavioral biometrics, graph networks, and blockchain.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModeProvider>{children}</ModeProvider>
        <Toaster />
      </body>
    </html>
  )
}
