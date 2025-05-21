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
import { AlertCircle, Copy, Info } from "lucide-react"
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
const MIN_DEPOSIT = 1 // Minimal 1 AGC untuk deposit
const AGC_TO_IDR = 3100 // Asumsi 1 AGC = Rp 3.100 (0.2 USDT * 15500 IDR/USDT)

export function AgcDepositForm() {
  const router = useRouter()
  const { toast } = useToast()
  // Di dalam fungsi AgcDepositForm, tambahkan useNotifications
  const { addNotification } = useNotifications()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

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

    if (numValue < MIN_DEPOSIT) {
      setError(`Minimal deposit adalah ${MIN_DEPOSIT} AGC`)
      return
    }

    setError(null)
  }

  const handleTxHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxHash(e.target.value)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Disalin ke clipboard",
      description: "Alamat deposit telah disalin ke clipboard",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (error) return

    if (!txHash) {
      setError("Hash transaksi diperlukan")
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_DEPOSIT) {
      setError(`Minimal deposit adalah ${MIN_DEPOSIT} AGC`)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate random deposit ID
      const depositId = Math.random().toString(36).substring(2, 15)

      // Tambahkan notifikasi
      addNotification({
        title: "Deposit AGC Diajukan",
        message: `Deposit ${numAmount} AGC sedang diproses dan akan segera diverifikasi`,
        type: "info",
        link: `/agc/deposit/confirmation/${depositId}`,
        image: "/placeholder.svg?height=40&width=40",
      })

      toast({
        title: "Deposit berhasil diajukan",
        description: "Tim kami akan memverifikasi deposit Anda segera",
      })

      // Redirect to deposit confirmation page
      router.push(`/agc/deposit/confirmation/${depositId}`)
    } catch (error) {
      toast({
        title: "Deposit gagal",
        description: "Terjadi kesalahan saat mengajukan deposit. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Deposit AGC</CardTitle>
        <CardDescription>Deposit AGC Coin ke akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 text-sm font-medium">Alamat Deposit AGC</div>
            <div className="flex items-center justify-between bg-background p-3 rounded-md border">
              <code className="text-xs sm:text-sm break-all">{EXCHANGE.depositAddress}</code>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-2 flex-shrink-0"
                onClick={() => copyToClipboard(EXCHANGE.depositAddress)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <p>
                <strong>PENTING:</strong> Pastikan Anda mengirim AGC Coin ke alamat yang benar. Transfer ke alamat yang
                salah dapat mengakibatkan kehilangan dana.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Jumlah AGC</Label>
              <span className="text-xs text-muted-foreground">Min: {MIN_DEPOSIT} AGC</span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={handleAmountChange}
              min={MIN_DEPOSIT}
              step="0.00000001"
              required
            />
            {amount && !error && (
              <p className="text-xs text-muted-foreground">
                Nilai: {formatCurrency(Number.parseFloat(amount) * AGC_TO_IDR, "IDR")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="txHash">Hash Transaksi</Label>
            <Input
              id="txHash"
              placeholder="Masukkan hash transaksi dari exchange"
              value={txHash}
              onChange={handleTxHashChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Hash transaksi dapat ditemukan di riwayat transaksi exchange Anda
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              placeholder="Tambahkan catatan untuk deposit ini"
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

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informasi Penting</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Deposit AGC akan diproses dalam 1-24 jam kerja</li>
                <li>Pastikan Anda memasukkan hash transaksi yang benar</li>
                <li>Minimal deposit adalah {MIN_DEPOSIT} AGC</li>
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
          disabled={!!error || !amount || !txHash || isSubmitting || Number.parseFloat(amount || "0") === 0}
        >
          {isSubmitting ? "Memproses..." : "Ajukan Deposit"}
        </Button>
      </CardFooter>
    </Card>
  )
}
