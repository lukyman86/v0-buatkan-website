"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AuthGuardProps {
  children: ReactNode
  redirectTo?: string
  allowedRoles?: Array<"admin" | "member" | "guest">
}

export function AuthGuard({ children, redirectTo = "/login", allowedRoles = ["admin", "member"] }: AuthGuardProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(`${redirectTo}?redirect=${window.location.pathname}`)
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
      }
    }
  }, [isLoading, user, router, redirectTo, allowedRoles])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return null
  }

  return <>{children}</>
}
