"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, AlertCircle, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react"

// Dummy data untuk simulasi status transaksi
const transactionStats = {
  completed: 12,
  pending: 2,
  failed: 1,
  totalDeposit: 150,
  totalWithdraw: 75,
  totalTransfer: 25,
}

interface TransactionStatusCardProps {
  icon: React.ReactNode
  title: string
  value: number | string
  description: string
  variant?: "default" | "success" | "warning" | "danger"
}

function TransactionStatusCard({ icon, title, value, description, variant = "default" }: TransactionStatusCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "danger":
        return "bg-red-50 border-red-200"
      default:
        return "bg-card border-border"
    }
  }

  const getIconClasses = () => {
    switch (variant) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "danger":
        return "text-red-600"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card className={`border ${getVariantClasses()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-full p-2 ${variant === "default" ? "bg-muted" : ""}`}>
            <div className={getIconClasses()}>{icon}</div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AgcTransactionStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TransactionStatusCard
        icon={<Check className="h-5 w-5" />}
        title="Transaksi Berhasil"
        value={transactionStats.completed}
        description="Total transaksi berhasil"
        variant="success"
      />
      <TransactionStatusCard
        icon={<Clock className="h-5 w-5" />}
        title="Transaksi Menunggu"
        value={transactionStats.pending}
        description="Transaksi dalam proses"
        variant="warning"
      />
      <TransactionStatusCard
        icon={<AlertCircle className="h-5 w-5" />}
        title="Transaksi Gagal"
        value={transactionStats.failed}
        description="Transaksi yang gagal"
        variant="danger"
      />
      <TransactionStatusCard
        icon={<ArrowDownLeft className="h-5 w-5" />}
        title="Total Deposit"
        value={`${transactionStats.totalDeposit} AGC`}
        description="Total AGC yang didepositkan"
      />
      <TransactionStatusCard
        icon={<ArrowUpRight className="h-5 w-5" />}
        title="Total Withdraw"
        value={`${transactionStats.totalWithdraw} AGC`}
        description="Total AGC yang ditarik"
      />
      <TransactionStatusCard
        icon={<RefreshCw className="h-5 w-5" />}
        title="Total Transfer"
        value={`${transactionStats.totalTransfer} AGC`}
        description="Total AGC yang ditransfer"
      />
    </div>
  )
}
