"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Check, AlertCircle, X, Clock } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"

interface TransactionAlertProps {
  transactionId?: string
  type?: "deposit" | "withdraw" | "transfer"
  status?: "success" | "error" | "pending"
  message?: string
  autoClose?: boolean
  autoCloseTime?: number
}

export function AgcTransactionAlert({
  transactionId,
  type = "transfer",
  status = "success",
  message,
  autoClose = true,
  autoCloseTime = 5000,
}: TransactionAlertProps) {
  const [visible, setVisible] = useState(true)
  const router = useRouter()
  const { addNotification } = useNotifications()

  // Auto close alert after specified time
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, autoCloseTime)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, visible])

  // Handle close
  const handleClose = () => {
    setVisible(false)
  }

  // Handle view details
  const handleViewDetails = () => {
    if (transactionId) {
      router.push(`/agc/transactions/${transactionId}`)
    }
  }

  // Get alert variant and icon based on status
  const getAlertProps = () => {
    switch (status) {
      case "success":
        return {
          variant: "default" as const,
          icon: <Check className="h-4 w-4" />,
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800",
        }
      case "error":
        return {
          variant: "destructive" as const,
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-800",
        }
      case "pending":
        return {
          variant: "default" as const,
          icon: <Clock className="h-4 w-4" />,
          bgColor: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800",
        }
      default:
        return {
          variant: "default" as const,
          icon: <Check className="h-4 w-4" />,
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800",
        }
    }
  }

  // Get default message based on type and status
  const getDefaultMessage = () => {
    if (status === "success") {
      if (type === "deposit") return "Deposit AGC berhasil dikonfirmasi"
      if (type === "withdraw") return "Withdraw AGC berhasil diproses"
      return "Transfer AGC berhasil dilakukan"
    } else if (status === "error") {
      if (type === "deposit") return "Deposit AGC gagal diproses"
      if (type === "withdraw") return "Withdraw AGC gagal diproses"
      return "Transfer AGC gagal dilakukan"
    } else {
      if (type === "deposit") return "Deposit AGC sedang diproses"
      if (type === "withdraw") return "Withdraw AGC sedang diproses"
      return "Transfer AGC sedang diproses"
    }
  }

  const { variant, icon, bgColor, textColor } = getAlertProps()
  const alertMessage = message || getDefaultMessage()

  if (!visible) return null

  return (
    <Alert variant={variant} className={`mb-4 ${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          {icon}
          <div>
            <AlertTitle className={textColor}>
              {status === "success" ? "Berhasil" : status === "error" ? "Gagal" : "Sedang Diproses"}
            </AlertTitle>
            <AlertDescription className={textColor}>{alertMessage}</AlertDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {transactionId && (
            <Button variant="outline" size="sm" onClick={handleViewDetails} className="text-xs">
              Lihat Detail
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  )
}
