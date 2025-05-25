"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X, Info, AlertCircle, CheckCircle } from "lucide-react"
import type { Notification } from "@/contexts/notification-context"

interface NotificationToastProps {
  notification: Notification
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export function NotificationToast({
  notification,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (autoClose) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval)
            setIsVisible(false)
            setTimeout(() => onClose(), 300) // Allow animation to complete
            return 0
          }
          return prev - 100 / (autoCloseTime / 100)
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [autoClose, autoCloseTime, onClose])

  const getIcon = () => {
    switch (notification.type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case "info":
        return "bg-blue-50 border-blue-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div
      className={`${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } transform transition-all duration-300 ease-in-out max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border-l-4 ${getBgColor()}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
            <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose(), 300)
              }}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {autoClose && (
        <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

interface NotificationToastContainerProps {
  children: React.ReactNode
}

export function NotificationToastContainer({ children }: NotificationToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 pointer-events-none">
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}
