"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useNotifications, type Notification } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function NotificationToast() {
  const { notifications, markAsRead, removeNotification } = useNotifications()
  const [toastNotification, setToastNotification] = useState<Notification | null>(null)

  useEffect(() => {
    // Cari notifikasi terbaru yang belum dibaca
    const latestUnread = notifications.find((n) => !n.read)

    if (latestUnread && !toastNotification) {
      setToastNotification(latestUnread)

      // Otomatis hilangkan toast setelah 5 detik
      const timer = setTimeout(() => {
        setToastNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notifications, toastNotification])

  const handleClose = () => {
    setToastNotification(null)
  }

  const handleMarkAsRead = () => {
    if (toastNotification) {
      markAsRead(toastNotification.id)
      setToastNotification(null)
    }
  }

  const handleRemove = () => {
    if (toastNotification) {
      removeNotification(toastNotification.id)
      setToastNotification(null)
    }
  }

  const getBackgroundColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "transaction":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <AnimatePresence>
      {toastNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`rounded-lg border p-4 shadow-md ${getBackgroundColor(toastNotification.type)}`}>
            <div className="flex justify-between items-start">
              <div className="font-medium">{toastNotification.title}</div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-1 text-sm text-gray-700">{toastNotification.message}</div>
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleMarkAsRead}>
                Tandai Dibaca
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleRemove}>
                Hapus
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
