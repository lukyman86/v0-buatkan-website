"use client"
import { useNotifications } from "@/contexts/notification-context"
import { Bell } from "lucide-react"
import Link from "next/link"

interface NotificationBadgeProps {
  showCount?: boolean
  size?: "sm" | "md" | "lg"
  href?: string
}

export function NotificationBadge({ showCount = true, size = "md", href }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications()

  const iconSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const badgeSize = {
    sm: "h-3 w-3 text-[8px]",
    md: "h-4 w-4 text-[10px]",
    lg: "h-5 w-5 text-xs",
  }

  const badgePosition = {
    sm: "top-0 right-0",
    md: "top-1 right-1",
    lg: "top-1 right-1",
  }

  const content = (
    <div className="relative">
      <Bell className={iconSize[size]} />
      {showCount && unreadCount > 0 && (
        <span
          className={`absolute ${badgePosition[size]} flex ${badgeSize[size]} items-center justify-center rounded-full bg-red-500 font-medium text-white`}
        >
          {unreadCount}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="relative">
        {content}
      </Link>
    )
  }

  return <div className="relative">{content}</div>
}
