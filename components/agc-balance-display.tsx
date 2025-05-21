"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AGC_TOKEN_INFO } from "@/types/agc-token"
import { formatCurrency } from "@/lib/utils"

interface AgcBalanceDisplayProps {
  balance: number
  idrValue?: number
}

export function AgcBalanceDisplay({ balance, idrValue }: AgcBalanceDisplayProps) {
  // Asumsi 1 AGC = Rp 3.100 jika idrValue tidak disediakan
  const totalIdrValue = idrValue || balance * 3100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Saldo AGC</CardTitle>
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white flex items-center justify-center">
          <Image
            src={AGC_TOKEN_INFO.logo || "/placeholder.svg"}
            alt={AGC_TOKEN_INFO.symbol}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{balance.toLocaleString("id-ID", { maximumFractionDigits: 8 })} AGC</div>
        <p className="text-xs text-muted-foreground mt-1">≈ {formatCurrency(totalIdrValue, "IDR")}</p>
      </CardContent>
    </Card>
  )
}
