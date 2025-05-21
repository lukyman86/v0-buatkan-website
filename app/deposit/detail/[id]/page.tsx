import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Detail Deposit | AGC Platform",
  description: "Detail deposit dana ke akun Anda",
}

export default function DepositDetailPage({ params }: { params: { id: string } }) {
  // Dalam implementasi nyata, Anda akan mengambil data deposit dari API
  const depositData = {
    id: params.id,
    amount: 1000000,
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "PT. AGC Indonesia",
    referenceNumber: "BCA123456789",
    proofImageUrl: "/placeholder.svg?height=400&width=600",
    status: "confirmed", // pending, confirmed, rejected
    notes: "",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
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
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Detail Deposit</h1>
          <Button variant="outline" asChild>
            <Link href="/deposit/history">Kembali ke Riwayat</Link>
          </Button>
        </div>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Deposit #{depositData.id}</CardTitle>
                <CardDescription>
                  Diajukan pada{" "}
                  {new Date(depositData.createdAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </CardDescription>
              </div>
              {getStatusBadge(depositData.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Detail Deposit</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Jumlah:</p>
                  <p className="font-medium">{formatCurrency(depositData.amount, "IDR")}</p>

                  <p className="text-muted-foreground">Bank Tujuan:</p>
                  <p className="font-medium">{depositData.bankName}</p>

                  <p className="text-muted-foreground">Nomor Rekening:</p>
                  <p className="font-medium">{depositData.accountNumber}</p>

                  <p className="text-muted-foreground">Atas Nama:</p>
                  <p className="font-medium">{depositData.accountName}</p>

                  <p className="text-muted-foreground">Nomor Referensi:</p>
                  <p className="font-medium">{depositData.referenceNumber}</p>

                  <p className="text-muted-foreground">Status:</p>
                  <p className="font-medium">{getStatusBadge(depositData.status)}</p>

                  <p className="text-muted-foreground">Tanggal Pengajuan:</p>
                  <p className="font-medium">
                    {new Date(depositData.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  {depositData.status !== "pending" && (
                    <>
                      <p className="text-muted-foreground">Tanggal Verifikasi:</p>
                      <p className="font-medium">
                        {new Date(depositData.updatedAt).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </>
                  )}

                  {depositData.notes && (
                    <>
                      <p className="text-muted-foreground">Catatan:</p>
                      <p className="font-medium">{depositData.notes}</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Bukti Transfer</h3>
                <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                  <Image
                    src={depositData.proofImageUrl || "/placeholder.svg"}
                    alt="Bukti transfer"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {depositData.status === "rejected" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h3 className="font-medium text-red-800 mb-2">Deposit Ditolak</h3>
                  <p className="text-sm text-red-700">
                    {depositData.notes ||
                      "Deposit Anda ditolak. Silakan ajukan deposit baru dengan informasi yang benar."}
                  </p>
                </div>
              )}

              {depositData.status === "confirmed" && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="font-medium text-green-800 mb-2">Deposit Berhasil</h3>
                  <p className="text-sm text-green-700">
                    Deposit Anda telah berhasil diverifikasi dan dana telah ditambahkan ke akun Anda.
                  </p>
                </div>
              )}

              {depositData.status === "pending" && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">Deposit Sedang Diproses</h3>
                  <p className="text-sm text-yellow-700">
                    Deposit Anda sedang dalam proses verifikasi. Proses ini biasanya memakan waktu 1x24 jam kerja.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/deposit/history">Kembali ke Riwayat</Link>
            </Button>
            {depositData.status === "rejected" && (
              <Button asChild>
                <Link href="/deposit">Ajukan Deposit Baru</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </AuthGuard>
  )
}
