"use client"

import { useEffect, useState } from "react"
import { SwapForm } from "@/components/swap-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function SwapPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [usdtPrice, setUsdtPrice] = useState(15500)

  useEffect(() => {
    // Redirect jika user bukan admin atau member
    if (!isLoading && !user) {
      router.push("/login?redirect=/swap")
    }

    // Simulasi fetch harga USDT
    const fetchUsdtPrice = async () => {
      try {
        // Simulasi delay network
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Simulasi harga USDT yang berfluktuasi sedikit
        const randomVariation = Math.random() * 200 - 100 // -100 to +100
        setUsdtPrice(15500 + randomVariation)
      } catch (error) {
        console.error("Error fetching USDT price:", error)
      }
    }

    fetchUsdtPrice()
    // Refresh harga setiap 60 detik
    const interval = setInterval(fetchUsdtPrice, 60000)
    return () => clearInterval(interval)
  }, [isLoading, user, router])

  // Tampilkan loading atau halaman login jika belum login
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return null // Akan di-redirect ke halaman login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Swap AGC/IDR</h1>
      <p className="mb-6 text-muted-foreground">Tukar AGC Coin dengan IDR atau sebaliknya dengan mudah dan cepat</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <SwapForm usdtPrice={usdtPrice} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Swap</CardTitle>
              <CardDescription>Penting untuk diketahui sebelum melakukan swap</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Minimal Swap</AlertTitle>
                <AlertDescription>
                  Minimal swap adalah 1 AGC Coin. Transaksi di bawah jumlah ini tidak akan diproses.
                </AlertDescription>
              </Alert>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Biaya Transaksi</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Biaya admin: 0.9% dari nilai transaksi</li>
                    <li>Biaya jaringan: 0.00005 per AGC</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Perhatian</AlertTitle>
                <AlertDescription>
                  Pastikan alamat tujuan dan jumlah swap sudah benar sebelum melakukan transaksi. Transaksi yang sudah
                  diproses tidak dapat dibatalkan.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Swap</CardTitle>
              <CardDescription>Transaksi swap terakhir Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Belum ada riwayat transaksi swap</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
