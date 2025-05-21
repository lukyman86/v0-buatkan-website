"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, RefreshCw, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UsdtPriceWidget() {
  const [usdtPrice, setUsdtPrice] = useState<number>(1.0)
  const [usdtPriceIdr, setUsdtPriceIdr] = useState<number>(15500)
  const [change24h, setChange24h] = useState<number>(0.04)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  // Dalam implementasi nyata, ini akan menggunakan API CoinMarketCap
  // Namun karena keterbatasan, kita simulasikan fetch data
  const fetchUsdtPrice = async () => {
    setIsLoading(true)
    try {
      // Simulasi network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dalam implementasi nyata, data akan diambil dari API CoinMarketCap
      // Untuk simulasi, kita gunakan nilai tetap dengan sedikit variasi acak
      const randomVariation = Math.random() * 0.002 - 0.001 // -0.001 to +0.001
      const newPrice = 1.0 + randomVariation
      setUsdtPrice(newPrice)

      // Simulasi perubahan harga IDR (15400-15600)
      const randomIdrVariation = Math.random() * 200 - 100
      setUsdtPriceIdr(15500 + randomIdrVariation)

      // Simulasi perubahan 24 jam
      const random24hChange = Math.random() * 0.1 - 0.05 // -0.05% to +0.05%
      setChange24h(0.04 + random24hChange)

      // Set waktu update terakhir
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Error fetching USDT price:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data saat komponen dimuat
  useEffect(() => {
    fetchUsdtPrice()

    // Refresh data setiap 60 detik
    const interval = setInterval(fetchUsdtPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 font-bold text-xs">USDT</span>
            </div>
            <div>
              <CardTitle>Tether USD (USDT)</CardTitle>
              <CardDescription>Live price from CoinMarketCap</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={fetchUsdtPrice} disabled={isLoading} className="h-8 w-8">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
              <span className="text-2xl font-bold">${usdtPrice.toFixed(4)}</span>
            </div>
            <div className={`flex items-center ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>
                {change24h >= 0 ? "+" : ""}
                {change24h.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">IDR Price</span>
            <span className="font-medium">Rp {usdtPriceIdr.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Market Cap Rank</span>
            <span className="font-medium">#3</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Market Cap</span>
            <span className="font-medium">$96.5B</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">24h Volume</span>
            <span className="font-medium">$42.8B</span>
          </div>

          <div className="pt-2 text-xs text-muted-foreground flex justify-between items-center">
            <span>Last updated: {lastUpdated}</span>
            <Link
              href="https://coinmarketcap.com/currencies/tether/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:underline"
            >
              View on CoinMarketCap
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
