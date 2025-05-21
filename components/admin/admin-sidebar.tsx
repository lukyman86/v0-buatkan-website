"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  BarChart3,
  Settings,
  FileText,
  CreditCard,
  Bell,
  Globe,
  Home,
  Layers,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Pengguna",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
      submenu: [
        { title: "Semua Pengguna", href: "/admin/users" },
        { title: "Tambah Pengguna", href: "/admin/users/add" },
        { title: "Grup & Peran", href: "/admin/users/roles" },
      ],
    },
    {
      title: "Transaksi",
      href: "/admin/transactions",
      icon: <CreditCard className="h-4 w-4" />,
      submenu: [
        { title: "Semua Transaksi", href: "/admin/transactions" },
        { title: "Deposit", href: "/admin/transactions/deposits" },
        { title: "Withdrawal", href: "/admin/transactions/withdrawals" },
        { title: "Trading", href: "/admin/transactions/trading" },
        { title: "AGC Coin", href: "/admin/agc-transactions" }, // Tambahkan item ini
      ],
    },
    {
      title: "Konten",
      href: "/admin/content",
      icon: <FileText className="h-4 w-4" />,
      submenu: [
        { title: "Halaman", href: "/admin/content/pages" },
        { title: "Blog", href: "/admin/content/blog" },
        { title: "Banner", href: "/admin/content/banners" },
        { title: "FAQ", href: "/admin/content/faq" },
      ],
    },
    {
      title: "Notifikasi",
      href: "/admin/notifications",
      icon: <Bell className="h-4 w-4" />,
      submenu: [
        { title: "Kirim Notifikasi", href: "/admin/notifications/send" },
        { title: "Template", href: "/admin/notifications/templates" },
        { title: "Riwayat", href: "/admin/notifications/history" },
      ],
    },
    {
      title: "Laporan",
      href: "/admin/reports",
      icon: <BarChart3 className="h-4 w-4" />,
      submenu: [
        { title: "Laporan Keuangan", href: "/admin/reports/financial" },
        { title: "Laporan Pengguna", href: "/admin/reports/users" },
        { title: "Laporan Aktivitas", href: "/admin/reports/activities" },
      ],
    },
    {
      title: "Pengaturan",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
      submenu: [
        { title: "Umum", href: "/admin/settings/general" },
        { title: "Tampilan", href: "/admin/settings/appearance" },
        { title: "Email", href: "/admin/settings/email" },
        { title: "Pembayaran", href: "/admin/settings/payment" },
        { title: "Keamanan", href: "/admin/settings/security" },
      ],
    },
    {
      title: "Sistem",
      href: "/admin/system",
      icon: <Layers className="h-4 w-4" />,
      submenu: [
        { title: "Informasi Sistem", href: "/admin/system/info" },
        { title: "Log Sistem", href: "/admin/system/logs" },
        { title: "Backup & Restore", href: "/admin/system/backup" },
        { title: "Pembaruan", href: "/admin/system/updates" },
      ],
    },
    {
      title: "Keamanan",
      href: "/admin/security",
      icon: <ShieldAlert className="h-4 w-4" />,
      submenu: [
        { title: "Pengaturan Keamanan", href: "/admin/security/settings" },
        { title: "Log Aktivitas", href: "/admin/security/activity-logs" },
        { title: "Sesi Aktif", href: "/admin/security/sessions" },
      ],
    },
    {
      title: "Website",
      href: "/admin/website",
      icon: <Globe className="h-4 w-4" />,
      submenu: [
        { title: "SEO", href: "/admin/website/seo" },
        { title: "Media", href: "/admin/website/media" },
        { title: "Menu", href: "/admin/website/menus" },
        { title: "Widget", href: "/admin/website/widgets" },
      ],
    },
    {
      title: "Bantuan",
      href: "/admin/help",
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-gray-50">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <p className="text-xs text-gray-500">Mengelola semua aspek website</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const hasSubmenu = item.submenu && item.submenu.length > 0

            if (hasSubmenu) {
              const isSubmenuOpen = openMenus[item.title] || pathname.startsWith(`${item.href}/`)
              const activeSubmenuItem = item.submenu?.find((subitem) => pathname === subitem.href)

              return (
                <Collapsible
                  key={item.href}
                  open={isSubmenuOpen}
                  onOpenChange={() => toggleMenu(item.title)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between px-3 py-2 text-sm font-medium",
                        isActive && !activeSubmenuItem && "bg-gray-100 text-gray-900",
                        isSubmenuOpen && "bg-gray-100",
                      )}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </div>
                      {isSubmenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 pr-2">
                    {item.submenu?.map((subitem) => {
                      const isSubActive = pathname === subitem.href
                      return (
                        <Link key={subitem.href} href={subitem.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start px-3 py-1.5 text-sm font-normal",
                              isSubActive && "bg-gray-100 text-gray-900 font-medium",
                            )}
                          >
                            {subitem.title}
                          </Button>
                        </Link>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 text-sm font-medium",
                    isActive && "bg-gray-100 text-gray-900",
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Link href="/admin/logout">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
