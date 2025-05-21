"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Mountain,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  User,
  Home,
  PieChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { useNotifications } from "@/contexts/notification-context"

export default function MemberArea() {
  const [headerLogo, setHeaderLogo] = useState<string | null>(null)
  const { addNotification } = useNotifications()

  const handleHeaderLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setHeaderLogo(logoUrl)
    }
  }

  // Menambahkan beberapa notifikasi contoh saat komponen dimuat
  useEffect(() => {
    // Cek apakah ini pertama kali memuat halaman
    const isFirstLoad = sessionStorage.getItem("memberAreaLoaded") === null

    if (isFirstLoad) {
      // Tandai bahwa halaman sudah dimuat
      sessionStorage.setItem("memberAreaLoaded", "true")

      // Tambahkan notifikasi contoh dengan jeda waktu
      setTimeout(() => {
        addNotification({
          title: "Selamat datang kembali!",
          message: "Selamat datang di dashboard member Agri Ecosystem Fund.",
          type: "info",
        })
      }, 1000)

      setTimeout(() => {
        addNotification({
          title: "Transaksi Berhasil",
          message: "Pembelian 25 AGC Coin telah berhasil diproses.",
          type: "success",
          link: "/transactions/123",
        })
      }, 3000)

      setTimeout(() => {
        addNotification({
          title: "Downline Baru",
          message: "Ahmad Rizki telah bergabung sebagai downline Anda.",
          type: "info",
          link: "/network",
        })
      }, 5000)

      setTimeout(() => {
        addNotification({
          title: "Harga AGC Naik",
          message: "Harga AGC Coin naik 2.5% dalam 24 jam terakhir.",
          type: "transaction",
          link: "/trading",
        })
      }, 7000)
    }
  }, [addNotification])

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
        <div className="ml-auto flex items-center gap-4">
          <NotificationDropdown />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r bg-gray-50 p-4">
          <nav className="grid gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 bg-gray-100 text-gray-900"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Wallet className="h-4 w-4" />
              Wallet
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Activity className="h-4 w-4" />
              Transaksi
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
              Jaringan
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <BarChart3 className="h-4 w-4" />
              Statistik
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Bell className="h-4 w-4" />
              Notifikasi
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Pengaturan
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <HelpCircle className="h-4 w-4" />
              Bantuan
            </Link>
          </nav>
          <div className="mt-auto">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status Keanggotaan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Gold Member</span>
                  <span className="text-xs text-gray-500">1 tahun</span>
                </div>
                <Progress value={75} className="h-2 mt-2" />
                <p className="text-xs text-gray-500 mt-2">Berakhir: 21 Mei 2026</p>
                <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-xs h-8">Perpanjang</Button>
              </CardContent>
            </Card>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Selamat datang, Ahmad Fauzi</h1>
                <p className="text-gray-500">Lihat ringkasan akun dan aktivitas Anda</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Laporan
                </Button>
                <Button
                  size="sm"
                  className="h-9 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    addNotification({
                      title: "Top Up Berhasil",
                      message: "Permintaan top up saldo Anda sedang diproses.",
                      type: "success",
                    })
                  }}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Top Up Saldo
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp 12.580.000</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.5% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total AGC Coin</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">125.8 AGC</div>
                  <p className="text-xs text-red-500 flex items-center mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -0.8% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Downline Aktif</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Komisi Bulan Ini</CardTitle>
                  <Activity className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp 1.250.000</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                  <TabsTrigger value="transactions">Transaksi</TabsTrigger>
                  <TabsTrigger value="network">Jaringan</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Urutkan
                  </Button>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Aktivitas Saldo</CardTitle>
                      <CardDescription>Pergerakan saldo dalam 30 hari terakhir</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                        <PieChart className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">Grafik Aktivitas Saldo</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Struktur Jaringan</CardTitle>
                      <CardDescription>Pertumbuhan jaringan Anda</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-full flex items-center gap-2">
                            <span className="text-sm font-medium">Level 1</span>
                            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-green-600 h-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="text-sm font-medium">15/20</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full flex items-center gap-2">
                            <span className="text-sm font-medium">Level 2</span>
                            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-green-600 h-full" style={{ width: "45%" }}></div>
                            </div>
                            <span className="text-sm font-medium">9/20</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full flex items-center gap-2">
                            <span className="text-sm font-medium">Level 3</span>
                            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-green-600 h-full" style={{ width: "0%" }}></div>
                            </div>
                            <span className="text-sm font-medium">0/20</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              addNotification({
                                title: "Jaringan Diperbarui",
                                message: "Data jaringan Anda telah diperbarui.",
                                type: "info",
                                link: "/network",
                              })
                            }}
                          >
                            Lihat Detail Jaringan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaksi Terbaru</CardTitle>
                    <CardDescription>Transaksi yang terjadi dalam 7 hari terakhir</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Pembelian AGC Coin</p>
                            <p className="text-sm text-gray-500">20 Mei 2025, 14:30</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+25 AGC</p>
                          <p className="text-sm text-gray-500">Rp 2.500.000</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Penjualan AGC Coin</p>
                            <p className="text-sm text-gray-500">18 Mei 2025, 09:15</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">-10 AGC</p>
                          <p className="text-sm text-gray-500">Rp 1.050.000</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Komisi Referral</p>
                            <p className="text-sm text-gray-500">17 Mei 2025, 16:45</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+Rp 350.000</p>
                          <p className="text-sm text-gray-500">Dari: Ahmad Rizki</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Top Up Saldo</p>
                            <p className="text-sm text-gray-500">15 Mei 2025, 10:20</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+Rp 5.000.000</p>
                          <p className="text-sm text-gray-500">Transfer Bank</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        variant="link"
                        className="text-green-600"
                        onClick={() => {
                          addNotification({
                            title: "Riwayat Transaksi",
                            message: "Melihat semua riwayat transaksi Anda.",
                            type: "transaction",
                            link: "/transactions",
                          })
                        }}
                      >
                        Lihat Semua Transaksi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Riwayat Transaksi</CardTitle>
                    <CardDescription>Semua transaksi yang telah Anda lakukan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Pembelian AGC Coin</p>
                            <p className="text-sm text-gray-500">20 Mei 2025, 14:30</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+25 AGC</p>
                          <p className="text-sm text-gray-500">Rp 2.500.000</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Penjualan AGC Coin</p>
                            <p className="text-sm text-gray-500">18 Mei 2025, 09:15</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">-10 AGC</p>
                          <p className="text-sm text-gray-500">Rp 1.050.000</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Komisi Referral</p>
                            <p className="text-sm text-gray-500">17 Mei 2025, 16:45</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+Rp 350.000</p>
                          <p className="text-sm text-gray-500">Dari: Ahmad Rizki</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Top Up Saldo</p>
                            <p className="text-sm text-gray-500">15 Mei 2025, 10:20</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+Rp 5.000.000</p>
                          <p className="text-sm text-gray-500">Transfer Bank</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Pembelian AGC Coin</p>
                            <p className="text-sm text-gray-500">10 Mei 2025, 13:45</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+15 AGC</p>
                          <p className="text-sm text-gray-500">Rp 1.500.000</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-2 rounded-full">
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Penarikan Saldo</p>
                            <p className="text-sm text-gray-500">5 Mei 2025, 11:30</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">-Rp 2.000.000</p>
                          <p className="text-sm text-gray-500">Transfer Bank</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="mx-1">
                        Sebelumnya
                      </Button>
                      <Button variant="outline" className="mx-1 bg-green-50">
                        1
                      </Button>
                      <Button variant="outline" className="mx-1">
                        2
                      </Button>
                      <Button variant="outline" className="mx-1">
                        3
                      </Button>
                      <Button variant="outline" className="mx-1">
                        Selanjutnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="network" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Struktur Jaringan</CardTitle>
                    <CardDescription>Visualisasi jaringan referral Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Diagram Struktur Jaringan</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Downline</CardTitle>
                    <CardDescription>Anggota yang bergabung melalui referral Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Ahmad Rizki</p>
                            <p className="text-sm text-gray-500">Level 1 • Bergabung: 10 Mei 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Gold Member</p>
                          <p className="text-sm text-green-600">5 downline</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Siti Nurhaliza</p>
                            <p className="text-sm text-gray-500">Level 1 • Bergabung: 8 Mei 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Silver Member</p>
                          <p className="text-sm text-green-600">2 downline</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Budi Santoso</p>
                            <p className="text-sm text-gray-500">Level 1 • Bergabung: 5 Mei 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Basic Member</p>
                          <p className="text-sm text-green-600">0 downline</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Dewi Lestari</p>
                            <p className="text-sm text-gray-500">Level 1 • Bergabung: 1 Mei 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Platinum Member</p>
                          <p className="text-sm text-green-600">8 downline</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="mx-1">
                        Sebelumnya
                      </Button>
                      <Button variant="outline" className="mx-1 bg-green-50">
                        1
                      </Button>
                      <Button variant="outline" className="mx-1">
                        2
                      </Button>
                      <Button variant="outline" className="mx-1">
                        3
                      </Button>
                      <Button variant="outline" className="mx-1">
                        Selanjutnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Agri Ecosystem Fund. Hak Cipta Dilindungi.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Syarat &amp; Ketentuan
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Kebijakan Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}
