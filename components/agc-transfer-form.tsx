"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { useNotifications } from "@/contexts/notification-context"
import { useSolanaWallet } from "@/contexts/solana-wallet-context"
import { sendAgc, isValidSolanaAddress, getSolscanTransactionLink } from "@/lib/solana"

// Konstanta untuk perhitungan
const TRANSFER_FEE_PERCENTAGE = 0.9 // 0.9% biaya transfer
const NETWORK_FEE_PER_AGC = 0.00005 // 0.00005 biaya jaringan per AGC
const MIN_TRANSFER = 1 // Minimal 1 AGC untuk transfer
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100 (0.2 USDT * 15500 IDR/USDT)

export function AgcTransferForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const { connected, publicKey, agcBalance, wallet, refreshBalance } = useSolanaWallet()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const [receiverAddress, setReceiverAddress] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null)

  // Hitung biaya dan jumlah yang diterima
  const calculateFees = (agcAmount: number) => {
    const transferFee = agcAmount * (TRANSFER_FEE_PERCENTAGE / 100)
    const networkFee = agcAmount * NETWORK_FEE_PER_AGC
    const totalFee = transferFee + networkFee
    const receivedAmount = agcAmount - totalFee

    return {
      transferFee,
      networkFee,
      totalFee,
      receivedAmount,
      idrValue: agcAmount * AGC_TO_IDR,
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    if (value === "") {
      setError(null)
      return
    }

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) {
      setError("Masukkan jumlah yang valid")
      return
    }

    if (numValue < MIN_TRANSFER) {
      setError(`Minimal transfer adalah ${MIN_TRANSFER} AGC`)
      return
    }

    if (numValue > agcBalance) {
      setError(`Saldo AGC Anda tidak mencukupi (${agcBalance.toFixed(4)} AGC)`)
      return
    }

    setError(null)
  }

  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReceiverAddress(value)

    if (value && !isValidSolanaAddress(value)) {
      setError("Alamat Solana tidak valid")
    } else {
      setError(null)
    }
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (error) return

    if (!connected || !wallet || !publicKey) {
      setError("Wallet tidak terhubung")
      return
    }

    if (!receiverAddress) {
      setError("Alamat penerima diperlukan")
      return
    }

    if (!isValidSolanaAddress(receiverAddress)) {
      setError("Alamat Solana tidak valid")
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_TRANSFER) {
      setError(`Minimal transfer adalah ${MIN_TRANSFER} AGC`)
      return
    }

    if (numAmount > agcBalance) {
      setError(`Saldo AGC Anda tidak mencukupi (${agcBalance.toFixed(4)} AGC)`)
      return
    }

    setIsSubmitting(true)

    try {
      // Kirim AGC menggunakan Solana
      const result = await sendAgc(wallet, receiverAddress, numAmount)

      if (result.success && result.signature) {
        setTransactionSignature(result.signature)

        // Refresh saldo setelah transaksi berhasil
        await refreshBalance()

        // Tambahkan notifikasi
        addNotification({
          title: "Transfer AGC Berhasil",
          message: `${numAmount} AGC telah berhasil dikirim ke ${receiverAddress}`,
          type: "success",
          link: getSolscanTransactionLink(result.signature),
          image: "/placeholder.svg?height=40&width=40",
        })

        toast({
          title: "Transfer berhasil",
          description: (
            <div className="flex flex-col gap-1">
              <p>{`${numAmount} AGC telah berhasil dikirim ke ${receiverAddress.slice(0, 4)}...${receiverAddress.slice(-4)}`}</p>
              <a
                href={getSolscanTransactionLink(result.signature)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
              >
                Lihat di Solscan <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ),
        })
      } else {
        setError(result.error || "Terjadi kesalahan saat mengirim AGC")
      }
    } catch (error) {
      console.error("Error sending AGC:", error)
      toast({
        title: "Transfer gagal",
        description: "Terjadi kesalahan saat melakukan transfer. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Hitung detail transfer untuk ditampilkan
  const transferDetails = () => {
    if (!amount || Number.parseFloat(amount) === 0) return null

    const agcValue = Number.parseFloat(amount)
    if (isNaN(agcValue)) return null

    return calculateFees(agcValue)
  }

  const details = transferDetails()

  if (!connected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transfer AGC</CardTitle>
          <CardDescription>Kirim AGC Coin ke sesama member</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Wallet Tidak Terhubung</AlertTitle>
            <AlertDescription>Silakan hubungkan wallet Solana Anda untuk melakukan transfer AGC.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transfer AGC</CardTitle>
        <CardDescription>Kirim AGC Coin ke sesama member</CardDescription>
      </CardHeader>
      <CardContent>
        {transactionSignature ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <Info className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Transfer Berhasil</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Transfer {amount} AGC telah berhasil dikirim ke {receiverAddress.slice(0, 4)}...
                  {receiverAddress.slice(-4)}
                </p>
                <a
                  href={getSolscanTransactionLink(transactionSignature)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  Lihat transaksi di Solscan <ExternalLink className="h-3 w-3" />
                </a>
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={() => {
                setAmount("")
                setReceiverAddress("")
                setNotes("")
                setTransactionSignature(null)
              }}
            >
              Kirim AGC Lagi
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Jumlah AGC</Label>
                <span className="text-xs text-muted-foreground">
                  Saldo: {agcBalance.toFixed(4)} AGC ({formatCurrency(agcBalance * AGC_TO_IDR, "IDR")})
                </span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                min={MIN_TRANSFER}
                step="0.00000001"
                required
              />
              <p className="text-xs text-muted-foreground">Minimal transfer: {MIN_TRANSFER} AGC</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiver">Alamat Penerima</Label>
              <Input
                id="receiver"
                placeholder="Masukkan alamat Solana penerima"
                value={receiverAddress}
                onChange={handleReceiverChange}
                required
              />
              <p className="text-xs text-muted-foreground">Masukkan alamat wallet Solana yang valid</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan (Opsional)</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan untuk penerima"
                value={notes}
                onChange={handleNotesChange}
                rows={3}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {details && !error && (
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 text-sm font-medium">Detail Transaksi</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span>Jumlah Transfer</span>
                    </div>
                    <div>
                      {amount} AGC ({formatCurrency(details.idrValue, "IDR")})
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span>Biaya Transfer (0.9%)</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Biaya transfer sebesar 0.9% dari nilai transaksi</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      {details.transferFee.toFixed(8)} AGC ({formatCurrency(details.transferFee * AGC_TO_IDR, "IDR")})
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span>Biaya Jaringan</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Biaya jaringan sebesar 0.00005 per AGC</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      {details.networkFee.toFixed(8)} AGC ({formatCurrency(details.networkFee * AGC_TO_IDR, "IDR")})
                    </div>
                  </div>

                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Biaya</span>
                      <span>
                        {details.totalFee.toFixed(8)} AGC ({formatCurrency(details.totalFee * AGC_TO_IDR, "IDR")})
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between font-medium text-green-600">
                    <span>Jumlah yang Diterima</span>
                    <span>
                      {details.receivedAmount.toFixed(8)} AGC (
                      {formatCurrency(details.receivedAmount * AGC_TO_IDR, "IDR")})
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </CardContent>
      {!transactionSignature && (
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!!error || !amount || isSubmitting || Number.parseFloat(amount || "0") === 0}
          >
            {isSubmitting ? "Memproses..." : "Kirim AGC"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
