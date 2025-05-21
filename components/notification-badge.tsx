"use client"
import { Bell } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotificationBadgeProps {
  showCount?: boolean
  showIcon?: boolean
  className?: string
}

export function NotificationBadge({ showCount = true, showIcon = true, className = "" }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications()

  if (unreadCount === 0 && !showIcon) {
    return null
  }

  return (
    <Button asChild variant="ghost" size="sm" className={className}>
      <Link href="/notifications" className="relative">
        {showIcon && <Bell className="h-5 w-5" />}
        {showCount && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
        {!showIcon && unreadCount > 0 && <span className="text-xs">{unreadCount} notifikasi baru</span>}
      </Link>
    </Button>
  )
}
