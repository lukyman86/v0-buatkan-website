"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Copy, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AGC_TOKEN_INFO } from "@/types/agc-token"

export function AgcTokenInfo() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(AGC_TOKEN_INFO.mintAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openExplorer = () => {
    window.open(AGC_TOKEN_INFO.explorerUrl, "_blank")
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white flex items-center justify-center">
              <Image
                src={AGC_TOKEN_INFO.logo || "/placeholder.svg"}
                alt={AGC_TOKEN_INFO.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <CardTitle>{AGC_TOKEN_INFO.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Badge variant="outline" className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                  {AGC_TOKEN_INFO.symbol}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  Solana SPL Token
                </Badge>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Token Mint Address</div>
            <div className="flex items-center">
              <code className="bg-muted p-2 rounded text-xs sm:text-sm flex-1 overflow-x-auto">
                {AGC_TOKEN_INFO.mintAddress}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Disalin!" : "Salin address"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Jaringan</div>
              <div className="text-sm">{AGC_TOKEN_INFO.network} Blockchain</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Decimals</div>
              <div className="text-sm">{AGC_TOKEN_INFO.decimals}</div>
            </div>
          </div>

          {AGC_TOKEN_INFO.description && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Deskripsi</div>
              <p className="text-sm">{AGC_TOKEN_INFO.description}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" onClick={openExplorer}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Lihat di Solscan Explorer
        </Button>
      </CardFooter>
    </Card>
  )
}
