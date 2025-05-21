"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AgcTransactionDetail } from "@/components/admin/agc-transaction-detail"
import type { AgcTransaction } from "@/types/agc-transaction"

// Dummy data untuk transaksi AGC
const DUMMY_TRANSACTION: AgcTransaction = {
  id: "tx_1",
  type: "deposit",
  senderId: "user_2",
  senderUsername: "budi_santoso",
  receiverId: "user_2",
  receiverUsername: "budi_santoso",
  amount: 100,
  fee: 0,
  networkFee: 0.005,
  status: "pending",
  txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  notes: "Deposit dari exchange XYZ",
  createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  updatedAt: new Date(Date.now() - 3600000),
}

export default function AgcTransactionDetailPage() {
  const params = useParams()
  const [transaction, setTransaction] = useState<AgcTransaction | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setTransaction(DUMMY_TRANSACTION)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  // Handle approve transaction
  const handleApprove = (id: string, notes: string) => {
    console.log("Approve transaction:", id, "Notes:", notes)
    // Implementasi nyata: panggil API untuk menyetujui transaksi
    setTransaction((prev) => {
      if (!prev) return null
      return {
        ...prev,
        status: "completed",
        updatedAt: new Date(),
        notes: notes ? `${prev.notes}\n\nAdmin: ${notes}` : prev.notes,
      }
    })
  }

  // Handle reject transaction
  const handleReject = (id: string, notes: string) => {
    console.log("Reject transaction:", id, "Notes:", notes)
    // Implementasi nyata: panggil API untuk menolak transaksi
    setTransaction((prev) => {
      if (!prev) return null
      return {
        ...prev,
        status: "failed",
        updatedAt: new Date(),
        notes: `${prev.notes}\n\nAdmin: ${notes}`,
      }
    })
  }

  if (isLoading) {
    return (
      <AdminLayout title="Detail Transaksi AGC">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!transaction) {
    return (
      <AdminLayout title="Detail Transaksi AGC">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Transaksi Tidak Ditemukan</h2>
          <p className="text-muted-foreground">Transaksi dengan ID {params.id} tidak ditemukan atau telah dihapus.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Transaksi AGC - ${transaction.id}`}>
      <AgcTransactionDetail transaction={transaction} onApprove={handleApprove} onReject={handleReject} />
    </AdminLayout>
  )
}
