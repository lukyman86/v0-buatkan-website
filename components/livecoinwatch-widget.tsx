"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface LiveCoinWatchWidgetProps {
  coin?: string
  base?: string
  period?: "h" | "d" | "w" | "m" | "y"
  textColor?: string
  backgroundColor?: string
  borderWidth?: string
  className?: string
}

export function LiveCoinWatchWidget({
  coin = "USDT",
  base = "USD",
  period = "d",
  textColor = "#ffffff",
  backgroundColor = "#1f2434",
  borderWidth = "1",
  className = "",
}: LiveCoinWatchWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fungsi untuk memuat script LiveCoinWatch widget
    const loadLiveCoinWatchWidget = () => {
      // Hapus script lama jika ada
      const existingScript = document.getElementById("livecoinwatch-widget-script")
      if (existingScript) {
        existingScript.remove()
      }

      // Buat script baru
      const script = document.createElement("script")
      script.id = "livecoinwatch-widget-script"
      script.src = "https://www.livecoinwatch.com/static/lcw-widget.js"
      script.defer = true

      // Tambahkan script ke dokumen
      document.body.appendChild(script)

      return () => {
        // Cleanup saat komponen unmount
        if (document.getElementById("livecoinwatch-widget-script")) {
          document.getElementById("livecoinwatch-widget-script")?.remove()
        }
      }
    }

    loadLiveCoinWatchWidget()
  }, [])

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{coin} Price</CardTitle>
            <CardDescription>Live data from LiveCoinWatch</CardDescription>
          </div>
          <Link
            href={`https://www.livecoinwatch.com/price/${coin}-${base}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 flex items-center hover:underline"
          >
            View on LiveCoinWatch <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef}>
          {/* LiveCoinWatch Widget */}
          <div
            className="livecoinwatch-widget-6"
            lcw-coin={coin}
            lcw-base={base}
            lcw-period={period}
            lcw-color-tx={textColor}
            lcw-color-bg={backgroundColor}
            lcw-border-w={borderWidth}
          ></div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Data provided by LiveCoinWatch. Widget updates automatically.
        </div>
      </CardContent>
    </Card>
  )
}
