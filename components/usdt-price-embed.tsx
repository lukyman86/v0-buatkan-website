"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function UsdtPriceEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fungsi untuk memuat script CoinMarketCap widget
    const loadCoinMarketCapWidget = () => {
      // Hapus script lama jika ada
      const existingScript = document.getElementById("coinmarketcap-widget-script")
      if (existingScript) {
        existingScript.remove()
      }

      // Buat script baru
      const script = document.createElement("script")
      script.id = "coinmarketcap-widget-script"
      script.src = "https://files.coinmarketcap.com/static/widget/currency.js"
      script.async = true

      // Tambahkan script ke dokumen
      document.body.appendChild(script)

      return () => {
        // Cleanup saat komponen unmount
        if (document.getElementById("coinmarketcap-widget-script")) {
          document.getElementById("coinmarketcap-widget-script")?.remove()
        }
      }
    }

    loadCoinMarketCapWidget()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tether (USDT) Price</CardTitle>
            <CardDescription>Official widget from CoinMarketCap</CardDescription>
          </div>
          <Link
            href="https://coinmarketcap.com/currencies/tether/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 flex items-center hover:underline"
          >
            Open in CoinMarketCap <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef}>
          {/* CoinMarketCap Widget */}
          <div
            className="coinmarketcap-currency-widget"
            data-currencyid="825"
            data-base="USD"
            data-secondary=""
            data-ticker="true"
            data-rank="true"
            data-marketcap="true"
            data-volume="true"
            data-statsticker="true"
            data-stats="USD"
          ></div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Data provided by CoinMarketCap. Widget updates automatically.
        </div>
      </CardContent>
    </Card>
  )
}
