"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useNotifications } from "@/contexts/notification-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"

// Dummy data untuk simulasi transaksi yang memerlukan perhatian
const pendingTransactions = [
  {
    id: "tx_123456",
    type: "deposit",
    amount: 5,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "tx_789012",
    type: "withdraw",
    amount: 10,
    status: "pending",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
]

export function AgcTransactionNotifications() {
  const { addNotification } = useNotifications()

  // Efek untuk menambahkan notifikasi saat komponen dimuat
  // Dalam implementasi nyata, ini akan diganti dengan pemeriksaan API
  useEffect(() => {
    // Simulasi notifikasi untuk transaksi yang memerlukan perhatian
    pendingTransactions.forEach((tx) => {
      const typeText = tx.type === "deposit" ? "Deposit" : "Withdraw"

      addNotification({
        title: `${typeText} AGC Menunggu Verifikasi`,
        message: `${typeText} ${tx.amount} AGC Anda sedang menunggu verifikasi`,
        type: "transaction",
        link: `/agc/transactions/${tx.id}`,
        image: "/placeholder.svg?height=40&width=40",
      })
    })

    // Simulasi notifikasi untuk transaksi yang berhasil
    addNotification({
      title: "Transfer AGC Berhasil",
      message: "2.5 AGC telah berhasil dikirim ke ahmad_fauzi",
      type: "success",
      link: "/agc/transactions/tx_345678",
      image: "/placeholder.svg?height=40&width=40",
    })

    // Simulasi notifikasi untuk transaksi yang gagal
    addNotification({
      title: "Withdraw AGC Gagal",
      message: "Withdraw 15 AGC gagal. Silakan periksa detail transaksi.",
      type: "error",
      link: "/agc/transactions/tx_901234",
      image: "/placeholder.svg?height=40&width=40",
    })

    // Simulasi notifikasi untuk perubahan harga AGC
    addNotification({
      title: "Harga AGC Naik",
      message: "Harga AGC naik 5% dalam 24 jam terakhir",
      type: "info",
      link: "/agc/price",
      image: "/placeholder.svg?height=40&width=40",
    })
  }, [addNotification])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifikasi Transaksi AGC</CardTitle>
        <CardDescription>Transaksi terbaru yang memerlukan perhatian Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTransactions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Tidak ada transaksi yang memerlukan perhatian</p>
            </div>
          ) : (
            pendingTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-yellow-100 p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {tx.type === "deposit" ? "Deposit" : "Withdraw"} {tx.amount} AGC
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Menunggu
                  </Badge>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/agc/transactions/${tx.id}`}>
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Lihat detail</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/agc/transactions">Lihat Semua Transaksi</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
