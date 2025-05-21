"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function UsdtPriceIndicator() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulasi fetch data harga USDT
    // Dalam implementasi nyata, Anda akan menggunakan API
    const fetchPrice = () => {
      setLoading(true)
      // Simulasi delay network
      setTimeout(() => {
        // USDT biasanya sekitar $1, dengan sedikit variasi
        const simulatedPrice = 0.9995 + Math.random() * 0.002
        setPrice(simulatedPrice)
        setLoading(false)
      }, 1500)
    }

    fetchPrice()
    // Refresh harga setiap 60 detik
    const interval = setInterval(fetchPrice, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-800 text-white">
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 font-semibold">USDT/USD:</div>
            {loading ? (
              <Skeleton className="h-6 w-16 bg-slate-700" />
            ) : (
              <div className="font-mono">${price?.toFixed(4)}</div>
            )}
          </div>
          <Link href="/usdt-price" className="text-xs text-blue-400 flex items-center hover:underline ml-2">
            <ExternalLink className="h-3 w-3 mr-1" />
            Detail
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
