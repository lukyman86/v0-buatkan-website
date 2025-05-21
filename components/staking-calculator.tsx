"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Calculator, Info, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

// Konstanta untuk perhitungan
const AGC_TO_USDT = 0.2 // 1 AGC = 0.2 USDT
const USDT_TO_IDR = 15500 // Asumsi 1 USDT = Rp 15.500 (akan diupdate dari API)
const AGC_TO_IDR = AGC_TO_USDT * USDT_TO_IDR

// Opsi staking
const stakingOptions = [
  { id: "non-lock", name: "Non Locking", period: 0, apy: 15 },
  { id: "3-month", name: "3 Months Lock", period: 3, apy: 25 },
  { id: "6-month", name: "6 Months Lock", period: 6, apy: 35 },
  { id: "12-month", name: "12 Months Lock", period: 12, apy: 47 },
]

export function StakingCalculator() {
  const [amount, setAmount] = useState<number>(1000)
  const [stakingOption, setStakingOption] = useState<string>("12-month")
  const [usdtPrice, setUsdtPrice] = useState(USDT_TO_IDR)
  const [results, setResults] = useState({
    totalReward: 0,
    monthlyReward: 0,
    apy: 0,
    totalValue: 0,
    bonusDeposit: 0,
    totalWithBonus: 0,
  })

  // Simulasi fetch harga USDT dari API
  useEffect(() => {
    const fetchUsdtPrice = async () => {
      try {
        // Simulasi delay network
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Simulasi harga USDT yang berfluktuasi sedikit
        const randomVariation = Math.random() * 200 - 100 // -100 to +100
        setUsdtPrice(USDT_TO_IDR + randomVariation)
      } catch (error) {
        console.error("Error fetching USDT price:", error)
      }
    }

    fetchUsdtPrice()
    // Refresh harga setiap 60 detik
    const interval = setInterval(fetchUsdtPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  // Hitung hasil staking
  useEffect(() => {
    const option = stakingOptions.find((opt) => opt.id === stakingOption)
    if (!option) return

    // Bonus deposit 15% untuk staking di atas 1.000.000 AGC
    const bonusDeposit = amount >= 1000000 ? amount * 0.15 : 0
    const totalWithBonus = amount + bonusDeposit

    // Hitung reward berdasarkan APY
    const apy = option.apy
    const monthlyReward = (totalWithBonus * (apy / 100)) / 12
    const totalReward = option.period > 0 ? monthlyReward * option.period : monthlyReward * 12 // Untuk non-locking, kita hitung untuk 1 tahun

    setResults({
      totalReward,
      monthlyReward,
      apy,
      totalValue: totalWithBonus + totalReward,
      bonusDeposit,
      totalWithBonus,
    })
  }, [amount, stakingOption])

  // Format angka ke format mata uang
  const formatCurrency = (value: number, currency = "AGC") => {
    if (currency === "AGC") {
      return `${value.toLocaleString("id-ID", { maximumFractionDigits: 2 })} AGC`
    } else if (currency === "USDT") {
      return `${(value * AGC_TO_USDT).toLocaleString("id-ID", { maximumFractionDigits: 2 })} USDT`
    } else {
      return `Rp ${(value * AGC_TO_USDT * usdtPrice).toLocaleString("id-ID", { maximumFractionDigits: 2 })}`
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Staking Calculator
        </CardTitle>
        <CardDescription className="flex items-center">
          Calculate your potential staking rewards
          <Link
            href="https://coinmarketcap.com/currencies/tether/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs text-blue-500 flex items-center hover:underline"
          >
            USDT Price <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="amount">Staking Amount</Label>
            <div className="text-sm text-muted-foreground">Min: 100 AGC</div>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              id="amount"
              type="number"
              min={100}
              value={amount}
              onChange={(e) => setAmount(Math.max(100, Number(e.target.value)))}
              className="w-full"
            />
            <span className="text-sm font-medium">AGC</span>
          </div>
          <Slider
            value={[amount]}
            min={100}
            max={2000000}
            step={100}
            onValueChange={(value) => setAmount(value[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100 AGC</span>
            <span>2,000,000 AGC</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="staking-option">Staking Option</Label>
          <Select value={stakingOption} onValueChange={setStakingOption}>
            <SelectTrigger id="staking-option">
              <SelectValue placeholder="Select staking option" />
            </SelectTrigger>
            <SelectContent>
              {stakingOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name} - {option.apy}% APY
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="mb-4 text-sm font-medium">Estimated Returns</div>
          <div className="space-y-3">
            {amount >= 1000000 && (
              <div className="flex justify-between">
                <div className="flex items-center text-sm">
                  <span>Bonus Deposit (15%)</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>15% bonus for staking over 1,000,000 AGC</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-sm font-medium text-green-500">+{formatCurrency(results.bonusDeposit)}</div>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm">Total Staked (with bonus)</div>
              <div className="text-sm font-medium">{formatCurrency(results.totalWithBonus)}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-sm">APY</div>
              <div className="text-sm font-medium">{results.apy}%</div>
            </div>

            <div className="flex justify-between">
              <div className="text-sm">Monthly Reward</div>
              <div className="text-sm font-medium text-green-500">+{formatCurrency(results.monthlyReward)}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-sm">
                {stakingOptions.find((opt) => opt.id === stakingOption)?.period
                  ? `Total Reward (${stakingOptions.find((opt) => opt.id === stakingOption)?.period} months)`
                  : "Total Reward (12 months)"}
              </div>
              <div className="text-sm font-medium text-green-500">+{formatCurrency(results.totalReward)}</div>
            </div>

            <div className="border-t border-border pt-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Total Value</div>
                <div className="text-sm font-medium">{formatCurrency(results.totalValue)}</div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <div>Value in USDT</div>
                <div>{formatCurrency(results.totalValue, "USDT")}</div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <div>Value in IDR</div>
                <div>{formatCurrency(results.totalValue, "IDR")}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start Staking Now</Button>
      </CardFooter>
    </Card>
  )
}
