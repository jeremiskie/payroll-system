import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Metadata } from "next"

import "./globals.css"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "HRIS CoreLink",
  description: "CoreLink is an enterprise-grade Human Resource Information System (HRIS) designed to streamline workforce management, automate compliance, and unify employee data",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
