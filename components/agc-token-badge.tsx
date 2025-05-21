"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AGC_TOKEN_INFO } from "@/types/agc-token"

export function AgcTokenBadge() {
  const openExplorer = () => {
    window.open(AGC_TOKEN_INFO.explorerUrl, "_blank")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center">
            <div className="relative h-5 w-5 mr-1">
              <Image
                src={AGC_TOKEN_INFO.logo || "/placeholder.svg"}
                alt={AGC_TOKEN_INFO.symbol}
                fill
                className="object-contain"
              />
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              {AGC_TOKEN_INFO.symbol}
            </Badge>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={openExplorer}>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {AGC_TOKEN_INFO.name} - Solana SPL Token
            <br />
            Klik untuk melihat di Solscan Explorer
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
