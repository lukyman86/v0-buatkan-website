"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, BarChart3, Wallet } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Konstanta untuk perhitungan
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100

interface AgcTransactionStatsProps {
  totalTransactions: number
  pendingTransactions: number
  completedTransactions: number
  failedTransactions: number
  totalDeposit: number
  totalWithdraw: number
  totalTransfer: number
  totalFees: number
}

export function AgcTransactionStats({
  totalTransactions,
  pendingTransactions,
  completedTransactions,
  failedTransactions,
  totalDeposit,
  totalWithdraw,
  totalTransfer,
  totalFees,
}: AgcTransactionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransactions}</div>
          <div className="flex items-center pt-1">
            <div className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">{completedTransactions} Berhasil</span> |{" "}
              <span className="text-yellow-600 font-medium">{pendingTransactions} Menunggu</span> |{" "}
              <span className="text-red-600 font-medium">{failedTransactions} Gagal</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deposit</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDeposit.toFixed(8)} AGC</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(totalDeposit * AGC_TO_IDR, "IDR")}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Withdraw</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWithdraw.toFixed(8)} AGC</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(totalWithdraw * AGC_TO_IDR, "IDR")}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Biaya</CardTitle>
          <Wallet className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFees.toFixed(8)} AGC</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(totalFees * AGC_TO_IDR, "IDR")}</p>
        </CardContent>
      </Card>
    </div>
  )
}
