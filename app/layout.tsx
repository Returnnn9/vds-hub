import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { DataProvider } from "@/contexts/data-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "VDS_HUB - Premium Virtual Server Hosting",
  description: "Professional VDS/VPS hosting with flexible configurations and competitive pricing",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <DataProvider>
            {children}
            <Toaster />
          </DataProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
