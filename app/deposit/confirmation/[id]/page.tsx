import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Konfirmasi Deposit | AGC Platform",
  description: "Konfirmasi deposit dana ke akun Anda",
}

export default function DepositConfirmationPage({ params }: { params: { id: string } }) {
  // Dalam implementasi nyata, Anda akan mengambil data deposit dari API
  const depositData = {
    id: params.id,
    amount: 1000000,
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "PT. AGC Indonesia",
    referenceNumber: "BCA123456789",
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Konfirmasi Deposit</h1>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Deposit Berhasil Diajukan</CardTitle>
            <CardDescription>Tim kami akan memverifikasi deposit Anda dalam 1x24 jam kerja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Detail Deposit</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">ID Deposit:</p>
                  <p className="font-medium">{depositData.id}</p>

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
                  <p className="font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Menunggu Verifikasi
                    </span>
                  </p>

                  <p className="text-muted-foreground">Tanggal Pengajuan:</p>
                  <p className="font-medium">
                    {new Date(depositData.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Informasi Penting</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Deposit Anda akan diproses dalam 1x24 jam kerja</li>
                  <li>Anda akan menerima notifikasi saat deposit Anda telah diverifikasi</li>
                  <li>Jika dalam 24 jam deposit Anda belum diverifikasi, silakan hubungi customer service kami</li>
                  <li>Simpan ID deposit Anda untuk referensi di masa mendatang</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/deposit/history">Lihat Riwayat Deposit</Link>
            </Button>
            <Button asChild>
              <Link href="/member-area">Kembali ke Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AuthGuard>
  )
}
