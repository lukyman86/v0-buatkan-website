"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, ChevronUp, Mountain, RefreshCw, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Trading() {
  const [headerLogo, setHeaderLogo] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [tradeType, setTradeType] = useState("buy")

  const handleHeaderLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setHeaderLogo(logoUrl)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const calculateTotal = () => {
    const amountValue = Number.parseFloat(amount) || 0
    const price = 105000 // Harga AGC dalam Rupiah
    return (amountValue * price).toLocaleString("id-ID")
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          {headerLogo ? (
            <div className="h-8 w-auto flex items-center justify-center">
              <Image
                src={headerLogo || "/placeholder.svg"}
                width={32}
                height={32}
                alt="Logo"
                className="h-full w-auto object-contain"
                style={{ maxHeight: "32px" }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Mountain className="size-6" />
              <label className="ml-2 text-xs text-green-600 cursor-pointer hover:underline">
                Upload Logo
                <input type="file" className="hidden" accept="image/*" onChange={handleHeaderLogoUpload} />
              </label>
            </div>
          )}
          <span className="ml-2 font-bold">Agri Ecosystem Fund</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Beranda
          </Link>
          <Link href="/templates/member-area" className="text-sm font-medium hover:underline underline-offset-4">
            Member Area
          </Link>
          <Link
            href="/templates/trading"
            className="text-sm font-medium text-green-600 hover:underline underline-offset-4"
          >
            Trading
          </Link>
          <Link href="/templates/register" className="text-sm font-medium hover:underline underline-offset-4">
            Daftar
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Trading AGC/Solana</h1>
              <p className="text-gray-500">Beli dan jual AGC Coin dengan mudah dan aman</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
                Riwayat Transaksi
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 font-bold text-xs">AGC</span>
                        </div>
                        AGC/IDR
                      </CardTitle>
                      <CardDescription>Agri Coin / Indonesian Rupiah</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">Rp 105.000</div>
                      <div className="flex items-center text-green-600 text-sm">
                        <ChevronUp className="h-4 w-4 mr-1" />
                        2.5%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Grafik Harga AGC/IDR</span>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <div>
                      <p className="text-gray-500">24h Tertinggi</p>
                      <p className="font-medium">Rp 107.500</p>
                    </div>
                    <div>
                      <p className="text-gray-500">24h Terendah</p>
                      <p className="font-medium">Rp 102.800</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Volume 24h</p>
                      <p className="font-medium">1,250 AGC</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Market Cap</p>
                      <p className="font-medium">Rp 105M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Book</CardTitle>
                  <CardDescription>Daftar order beli dan jual yang tersedia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-green-600">Beli (Bid)</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Rp 104.800</span>
                          <span>2.5 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 104.500</span>
                          <span>5.2 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 104.200</span>
                          <span>8.7 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 104.000</span>
                          <span>12.3 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 103.800</span>
                          <span>15.1 AGC</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-red-600">Jual (Ask)</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Rp 105.200</span>
                          <span>1.8 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 105.500</span>
                          <span>3.5 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 105.800</span>
                          <span>6.2 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 106.000</span>
                          <span>9.5 AGC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rp 106.200</span>
                          <span>14.7 AGC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaksi Terbaru</CardTitle>
                  <CardDescription>Transaksi yang baru saja terjadi di pasar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">14:30:25</span>
                      </div>
                      <span className="text-sm font-medium">Rp 105.000</span>
                      <span className="text-sm">2.5 AGC</span>
                      <span className="text-green-600 text-sm">Beli</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">14:28:10</span>
                      </div>
                      <span className="text-sm font-medium">Rp 105.100</span>
                      <span className="text-sm">1.2 AGC</span>
                      <span className="text-red-600 text-sm">Jual</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">14:25:45</span>
                      </div>
                      <span className="text-sm font-medium">Rp 104.900</span>
                      <span className="text-sm">3.8 AGC</span>
                      <span className="text-green-600 text-sm">Beli</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">14:22:30</span>
                      </div>
                      <span className="text-sm font-medium">Rp 104.800</span>
                      <span className="text-sm">5.0 AGC</span>
                      <span className="text-green-600 text-sm">Beli</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">14:20:15</span>
                      </div>
                      <span className="text-sm font-medium">Rp 105.200</span>
                      <span className="text-sm">2.3 AGC</span>
                      <span className="text-red-600 text-sm">Jual</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Beli/Jual AGC</CardTitle>
                  <CardDescription>Beli dan jual AGC Coin dengan harga terbaik</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger
                        value="buy"
                        className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        onClick={() => setTradeType("buy")}
                      >
                        Beli
                      </TabsTrigger>
                      <TabsTrigger
                        value="sell"
                        className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                        onClick={() => setTradeType("sell")}
                      >
                        Jual
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="orderType">Tipe Order</Label>
                          <Select defaultValue={orderType} onValueChange={setOrderType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="market">Market Order</SelectItem>
                              <SelectItem value="limit">Limit Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {orderType === "limit" && (
                          <div className="space-y-2">
                            <Label htmlFor="price">Harga (IDR)</Label>
                            <Input id="price" placeholder="Masukkan harga" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="amount">Jumlah AGC</Label>
                          <Input
                            id="amount"
                            placeholder="Masukkan jumlah"
                            value={amount}
                            onChange={handleAmountChange}
                          />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Harga Pasar</span>
                          <span>Rp 105.000</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Total</span>
                          <span>Rp {calculateTotal()}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Biaya (0.1%)</span>
                          <span>Rp {((Number.parseFloat(amount) || 0) * 105000 * 0.001).toLocaleString("id-ID")}</span>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full bg-green-600 hover:bg-green-700">Beli AGC</Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="sell" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="orderType">Tipe Order</Label>
                          <Select defaultValue={orderType} onValueChange={setOrderType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="market">Market Order</SelectItem>
                              <SelectItem value="limit">Limit Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {orderType === "limit" && (
                          <div className="space-y-2">
                            <Label htmlFor="price">Harga (IDR)</Label>
                            <Input id="price" placeholder="Masukkan harga" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="amount">Jumlah AGC</Label>
                          <Input
                            id="amount"
                            placeholder="Masukkan jumlah"
                            value={amount}
                            onChange={handleAmountChange}
                          />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Harga Pasar</span>
                          <span>Rp 105.000</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Total</span>
                          <span>Rp {calculateTotal()}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Biaya (0.1%)</span>
                          <span>Rp {((Number.parseFloat(amount) || 0) * 105000 * 0.001).toLocaleString("id-ID")}</span>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full bg-red-600 hover:bg-red-700">Jual AGC</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saldo Anda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 font-bold text-xs">AGC</span>
                        </div>
                        <span>AGC Coin</span>
                      </div>
                      <span className="font-bold">125.8 AGC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-bold text-xs">SOL</span>
                        </div>
                        <span>Solana</span>
                      </div>
                      <span className="font-bold">2.5 SOL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <span className="text-gray-600 font-bold text-xs">IDR</span>
                        </div>
                        <span>Indonesian Rupiah</span>
                      </div>
                      <span className="font-bold">Rp 12.580.000</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline">Deposit</Button>
                    <Button variant="outline">Withdraw</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Aktif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <AlertCircle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="font-medium">Tidak ada order aktif</h3>
                    <p className="text-sm text-gray-500 mt-1">Order Anda akan muncul di sini</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Konversi Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 font-bold text-[10px]">AGC</span>
                        </div>
                        <span className="text-sm">1 AGC</span>
                      </div>
                      <ArrowDownUp className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center">
                        <span className="text-sm">Rp 105.000</span>
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2">
                          <span className="text-gray-600 font-bold text-[10px]">IDR</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 font-bold text-[10px]">AGC</span>
                        </div>
                        <span className="text-sm">1 AGC</span>
                      </div>
                      <ArrowDownUp className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center">
                        <span className="text-sm">0.0025 SOL</span>
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                          <span className="text-blue-600 font-bold text-[10px]">SOL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Agri Ecosystem Fund. Hak Cipta Dilindungi.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Syarat & Ketentuan
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Kebijakan Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}
