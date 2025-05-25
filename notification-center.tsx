"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/contexts/notification-context"
import { NotificationToast, NotificationToastContainer } from "./notification-toast"

export function NotificationCenter() {
  const { notifications, markAsRead } = useNotifications()
  const [toasts, setToasts] = useState<string[]>([])

  // Show toast for new notifications
  useEffect(() => {
    const unreadNotifications = notifications.filter((n) => !n.read)
    if (unreadNotifications.length > 0) {
      const latestNotification = unreadNotifications[0]
      if (!toasts.includes(latestNotification.id)) {
        setToasts((prev) => [...prev, latestNotification.id])
      }
    }
  }, [notifications, toasts])

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((toastId) => toastId !== id))
    markAsRead(id)
  }

  return (
    <NotificationToastContainer>
      {toasts.map((id) => {
        const notification = notifications.find((n) => n.id === id)
        if (!notification) return null
        return (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={() => handleCloseToast(notification.id)}
          />
        )
      })}
    </NotificationToastContainer>
  )
}
