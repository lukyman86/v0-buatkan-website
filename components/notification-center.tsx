"use client"

import { useState } from "react"
import { useNotifications, type NotificationType } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, Filter, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"

export function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications()

  const [filter, setFilter] = useState<NotificationType | "all">("all")

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((notification) => notification.type === filter)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const formatTimestamp = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: id })
  }

  const getNotificationTypeLabel = (type: NotificationType) => {
    switch (type) {
      case "info":
        return "Informasi"
      case "success":
        return "Sukses"
      case "warning":
        return "Peringatan"
      case "error":
        return "Error"
      case "transaction":
        return "Transaksi"
    }
  }

  const getNotificationTypeColor = (type: NotificationType) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "transaction":
        return "bg-purple-100 text-purple-800"
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/member-area">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Kembali
              </Link>
            </Button>
            <CardTitle>Notifikasi</CardTitle>
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                {unreadCount} baru
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Tandai Semua Dibaca
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                <Trash2 className="h-4 w-4 mr-1" />
                Hapus Semua
              </Button>
            )}
          </div>
        </div>
        <CardDescription>Kelola semua notifikasi Anda di satu tempat</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                Semua
              </TabsTrigger>
              <TabsTrigger value="unread" onClick={() => setFilter("all")}>
                Belum Dibaca
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Tidak ada notifikasi</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg border p-4 ${!notification.read ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getNotificationTypeColor(notification.type)}`}
                          >
                            {getNotificationTypeLabel(notification.type)}
                          </span>
                          <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                        </div>
                        <h3 className="font-medium mt-1">{notification.title}</h3>
                        <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                        {notification.link && (
                          <div className="mt-2">
                            <Link
                              href={notification.link}
                              className="text-sm text-green-600 hover:underline"
                              onClick={() => !notification.read && markAsRead(notification.id)}
                            >
                              Lihat Detail
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 ml-4">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Dibaca</span>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Hapus</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Tidak ada notifikasi yang belum dibaca</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div key={notification.id} className="rounded-lg border p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${getNotificationTypeColor(notification.type)}`}
                            >
                              {getNotificationTypeLabel(notification.type)}
                            </span>
                            <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          <h3 className="font-medium mt-1">{notification.title}</h3>
                          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                          {notification.link && (
                            <div className="mt-2">
                              <Link
                                href={notification.link}
                                className="text-sm text-green-600 hover:underline"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Dibaca</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Hapus</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
