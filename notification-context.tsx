"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  date: Date
  link?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Sample notifications for demonstration
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        title: "Selamat Datang!",
        message: "Selamat datang di Agri Ecosystem Fund. Mulai perjalanan investasi Anda sekarang!",
        type: "info",
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: "2",
        title: "Transaksi Berhasil",
        message: "Pembelian 25 AGC Coin berhasil dilakukan. Coin telah ditambahkan ke wallet Anda.",
        type: "success",
        read: false,
        date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        link: "/member-area",
      },
      {
        id: "3",
        title: "Member Baru Bergabung",
        message: "Ahmad Rizki telah bergabung melalui link referral Anda. Anda mendapatkan komisi 2%.",
        type: "success",
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        link: "/member-area?tab=network",
      },
      {
        id: "4",
        title: "Promo Spesial",
        message: "Dapatkan diskon 10% untuk upgrade keanggotaan Gold. Berlaku hingga akhir bulan.",
        type: "info",
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      },
      {
        id: "5",
        title: "Peringatan Saldo",
        message: "Saldo Anda kurang dari Rp 500.000. Silakan lakukan top up untuk melanjutkan trading.",
        type: "warning",
        read: true,
        date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        link: "/trading",
      },
    ]

    setNotifications(sampleNotifications)
    updateUnreadCount(sampleNotifications)
  }, [])

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((notif) => !notif.read).length
    setUnreadCount(count)
  }

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    updateUnreadCount(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notif = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    if (notif && !notif.read) {
      setUnreadCount((prev) => prev - 1)
    }
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
