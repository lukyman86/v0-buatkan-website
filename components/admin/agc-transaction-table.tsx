"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { AgcTransaction } from "@/types/agc-transaction"
import { formatCurrency } from "@/lib/utils"

// Dummy data untuk transaksi AGC
const DUMMY_TRANSACTIONS: AgcTransaction[] = [
  {
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
  },
  {
    id: "tx_2",
    type: "withdraw",
    senderId: "user_3",
    senderUsername: "siti_nurhaliza",
    receiverId: "exchange",
    amount: 50,
    fee: 0.45, // 0.9% of 50
    networkFee: 0.0025, // 0.00005 * 50
    status: "pending",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    notes: "Withdraw ke exchange XYZ",
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    updatedAt: new Date(Date.now() - 7200000),
  },
  {
    id: "tx_3",
    type: "transfer",
    senderId: "user_1",
    senderUsername: "ahmad_fauzi",
    receiverId: "user_4",
    receiverUsername: "dewi_fortuna",
    amount: 25,
    fee: 0.225, // 0.9% of 25
    networkFee: 0.00125, // 0.00005 * 25
    status: "completed",
    txHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    notes: "Pembayaran jasa desain",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000 + 3600000), // 1 day ago + 1 hour
  },
  {
    id: "tx_4",
    type: "deposit",
    senderId: "user_5",
    senderUsername: "eko_prasetyo",
    receiverId: "user_5",
    receiverUsername: "eko_prasetyo",
    amount: 200,
    fee: 0,
    networkFee: 0.01,
    status: "completed",
    txHash: "0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
    notes: "Deposit dari exchange ABC",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000 + 1800000), // 2 days ago + 30 minutes
  },
  {
    id: "tx_5",
    type: "withdraw",
    senderId: "user_6",
    senderUsername: "rini_marlina",
    receiverId: "exchange",
    amount: 75,
    fee: 0.675, // 0.9% of 75
    networkFee: 0.00375, // 0.00005 * 75
    status: "failed",
    txHash: "0x5432109876fedcba5432109876fedcba5432109876fedcba5432109876fedcba",
    notes: "Alamat tujuan tidak valid",
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000 + 7200000), // 3 days ago + 2 hours
  },
  {
    id: "tx_6",
    type: "transfer",
    senderId: "user_7",
    senderUsername: "joko_widodo",
    receiverId: "user_8",
    receiverUsername: "prabowo_subianto",
    amount: 10,
    fee: 0.09, // 0.9% of 10
    networkFee: 0.0005, // 0.00005 * 10
    status: "cancelled",
    notes: "Dibatalkan oleh pengirim",
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    updatedAt: new Date(Date.now() - 345600000 + 3600000), // 4 days ago + 1 hour
  },
]

// Konstanta untuk perhitungan
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100

interface AgcTransactionTableProps {
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function AgcTransactionTable({ onApprove, onReject }: AgcTransactionTableProps) {
  const [transactions, setTransactions] = useState<AgcTransaction[]>(DUMMY_TRANSACTIONS)

  // Function to get status badge
  const getStatusBadge = (status: AgcTransaction["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Menunggu
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Berhasil
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Gagal
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Function to get transaction type badge
  const getTypeBadge = (type: AgcTransaction["type"]) => {
    switch (type) {
      case "deposit":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Deposit
          </Badge>
        )
      case "withdraw":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Withdraw
          </Badge>
        )
      case "transfer":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
            Transfer
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Handle approve transaction
  const handleApprove = (id: string) => {
    onApprove(id)
    // Update local state for UI
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "completed", updatedAt: new Date() } : tx)),
    )
  }

  // Handle reject transaction
  const handleReject = (id: string) => {
    onReject(id)
    // Update local state for UI
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "failed", updatedAt: new Date() } : tx)),
    )
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Pengirim</TableHead>
            <TableHead>Penerima</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                {transaction.createdAt.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{getTypeBadge(transaction.type)}</TableCell>
              <TableCell>{transaction.senderUsername || transaction.senderId}</TableCell>
              <TableCell>{transaction.receiverUsername || transaction.receiverId}</TableCell>
              <TableCell>
                <div>
                  <p>{transaction.amount.toFixed(8)} AGC</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(transaction.amount * AGC_TO_IDR, "IDR")}
                  </p>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/agc-transactions/${transaction.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </Link>
                    </DropdownMenuItem>
                    {transaction.status === "pending" && (
                      <>
                        <DropdownMenuItem onClick={() => handleApprove(transaction.id)}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          <span className="text-green-600">Setujui</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(transaction.id)}>
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          <span className="text-red-600">Tolak</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    {transaction.status === "completed" && (
                      <DropdownMenuItem onClick={() => handleReject(transaction.id)}>
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                        <span className="text-yellow-600">Tandai Bermasalah</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
