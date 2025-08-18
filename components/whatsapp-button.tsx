"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/212691832300" // WhatsApp link with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#202827] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8 group-hover:animate-pulse" />
      <span className="sr-only">Chat on WhatsApp</span>
    </Link>
  )
}
