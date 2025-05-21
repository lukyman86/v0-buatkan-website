"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"

// Konstanta untuk harga
const AGC_TO_USDT = 0.2 // 1 AGC = 0.2 USDT
const USDT_TO_IDR_DEFAULT = 15500 // Default value, akan diupdate dari "API"

// Simulasi data chart
const generateChartData = (basePrice: number, days = 30) => {
  const data = []
  let price = basePrice

  for (let i = 0; i < days; i++) {
    // Simulasi fluktuasi harga dengan random walk
    const change = price * (Math.random() * 0.06 - 0.03)
    price += change

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      price: price,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })
  }

  return data
}

type ChartDataPoint = {
  date: string
  price: number
  volume: number
}

export function PriceChart() {
  const [chartType, setChartType] = useState<"AGC/USDT" | "AGC/IDR">("AGC/USDT")
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M")
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0, isPositive: true })
  const [usdtPrice, setUsdtPrice] = useState(USDT_TO_IDR_DEFAULT)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulasi fetch harga USDT dari API CoinMarketCap
  useEffect(() => {
    const fetchUsdtPrice = async () => {
      try {
        // Simulasi delay network
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dalam implementasi nyata, ini akan menggunakan API CoinMarketCap
        // Untuk simulasi, kita gunakan nilai tetap dengan sedikit variasi acak
        const randomVariation = Math.random() * 200 - 100 // -100 to +100
        const newPrice = USDT_TO_IDR_DEFAULT + randomVariation
        setUsdtPrice(newPrice)
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (error) {
        console.error("Error fetching USDT price:", error)
      }
    }

    fetchUsdtPrice()
    // Refresh harga setiap 60 detik
    const interval = setInterval(fetchUsdtPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fungsi untuk menggambar chart
  const drawChart = (data: ChartDataPoint[], canvas: HTMLCanvasElement, currency: "USDT" | "IDR") => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = { top: 20, right: 20, bottom: 30, left: 60 }

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Jika tidak ada data, tampilkan pesan
    if (data.length === 0) {
      ctx.font = "14px Arial"
      ctx.fillStyle = "#666"
      ctx.textAlign = "center"
      ctx.fillText("No data available", width / 2, height / 2)
      return
    }

    // Tentukan min dan max untuk skala
    const prices = data.map((d) => d.price)
    const minPrice = Math.min(...prices) * 0.95
    const maxPrice = Math.max(...prices) * 1.05

    // Fungsi untuk konversi data ke koordinat
    const xScale = (i: number) => padding.left + (i * (width - padding.left - padding.right)) / (data.length - 1)
    const yScale = (price: number) =>
      height - padding.bottom - ((price - minPrice) * (height - padding.top - padding.bottom)) / (maxPrice - minPrice)

    // Gambar grid
    ctx.strokeStyle = "#eee"
    ctx.lineWidth = 0.5

    // Grid horizontal
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i * (height - padding.top - padding.bottom)) / 5
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // Label harga
      const price = maxPrice - (i * (maxPrice - minPrice)) / 5
      ctx.fillStyle = "#666"
      ctx.font = "10px Arial"
      ctx.textAlign = "right"
      ctx.fillText(
        currency === "USDT"
          ? price.toFixed(4) + " USDT"
          : "Rp " + price.toLocaleString("id-ID", { maximumFractionDigits: 2 }),
        padding.left - 5,
        y + 4,
      )
    }

    // Grid vertikal dan label tanggal
    const step = Math.max(1, Math.floor(data.length / 6))
    for (let i = 0; i < data.length; i += step) {
      const x = xScale(i)
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()

      // Label tanggal
      ctx.fillStyle = "#666"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      const date = new Date(data[i].date)
      ctx.fillText(date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }), x, height - 10)
    }

    // Gambar area chart
    ctx.beginPath()
    ctx.moveTo(xScale(0), yScale(data[0].price))
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(xScale(i), yScale(data[i].price))
    }
    ctx.lineTo(xScale(data.length - 1), height - padding.bottom)
    ctx.lineTo(xScale(0), height - padding.bottom)
    ctx.closePath()

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)")
    gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Gambar line chart
    ctx.beginPath()
    ctx.moveTo(xScale(0), yScale(data[0].price))
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(xScale(i), yScale(data[i].price))
    }
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2
    ctx.stroke()

    // Gambar titik untuk harga terakhir
    const lastIndex = data.length - 1
    ctx.beginPath()
    ctx.arc(xScale(lastIndex), yScale(data[lastIndex].price), 4, 0, Math.PI * 2)
    ctx.fillStyle = "#22c55e"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Load data chart berdasarkan timeframe
  useEffect(() => {
    setIsLoading(true)

    // Simulasi loading data
    setTimeout(() => {
      const days =
        timeframe === "1D" ? 1 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : 365
      const basePrice = chartType === "AGC/USDT" ? AGC_TO_USDT : AGC_TO_USDT * usdtPrice
      const data = generateChartData(basePrice, days)
      setChartData(data)

      // Hitung perubahan harga
      if (data.length > 1) {
        const firstPrice = data[0].price
        const lastPrice = data[data.length - 1].price
        const change = lastPrice - firstPrice
        const percentage = (change / firstPrice) * 100
        setPriceChange({
          value: change,
          percentage: Math.abs(percentage),
          isPositive: change >= 0,
        })
      }

      setIsLoading(false)
    }, 1000)
  }, [timeframe, chartType, usdtPrice])

  // Render chart ketika data atau canvas berubah
  useEffect(() => {
    if (canvasRef.current && chartData.length > 0 && !isLoading) {
      drawChart(chartData, canvasRef.current, chartType === "AGC/USDT" ? "USDT" : "IDR")
    }
  }, [chartData, isLoading, chartType])

  // Dapatkan harga terkini
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AGC Coin Price</CardTitle>
            <CardDescription className="flex items-center">
              Live market data
              <Link
                href="https://coinmarketcap.com/currencies/tether/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-xs text-blue-500 flex items-center hover:underline"
              >
                USDT Price <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">USDT: Rp {usdtPrice.toLocaleString("id-ID")}</div>
            <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsContent value="chart" className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {chartType === "AGC/USDT"
                      ? `${currentPrice.toFixed(4)} USDT`
                      : `Rp ${currentPrice.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`}
                  </div>
                  <div
                    className={`flex items-center text-sm ${priceChange.isPositive ? "text-green-500" : "text-red-500"}`}
                  >
                    {priceChange.isPositive ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    {chartType === "AGC/USDT"
                      ? `${priceChange.value.toFixed(4)} USDT`
                      : `Rp ${priceChange.value.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`}
                    <span className="ml-1">({priceChange.percentage.toFixed(2)}%)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={chartType} onValueChange={(value) => setChartType(value as "AGC/USDT" | "AGC/IDR")}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AGC/USDT">AGC/USDT</SelectItem>
                      <SelectItem value="AGC/IDR">AGC/IDR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative h-[300px] w-full">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <canvas ref={canvasRef} width={800} height={300} className="h-full w-full" />
                )}
              </div>

              <div className="flex justify-center space-x-1">
                <TabsList>
                  <TabsTrigger
                    value="1D"
                    onClick={() => setTimeframe("1D")}
                    className={timeframe === "1D" ? "bg-primary text-primary-foreground" : ""}
                  >
                    1D
                  </TabsTrigger>
                  <TabsTrigger
                    value="1W"
                    onClick={() => setTimeframe("1W")}
                    className={timeframe === "1W" ? "bg-primary text-primary-foreground" : ""}
                  >
                    1W
                  </TabsTrigger>
                  <TabsTrigger
                    value="1M"
                    onClick={() => setTimeframe("1M")}
                    className={timeframe === "1M" ? "bg-primary text-primary-foreground" : ""}
                  >
                    1M
                  </TabsTrigger>
                  <TabsTrigger
                    value="3M"
                    onClick={() => setTimeframe("3M")}
                    className={timeframe === "3M" ? "bg-primary text-primary-foreground" : ""}
                  >
                    3M
                  </TabsTrigger>
                  <TabsTrigger
                    value="1Y"
                    onClick={() => setTimeframe("1Y")}
                    className={timeframe === "1Y" ? "bg-primary text-primary-foreground" : ""}
                  >
                    1Y
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-lg font-medium">$5M</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Volume (24h)</div>
                  <div className="text-lg font-medium">$250K</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Circulating Supply</div>
                  <div className="text-lg font-medium">25M AGC</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                  <div className="text-lg font-medium">100M AGC</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-right">Last updated: {lastUpdated}</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
