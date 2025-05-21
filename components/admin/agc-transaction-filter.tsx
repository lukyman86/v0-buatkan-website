"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Search, Filter, X } from "lucide-react"

interface AgcTransactionFilterProps {
  onFilter: (filters: any) => void
  onReset: () => void
}

export function AgcTransactionFilter({ onFilter, onReset }: AgcTransactionFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionType, setTransactionType] = useState("all")
  const [status, setStatus] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")

  const handleFilter = () => {
    onFilter({
      searchTerm,
      transactionType,
      status,
      dateRange,
      minAmount: minAmount ? Number.parseFloat(minAmount) : undefined,
      maxAmount: maxAmount ? Number.parseFloat(maxAmount) : undefined,
    })
  }

  const handleReset = () => {
    setSearchTerm("")
    setTransactionType("all")
    setStatus("all")
    setDateRange({ from: undefined, to: undefined })
    setMinAmount("")
    setMaxAmount("")
    onReset()
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Cari</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="ID, Username, Hash..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipe Transaksi</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="completed">Berhasil</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rentang Tanggal</Label>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="min-amount">Jumlah Minimal (AGC)</Label>
            <Input
              id="min-amount"
              type="number"
              placeholder="0"
              min="0"
              step="0.00000001"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-amount">Jumlah Maksimal (AGC)</Label>
            <Input
              id="max-amount"
              type="number"
              placeholder="100"
              min="0"
              step="0.00000001"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>

          <div className="flex items-end space-x-2 md:col-span-2">
            <Button onClick={handleFilter} className="flex-1">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
