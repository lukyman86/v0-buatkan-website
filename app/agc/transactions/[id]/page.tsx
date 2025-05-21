import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Detail Transaksi AGC | AGC Platform",
  description: "Detail transaksi AGC Coin",
}

export default function AgcTransactionDetailPage({ params }: { params: { id: string } }) {
  // Dalam implementasi nyata, Anda akan mengambil data transaksi dari API
  const transactionData = {
    id: params.id,
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
    notes: "Pembayaran untuk pembelian barang",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  }

  // Konstanta untuk perhitungan
  const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100 (0.2 USDT * 15500 IDR/USDT)

  // Function to get status badge
  const getStatusBadge = (status: string) => {
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

  // Function to get transaction type text
  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case "deposit":
        return "Deposit AGC"
      case "withdraw":
        return "Withdraw AGC"
      case "transfer":
        return "Transfer AGC"
      default:
        return "Transaksi AGC"
    }
  }

  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Detail Transaksi</h1>
          <Button variant="outline" asChild>
            <Link href="/agc/transactions">Kembali ke Riwayat</Link>
          </Button>
        </div>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{getTransactionTypeText(transactionData.type)}</CardTitle>
                <CardDescription>
                  Transaksi pada{" "}
                  {new Date(transactionData.createdAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </CardDescription>
              </div>
              {getStatusBadge(transactionData.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Detail Transaksi</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">ID Transaksi:</p>
                  <p className="font-medium">{transactionData.id}</p>

                  <p className="text-muted-foreground">Jenis Transaksi:</p>
                  <p className="font-medium">{getTransactionTypeText(transactionData.type)}</p>

                  <p className="text-muted-foreground">Jumlah:</p>
                  <p className="font-medium">
                    {transactionData.amount.toFixed(8)} AGC (
                    {formatCurrency(transactionData.amount * AGC_TO_IDR, "IDR")})
                  </p>

                  <p className="text-muted-foreground">Biaya Transfer (0.9%):</p>
                  <p className="font-medium">
                    {transactionData.fee.toFixed(8)} AGC ({formatCurrency(transactionData.fee * AGC_TO_IDR, "IDR")})
                  </p>

                  <p className="text-muted-foreground">Biaya Jaringan:</p>
                  <p className="font-medium">
                    {transactionData.networkFee.toFixed(8)} AGC (
                    {formatCurrency(transactionData.networkFee * AGC_TO_IDR, "IDR")})
                  </p>

                  <p className="text-muted-foreground">Total Biaya:</p>
                  <p className="font-medium">
                    {(transactionData.fee + transactionData.networkFee).toFixed(8)} AGC (
                    {formatCurrency((transactionData.fee + transactionData.networkFee) * AGC_TO_IDR, "IDR")})
                  </p>

                  <p className="text-muted-foreground">Jumlah Diterima:</p>
                  <p className="font-medium">
                    {(transactionData.amount - transactionData.fee - transactionData.networkFee).toFixed(8)} AGC (
                    {formatCurrency(
                      (transactionData.amount - transactionData.fee - transactionData.networkFee) * AGC_TO_IDR,
                      "IDR",
                    )}
                    )
                  </p>

                  <p className="text-muted-foreground">Pengirim:</p>
                  <p className="font-medium">
                    {transactionData.senderUsername} ({transactionData.senderId})
                  </p>

                  <p className="text-muted-foreground">Penerima:</p>
                  <p className="font-medium">
                    {transactionData.receiverUsername} ({transactionData.receiverId})
                  </p>

                  <p className="text-muted-foreground">Hash Transaksi:</p>
                  <p className="font-medium break-all">{transactionData.txHash}</p>

                  <p className="text-muted-foreground">Status:</p>
                  <p className="font-medium">{getStatusBadge(transactionData.status)}</p>

                  <p className="text-muted-foreground">Tanggal Transaksi:</p>
                  <p className="font-medium">
                    {new Date(transactionData.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  {transactionData.notes && (
                    <>
                      <p className="text-muted-foreground">Catatan:</p>
                      <p className="font-medium">{transactionData.notes}</p>
                    </>
                  )}
                </div>
              </div>

              {transactionData.status === "failed" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h3 className="font-medium text-red-800 mb-2">Transaksi Gagal</h3>
                  <p className="text-sm text-red-700">
                    {transactionData.notes ||
                      "Transaksi gagal diproses. Silakan hubungi customer service untuk informasi lebih lanjut."}
                  </p>
                </div>
              )}

              {transactionData.status === "completed" && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="font-medium text-green-800 mb-2">Transaksi Berhasil</h3>
                  <p className="text-sm text-green-700">
                    Transaksi telah berhasil diproses dan AGC telah dikirim ke alamat tujuan.
                  </p>
                </div>
              )}

              {transactionData.status === "pending" && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">Transaksi Sedang Diproses</h3>
                  <p className="text-sm text-yellow-700">
                    Transaksi Anda sedang dalam proses. Proses ini biasanya memakan waktu 1-24 jam kerja.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/agc/transactions">Kembali ke Riwayat</Link>
            </Button>
            {transactionData.status === "pending" && <Button variant="destructive">Batalkan Transaksi</Button>}
          </CardFooter>
        </Card>
      </div>
    </AuthGuard>
  )
}
