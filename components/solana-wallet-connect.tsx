"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSolanaWallet } from "@/contexts/solana-wallet-context"
import { formatSolanaAddress, getSolscanAddressLink } from "@/lib/solana"
import { ExternalLink, Copy, Wallet, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

export function SolanaWalletConnect() {
  const { connected, publicKey, walletName, agcBalance, disconnect } = useSolanaWallet()
  const { setVisible } = useWalletModal()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConnect = () => {
    setVisible(true)
  }

  const handleDisconnect = async () => {
    await disconnect()
    setIsDialogOpen(false)
    toast({
      title: "Wallet terputus",
      description: "Wallet Solana Anda telah terputus",
    })
  }

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      toast({
        title: "Alamat disalin",
        description: "Alamat wallet Anda telah disalin ke clipboard",
      })
    }
  }

  const openSolscan = () => {
    if (publicKey) {
      window.open(getSolscanAddressLink(publicKey), "_blank")
    }
  }

  if (connected && publicKey) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden md:inline">{formatSolanaAddress(publicKey)}</span>
            <span className="inline md:hidden">Wallet</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet Solana</DialogTitle>
            <DialogDescription>Detail wallet Solana Anda</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Wallet</p>
              <p className="text-sm text-muted-foreground">{walletName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Alamat</p>
              <div className="flex items-center gap-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{publicKey}</code>
                <Button variant="ghost" size="icon" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={openSolscan}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Saldo AGC</p>
              <p className="text-sm">{agcBalance.toFixed(4)} AGC</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="destructive" onClick={handleDisconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              Putuskan Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Button variant="outline" onClick={handleConnect} className="flex items-center gap-2">
      <Wallet className="h-4 w-4" />
      <span>Hubungkan Wallet</span>
    </Button>
  )
}
