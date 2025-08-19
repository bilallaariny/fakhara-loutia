import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Fakhara Loutia - Artisanat Marocain",
  description: "Découvrez l'art des tajines marocains avec Fakhara Loutia",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <style>{`
html {
  font-family: ${montserrat.style.fontFamily};
  --font-sans: ${montserrat.variable};
  --font-serif: ${openSans.variable};
}
        `}</style>
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
