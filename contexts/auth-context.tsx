"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member" | "guest"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cek apakah user sudah login dari session storage
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        sessionStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulasi login
    setIsLoading(true)

    // Delay untuk simulasi network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy login logic
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
      }
      setUser(adminUser)
      sessionStorage.setItem("user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    } else if (email === "member@example.com" && password === "member123") {
      const memberUser: User = {
        id: "2",
        name: "Member",
        email: "member@example.com",
        role: "member",
      }
      setUser(memberUser)
      sessionStorage.setItem("user", JSON.stringify(memberUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
