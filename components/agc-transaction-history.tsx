"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react"
import type { AgcTransaction } from "@/types/agc-transaction"
import { formatCurrency } from "@/lib/utils"

// Dummy data untuk riwayat transaksi
const DUMMY_TRANSACTIONS: AgcTransaction[] = [
  {
    id: "tx_1",
    type: "deposit",
    senderId: "exchange",
    receiverId: "user_1",
    amount: 10,
    fee: 0,
    networkFee: 0,
    status: "completed",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
  },
  {
    id: "tx_2",
    type: "withdraw",
    senderId: "user_1",
    receiverId: "exchange",
    amount: 5,
    fee: 0.045, // 0.9% of 5
    networkFee: 0.00025, // 0.00005 * 5
    status: "pending",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tx_3",
    type: "transfer",
    senderId: "user_1",
    senderUsername: "ahmad_fauzi",
    receiverId: "user_2",
    receiverUsername: "budi_santoso",
    amount: 2,
    fee: 0.018, // 0.9% of 2
    networkFee: 0.0001, // 0.00005 * 2
    status: "completed",
    txHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
  },
  {
    id: "tx_4",
    type: "transfer",
    senderId: "user_3",
    senderUsername: "siti_nurhaliza",
    receiverId: "user_1",
    receiverUsername: "ahmad_fauzi",
    amount: 1.5,
    fee: 0.0135, // 0.9% of 1.5
    networkFee: 0.000075, // 0.00005 * 1.5
    status: "completed",
    txHash: "0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
    createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
  },
  {
    id: "tx_5",
    type: "withdraw",
    senderId: "user_1",
    receiverId: "exchange",
    amount: 3,
    fee: 0.027, // 0.9% of 3
    networkFee: 0.00015, // 0.00005 * 3
    status: "failed",
    notes: "Alamat tujuan tidak valid",
    txHash: "0x5432109876fedcba5432109876fedcba5432109876fedcba5432109876fedcba",
    createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
  },
]

// Konstanta untuk perhitungan
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100 (0.2 USDT * 15500 IDR/USDT)

export function AgcTransactionHistory() {
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
  const getTypeIcon = (type: AgcTransaction["type"], status: AgcTransaction["status"]) => {
    if (status === "failed" || status === "cancelled") {
      return null
    }

    switch (type) {
      case "deposit":
      case "transfer":
        if (type === "transfer" && transactions.find((tx) => tx.id === "tx_4")?.receiverId === "user_1") {
          return <ArrowDownRight className="h-4 w-4 text-green-600" />
        }
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case "withdraw":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  // Function to get transaction description
  const getTransactionDescription = (transaction: AgcTransaction) => {
    switch (transaction.type) {
      case "deposit":
        return "Deposit AGC"
      case "withdraw":
        return "Withdraw AGC"
      case "transfer":
        if (transaction.receiverId === "user_1") {
          return `Terima AGC dari ${transaction.senderUsername || transaction.senderId}`
        }
        return `Kirim AGC ke ${transaction.receiverUsername || transaction.receiverId}`
      default:
        return "Transaksi AGC"
    }
  }

  // Function to get transaction amount with sign
  const getTransactionAmount = (transaction: AgcTransaction) => {
    const isIncoming =
      transaction.type === "deposit" || (transaction.type === "transfer" && transaction.receiverId === "user_1")

    if (transaction.status === "failed" || transaction.status === "cancelled") {
      return (
        <span className="text-gray-500">
          {isIncoming ? "+" : "-"}
          {transaction.amount.toFixed(8)} AGC
        </span>
      )
    }

    return (
      <span className={isIncoming ? "text-green-600" : "text-red-600"}>
        {isIncoming ? "+" : "-"}
        {transaction.amount.toFixed(8)} AGC
      </span>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Transaksi AGC</CardTitle>
        <CardDescription>Riwayat transaksi AGC Coin Anda</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Anda belum memiliki riwayat transaksi AGC</p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/agc/deposit">Deposit AGC</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/agc/transfer">Transfer AGC</Link>
              </Button>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {transaction.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type, transaction.status) && (
                        <div
                          className={`p-1 rounded-full ${
                            transaction.type === "withdraw" ? "bg-red-100" : "bg-green-100"
                          }`}
                        >
                          {getTypeIcon(transaction.type, transaction.status)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{getTransactionDescription(transaction)}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.txHash ? `${transaction.txHash.substring(0, 10)}...` : "No hash"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getTransactionAmount(transaction)}
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
                          <Link href={`/agc/transactions/${transaction.id}`}>Lihat Detail</Link>
                        </DropdownMenuItem>
                        {transaction.status === "pending" && (
                          <DropdownMenuItem className="text-red-600">Batalkan</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
