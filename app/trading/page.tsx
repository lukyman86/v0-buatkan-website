"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Trading from "@/templates/trading"

export default function TradingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    // Redirect jika user bukan admin atau member
    if (!isLoading && !user) {
      router.push("/login?redirect=/trading")
    }
  }, [isLoading, user, router])

  // Tampilkan loading atau halaman login jika belum login
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return null // Akan di-redirect ke halaman login
  }

  return <Trading />
}
