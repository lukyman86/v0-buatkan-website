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
import { AlertCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import type { AgcExchange } from "@/types/agc-transaction"

// Tambahkan import useNotifications
import { useNotifications } from "@/contexts/notification-context"

// Dummy data untuk exchange
const EXCHANGE: AgcExchange = {
  id: "agc-exchange",
  name: "AGC Exchange",
  depositAddress: "AGC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  withdrawalFee: 0.001,
  minWithdrawal: 1,
  maxWithdrawal: 10000,
  isActive: true,
}

// Konstanta untuk perhitungan
const TRANSFER_FEE_PERCENTAGE = 0.9 // 0.9% biaya transfer
const NETWORK_FEE_PER_AGC = 0.00005 // 0.00005 biaya jaringan per AGC
const MIN_WITHDRAW = 1 // Minimal 1 AGC untuk withdraw
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100 (0.2 USDT * 15500 IDR/USDT)

interface AgcWithdrawFormProps {
  walletBalance?: number
}

export function AgcWithdrawForm({ walletBalance = 100 }: AgcWithdrawFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  // Di dalam fungsi AgcWithdrawForm, tambahkan useNotifications
  const { addNotification } = useNotifications()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const [destinationAddress, setDestinationAddress] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

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

    if (numValue < MIN_WITHDRAW) {
      setError(`Minimal withdraw adalah ${MIN_WITHDRAW} AGC`)
      return
    }

    if (numValue > walletBalance) {
      setError(`Saldo AGC Anda tidak mencukupi (${walletBalance} AGC)`)
      return
    }

    setError(null)
  }

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationAddress(e.target.value)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (error) return

    if (!destinationAddress) {
      setError("Alamat tujuan diperlukan")
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_WITHDRAW) {
      setError(`Minimal withdraw adalah ${MIN_WITHDRAW} AGC`)
      return
    }

    if (numAmount > walletBalance) {
      setError(`Saldo AGC Anda tidak mencukupi (${walletBalance} AGC)`)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate random withdraw ID
      const withdrawId = Math.random().toString(36).substring(2, 15)

      // Tambahkan notifikasi
      addNotification({
        title: "Withdraw AGC Diajukan",
        message: `Withdraw ${numAmount} AGC sedang diproses dan akan segera diverifikasi`,
        type: "info",
        link: `/agc/withdraw/confirmation/${withdrawId}`,
        image: "/placeholder.svg?height=40&width=40",
      })

      toast({
        title: "Withdraw berhasil diajukan",
        description: "Tim kami akan memproses withdraw Anda segera",
      })

      // Redirect to withdraw confirmation page
      router.push(`/agc/withdraw/confirmation/${withdrawId}`)
    } catch (error) {
      toast({
        title: "Withdraw gagal",
        description: "Terjadi kesalahan saat mengajukan withdraw. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Hitung detail withdraw untuk ditampilkan
  const withdrawDetails = () => {
    if (!amount || Number.parseFloat(amount) === 0) return null

    const agcValue = Number.parseFloat(amount)
    if (isNaN(agcValue)) return null

    return calculateFees(agcValue)
  }

  const details = withdrawDetails()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Withdraw AGC</CardTitle>
        <CardDescription>Tarik AGC Coin dari akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Jumlah AGC</Label>
              <span className="text-xs text-muted-foreground">
                Saldo: {walletBalance} AGC ({formatCurrency(walletBalance * AGC_TO_IDR, "IDR")})
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={handleAmountChange}
              min={MIN_WITHDRAW}
              step="0.00000001"
              required
            />
            <p className="text-xs text-muted-foreground">Minimal withdraw: {MIN_WITHDRAW} AGC</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Alamat Tujuan</Label>
            <Input
              id="destination"
              placeholder="Masukkan alamat AGC tujuan"
              value={destinationAddress}
              onChange={handleDestinationChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Pastikan alamat tujuan benar. Transfer ke alamat yang salah tidak dapat dikembalikan.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan untuk withdraw ini"
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
                    <span>Jumlah Withdraw</span>
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

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informasi Penting</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Withdraw AGC akan diproses dalam 1-24 jam kerja</li>
                <li>Pastikan alamat tujuan benar dan aktif</li>
                <li>Minimal withdraw adalah {MIN_WITHDRAW} AGC</li>
                <li>Biaya transfer sebesar 0.9% + biaya jaringan 0.00005 per AGC</li>
                <li>Jika Anda mengalami masalah, silakan hubungi customer service kami</li>
              </ul>
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!!error || !amount || !destinationAddress || isSubmitting || Number.parseFloat(amount || "0") === 0}
        >
          {isSubmitting ? "Memproses..." : "Ajukan Withdraw"}
        </Button>
      </CardFooter>
    </Card>
  )
}
