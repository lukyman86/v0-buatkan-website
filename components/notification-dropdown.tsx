"use client"

import { useState } from "react"
import { Bell, Check, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications, type Notification } from "@/contexts/notification-context"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
    useNotifications()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.link) {
      setOpen(false)
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <div className="w-2 h-2 rounded-full bg-green-500" />
      case "warning":
        return <div className="w-2 h-2 rounded-full bg-yellow-500" />
      case "error":
        return <div className="w-2 h-2 rounded-full bg-red-500" />
      case "transaction":
        return <div className="w-2 h-2 rounded-full bg-blue-500" />
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />
    }
  }

  const formatTimestamp = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: id })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifikasi</span>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={markAllAsRead}
                title="Tandai semua sebagai telah dibaca"
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                <span>Tandai Dibaca</span>
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={clearAllNotifications}
                title="Hapus semua notifikasi"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                <span>Hapus Semua</span>
              </Button>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500">Tidak ada notifikasi</div>
          ) : (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex items-start p-3 ${!notification.read ? "bg-gray-50" : ""}`}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex w-full">
                    <div className="flex items-center mt-1 mr-3">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      {notification.link ? (
                        <Link
                          href={notification.link}
                          className="block"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</div>
                        </Link>
                      ) : (
                        <>
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</div>
                          <div className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</div>
                        </>
                      )}
                    </div>
                    <div className="ml-2 flex flex-col gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => markAsRead(notification.id)}
                          title="Tandai sebagai telah dibaca"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeNotification(notification.id)}
                        title="Hapus notifikasi"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/notifications">Lihat Semua Notifikasi</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
