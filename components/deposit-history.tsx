"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { DepositRequest } from "@/types/deposit"
import { formatCurrency } from "@/lib/utils"

// Dummy data untuk riwayat deposit
const DUMMY_DEPOSITS: DepositRequest[] = [
  {
    id: "dep_1",
    userId: "user_1",
    amount: 1000000,
    bankId: "bca",
    referenceNumber: "BCA123456789",
    proofImageUrl: "/placeholder.svg?height=200&width=400",
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
  },
  {
    id: "dep_2",
    userId: "user_1",
    amount: 500000,
    bankId: "bni",
    referenceNumber: "BNI987654321",
    proofImageUrl: "/placeholder.svg?height=200&width=400",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dep_3",
    userId: "user_1",
    amount: 250000,
    bankId: "mandiri",
    referenceNumber: "MDR123456789",
    proofImageUrl: "/placeholder.svg?height=200&width=400",
    status: "rejected",
    notes: "Bukti transfer tidak jelas. Silakan ajukan kembali dengan bukti yang lebih jelas.",
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
  },
]

// Map bank ID to bank name
const BANK_NAMES: Record<string, string> = {
  bca: "Bank Central Asia (BCA)",
  bni: "Bank Negara Indonesia (BNI)",
  mandiri: "Bank Mandiri",
  bri: "Bank Rakyat Indonesia (BRI)",
}

export function DepositHistory() {
  const [deposits, setDeposits] = useState<DepositRequest[]>(DUMMY_DEPOSITS)

  // Function to get status badge
  const getStatusBadge = (status: DepositRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Menunggu Verifikasi
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Berhasil
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Deposit</CardTitle>
        <CardDescription>Riwayat deposit dana ke akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        {deposits.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Anda belum memiliki riwayat deposit</p>
            <Button asChild>
              <Link href="/deposit">Ajukan Deposit</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.id}</TableCell>
                  <TableCell>
                    {deposit.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{BANK_NAMES[deposit.bankId] || deposit.bankId}</TableCell>
                  <TableCell>{formatCurrency(deposit.amount, "IDR")}</TableCell>
                  <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/deposit/detail/${deposit.id}`}>Detail</Link>
                    </Button>
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
