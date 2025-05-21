"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function UsdtPriceIframe() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tether (USDT) Price</CardTitle>
            <CardDescription>Live data from CoinMarketCap</CardDescription>
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
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="space-y-4">
            <div className="relative h-[400px] w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              )}
              <iframe
                src="https://coinmarketcap.com/currencies/tether/"
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                title="USDT Price from CoinMarketCap"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Data provided by CoinMarketCap. Refresh the page to update.
            </div>
          </TabsContent>

          <TabsContent value="chart" className="space-y-4">
            <div className="relative h-[400px] w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              )}
              <iframe
                src="https://coinmarketcap.com/currencies/tether/#chart"
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                title="USDT Chart from CoinMarketCap"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </TabsContent>

          <TabsContent value="markets" className="space-y-4">
            <div className="relative h-[400px] w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              )}
              <iframe
                src="https://coinmarketcap.com/currencies/tether/markets/"
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                title="USDT Markets from CoinMarketCap"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
