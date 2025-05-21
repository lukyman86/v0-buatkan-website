"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Info, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SwapFormProps {
  usdtPrice?: number
}

export function SwapForm({ usdtPrice = 15500 }: SwapFormProps) {
  const [agcAmount, setAgcAmount] = useState<string>("")
  const [idrAmount, setIdrAmount] = useState<string>("")
  const [swapDirection, setSwapDirection] = useState<"agc-to-idr" | "idr-to-agc">("agc-to-idr")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Konstanta untuk perhitungan
  const AGC_TO_USDT = 0.2 // 1 AGC = 0.2 USDT
  const AGC_TO_IDR = AGC_TO_USDT * usdtPrice // 1 AGC dalam IDR
  const ADMIN_FEE_PERCENTAGE = 0.9 // 0.9% biaya admin
  const NETWORK_FEE_PER_AGC = 0.00005 // 0.00005 biaya jaringan per AGC
  const MIN_AGC_SWAP = 1 // Minimal 1 AGC untuk swap

  // Hitung biaya dan jumlah yang diterima
  const calculateFees = (amount: number, direction: "agc-to-idr" | "idr-to-agc") => {
    if (direction === "agc-to-idr") {
      const agcAmount = amount
      const adminFee = agcAmount * AGC_TO_IDR * (ADMIN_FEE_PERCENTAGE / 100)
      const networkFee = agcAmount * NETWORK_FEE_PER_AGC * AGC_TO_IDR
      const totalFee = adminFee + networkFee
      const receivedAmount = agcAmount * AGC_TO_IDR - totalFee

      return {
        adminFee,
        networkFee,
        totalFee,
        receivedAmount,
        agcAmount,
        idrAmount: receivedAmount,
      }
    } else {
      const idrAmount = amount
      const agcEquivalent = idrAmount / AGC_TO_IDR
      const adminFee = agcEquivalent * (ADMIN_FEE_PERCENTAGE / 100)
      const networkFee = agcEquivalent * NETWORK_FEE_PER_AGC
      const totalFeeInAgc = adminFee + networkFee
      const receivedAgc = agcEquivalent - totalFeeInAgc

      return {
        adminFee: adminFee * AGC_TO_IDR,
        networkFee: networkFee * AGC_TO_IDR,
        totalFee: totalFeeInAgc * AGC_TO_IDR,
        receivedAmount: receivedAgc,
        agcAmount: receivedAgc,
        idrAmount,
      }
    }
  }

  // Handle perubahan input AGC
  const handleAgcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAgcAmount(value)

    if (value === "") {
      setIdrAmount("")
      setError(null)
      return
    }

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) {
      setError("Masukkan jumlah yang valid")
      return
    }

    if (swapDirection === "agc-to-idr") {
      if (numValue < MIN_AGC_SWAP) {
        setError(`Minimal swap adalah ${MIN_AGC_SWAP} AGC`)
        return
      }

      const { receivedAmount } = calculateFees(numValue, "agc-to-idr")
      setIdrAmount(receivedAmount.toFixed(2))
      setError(null)
    } else {
      const { agcAmount: calculatedAgc } = calculateFees(Number.parseFloat(idrAmount) || 0, "idr-to-agc")
      if (calculatedAgc < MIN_AGC_SWAP) {
        setError(`Jumlah IDR terlalu kecil. Minimal setara dengan ${MIN_AGC_SWAP} AGC`)
        return
      }

      const agcEquivalent = numValue / AGC_TO_IDR
      setIdrAmount(value)
      setError(null)
    }
  }

  // Handle perubahan input IDR
  const handleIdrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setIdrAmount(value)

    if (value === "") {
      setAgcAmount("")
      setError(null)
      return
    }

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) {
      setError("Masukkan jumlah yang valid")
      return
    }

    if (swapDirection === "idr-to-agc") {
      const { receivedAmount } = calculateFees(numValue, "idr-to-agc")

      if (receivedAmount < MIN_AGC_SWAP) {
        setError(`Jumlah IDR terlalu kecil. Minimal setara dengan ${MIN_AGC_SWAP} AGC`)
        return
      }

      setAgcAmount(receivedAmount.toFixed(8))
      setError(null)
    } else {
      const idrEquivalent = numValue * AGC_TO_IDR
      setAgcAmount(value)
      setError(null)
    }
  }

  // Tukar arah swap
  const toggleSwapDirection = () => {
    setSwapDirection((prev) => (prev === "agc-to-idr" ? "idr-to-agc" : "agc-to-idr"))
    setAgcAmount("")
    setIdrAmount("")
    setError(null)
  }

  // Handle submit swap
  const handleSwap = () => {
    if (error) return

    const agcValue = Number.parseFloat(agcAmount)
    if (isNaN(agcValue) || agcValue < MIN_AGC_SWAP) {
      setError(`Minimal swap adalah ${MIN_AGC_SWAP} AGC`)
      return
    }

    setIsLoading(true)

    // Simulasi proses swap
    setTimeout(() => {
      setIsLoading(false)
      // Reset form atau tampilkan sukses
      alert(
        `Swap berhasil! ${
          swapDirection === "agc-to-idr"
            ? `Anda menukarkan ${agcAmount} AGC menjadi Rp ${idrAmount}`
            : `Anda menukarkan Rp ${idrAmount} menjadi ${agcAmount} AGC`
        }`,
      )
      setAgcAmount("")
      setIdrAmount("")
    }, 2000)
  }

  // Hitung detail swap untuk ditampilkan
  const swapDetails = () => {
    if (!agcAmount || Number.parseFloat(agcAmount) === 0) return null

    const agcValue = Number.parseFloat(agcAmount)
    if (isNaN(agcValue)) return null

    const { adminFee, networkFee, totalFee, receivedAmount } = calculateFees(
      swapDirection === "agc-to-idr" ? agcValue : Number.parseFloat(idrAmount),
      swapDirection,
    )

    return {
      adminFee,
      networkFee,
      totalFee,
      receivedAmount,
    }
  }

  const details = swapDetails()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Swap AGC/IDR</CardTitle>
        <CardDescription>Tukar AGC Coin dengan IDR atau sebaliknya</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="agc-to-idr" value={swapDirection} onValueChange={(v) => setSwapDirection(v as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="agc-to-idr">AGC → IDR</TabsTrigger>
            <TabsTrigger value="idr-to-agc">IDR → AGC</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="agc-amount">
                {swapDirection === "agc-to-idr" ? "Jumlah AGC" : "Jumlah AGC yang Diterima"}
              </Label>
              {swapDirection === "agc-to-idr" && (
                <span className="text-xs text-muted-foreground">Min: {MIN_AGC_SWAP} AGC</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="agc-amount"
                type="number"
                placeholder="0.00"
                value={agcAmount}
                onChange={handleAgcChange}
                disabled={swapDirection === "idr-to-agc"}
                className="w-full"
              />
              <span className="text-sm font-medium w-16">AGC</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={toggleSwapDirection}>
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="idr-amount">
                {swapDirection === "agc-to-idr" ? "Jumlah IDR yang Diterima" : "Jumlah IDR"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="idr-amount"
                type="number"
                placeholder="0.00"
                value={idrAmount}
                onChange={handleIdrChange}
                disabled={swapDirection === "agc-to-idr"}
                className="w-full"
              />
              <span className="text-sm font-medium w-16">IDR</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {details && (
            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 text-sm font-medium">Detail Transaksi</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span>Kurs</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Kurs AGC/IDR saat ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>1 AGC = Rp {AGC_TO_IDR.toLocaleString("id-ID")}</div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span>Biaya Admin (0.9%)</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Biaya admin sebesar 0.9% dari nilai transaksi</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>Rp {details.adminFee.toLocaleString("id-ID", { maximumFractionDigits: 2 })}</div>
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
                  <div>Rp {details.networkFee.toLocaleString("id-ID", { maximumFractionDigits: 2 })}</div>
                </div>

                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Biaya</span>
                    <span>Rp {details.totalFee.toLocaleString("id-ID", { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-green-600">
                  <span>Jumlah yang Diterima</span>
                  <span>
                    {swapDirection === "agc-to-idr"
                      ? `Rp ${details.receivedAmount.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`
                      : `${details.receivedAmount.toLocaleString("id-ID", { maximumFractionDigits: 8 })} AGC`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSwap}
          disabled={!!error || !agcAmount || isLoading || Number.parseFloat(agcAmount) === 0}
        >
          {isLoading ? "Memproses..." : "Swap Sekarang"}
        </Button>
      </CardFooter>
    </Card>
  )
}
