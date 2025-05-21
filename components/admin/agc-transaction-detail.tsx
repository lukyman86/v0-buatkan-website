"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, CheckCircle, Copy, ExternalLink, XCircle } from "lucide-react"
import type { AgcTransaction } from "@/types/agc-transaction"
import { formatCurrency } from "@/lib/utils"

// Konstanta untuk perhitungan
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100

interface AgcTransactionDetailProps {
  transaction: AgcTransaction
  onApprove: (id: string, notes: string) => void
  onReject: (id: string, notes: string) => void
}

export function AgcTransactionDetail({ transaction, onApprove, onReject }: AgcTransactionDetailProps) {
  const [adminNotes, setAdminNotes] = useState("")
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

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

  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Disalin ke clipboard!")
  }

  // Handle approve transaction
  const handleApprove = () => {
    onApprove(transaction.id, adminNotes)
    setShowApproveDialog(false)
  }

  // Handle reject transaction
  const handleReject = () => {
    onReject(transaction.id, adminNotes)
    setShowRejectDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/agc-transactions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {transaction.status === "pending" && (
            <>
              <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <AlertDialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Setujui
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Setujui Transaksi</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda yakin ingin menyetujui transaksi ini? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Catatan admin (opsional)"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="my-4"
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                      Setujui
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Tolak
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tolak Transaksi</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda yakin ingin menolak transaksi ini? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Catatan admin (wajib)"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="my-4"
                    required
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReject}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!adminNotes.trim()}
                    >
                      Tolak
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detail Transaksi AGC</CardTitle>
              <CardDescription>ID: {transaction.id}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getTypeBadge(transaction.type)}
              {getStatusBadge(transaction.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Informasi Transaksi</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Tipe:</dt>
                    <dd className="text-sm">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Tanggal Dibuat:</dt>
                    <dd className="text-sm">
                      {transaction.createdAt.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Tanggal Diperbarui:</dt>
                    <dd className="text-sm">
                      {transaction.updatedAt.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Status:</dt>
                    <dd className="text-sm">{getStatusBadge(transaction.status)}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Informasi Jumlah</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Jumlah:</dt>
                    <dd className="text-sm font-bold">{transaction.amount.toFixed(8)} AGC</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Nilai (IDR):</dt>
                    <dd className="text-sm">{formatCurrency(transaction.amount * AGC_TO_IDR, "IDR")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Biaya (0.9%):</dt>
                    <dd className="text-sm">{transaction.fee.toFixed(8)} AGC</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Biaya Jaringan:</dt>
                    <dd className="text-sm">{transaction.networkFee.toFixed(8)} AGC</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Total Biaya:</dt>
                    <dd className="text-sm">{(transaction.fee + transaction.networkFee).toFixed(8)} AGC</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Jumlah Bersih:</dt>
                    <dd className="text-sm font-bold">
                      {(transaction.amount - transaction.fee - transaction.networkFee).toFixed(8)} AGC
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Informasi Pengirim & Penerima</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Pengirim:</dt>
                    <dd className="text-sm">{transaction.senderUsername || transaction.senderId}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">ID Pengirim:</dt>
                    <dd className="text-sm flex items-center">
                      {transaction.senderId}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={() => handleCopy(transaction.senderId)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Penerima:</dt>
                    <dd className="text-sm">{transaction.receiverUsername || transaction.receiverId}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">ID Penerima:</dt>
                    <dd className="text-sm flex items-center">
                      {transaction.receiverId}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={() => handleCopy(transaction.receiverId || "")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Informasi Blockchain</h3>
                <Separator className="my-2" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Hash Transaksi:</dt>
                    <dd className="text-sm flex items-center">
                      {transaction.txHash ? (
                        <>
                          <span className="truncate max-w-[150px]">{transaction.txHash}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => handleCopy(transaction.txHash || "")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              window.open(`https://explorer.example.com/tx/${transaction.txHash}`, "_blank")
                            }
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        "Tidak tersedia"
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Catatan</h3>
                <Separator className="my-2" />
                <p className="text-sm whitespace-pre-line">
                  {transaction.notes || "Tidak ada catatan untuk transaksi ini."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Diperbarui terakhir:{" "}
            {transaction.updatedAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
