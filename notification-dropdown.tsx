"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Bell, Check, Info, AlertCircle, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications, type Notification } from "@/contexts/notification-context"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMarkAsRead = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    markAsRead(id)
  }

  const handleRemove = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    removeNotification(id)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationBgColor = (type: Notification["type"], read: boolean) => {
    if (read) return "bg-white"

    switch (type) {
      case "info":
        return "bg-blue-50"
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-yellow-50"
      case "error":
        return "bg-red-50"
      default:
        return "bg-blue-50"
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" className="relative" onClick={toggleDropdown}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-medium">Notifikasi</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                <Check className="h-3 w-3 mr-1" />
                Tandai Semua Dibaca
              </Button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b ${getNotificationBgColor(
                    notification.type,
                    notification.read,
                  )} hover:bg-gray-50 transition-colors relative`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      {notification.link ? (
                        <Link href={notification.link} onClick={() => markAsRead(notification.id)}>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                        </Link>
                      ) : (
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                      )}
                      <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(notification.date), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.read && (
                        <button
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                          title="Tandai sudah dibaca"
                        >
                          <Check className="h-3 w-3 text-gray-500" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleRemove(notification.id, e)}
                        className="p-1 hover:bg-gray-200 rounded-full"
                        title="Hapus notifikasi"
                      >
                        <X className="h-3 w-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 text-sm">Tidak ada notifikasi</p>
              </div>
            )}
          </div>
          <div className="p-2 border-t text-center">
            <Button variant="link" size="sm" className="text-xs text-gray-500">
              Lihat Semua Notifikasi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
