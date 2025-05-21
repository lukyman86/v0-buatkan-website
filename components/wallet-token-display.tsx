"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AGC_TOKEN_INFO } from "@/types/agc-token"

interface WalletTokenDisplayProps {
  balance: number
  address: string
}

export function WalletTokenDisplay({ balance, address }: WalletTokenDisplayProps) {
  // Memotong alamat wallet untuk tampilan yang lebih baik
  const shortenedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white flex items-center justify-center">
            <Image
              src={AGC_TOKEN_INFO.logo || "/placeholder.svg"}
              alt={AGC_TOKEN_INFO.symbol}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-medium">{AGC_TOKEN_INFO.symbol}</div>
            <div className="text-sm text-muted-foreground">{shortenedAddress}</div>
          </div>
          <div className="ml-auto font-medium">{balance.toLocaleString("id-ID", { maximumFractionDigits: 8 })}</div>
        </div>
      </CardContent>
    </Card>
  )
}
