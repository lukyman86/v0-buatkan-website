"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayout({ children, title = "Dashboard" }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Cek apakah admin sudah login
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true"
    // Jika belum login dan bukan di halaman login, redirect ke halaman login
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [router, pathname])

  // Jika di halaman login, tampilkan hanya konten tanpa layout admin
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-50 lg:block">
        <AdminSidebar />
      </div>
      <div className="flex flex-col">
        <AdminHeader title={title} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <footer className="border-t py-4 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Agri Ecosystem Fund. Hak Cipta Dilindungi.
            </p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-0">Admin Panel v1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
