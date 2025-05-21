"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  Activity,
  DollarSign,
  BarChart3,
  RefreshCw,
  Download,
} from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    // Simulasi refresh data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
            <p className="text-gray-500">Ringkasan dan statistik platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Memperbarui..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Unduh Laporan
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,587</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.5% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 125.8 Juta</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +18.2% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">876</div>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.3% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Ringkasan</TabsTrigger>
              <TabsTrigger value="analytics">Analitik</TabsTrigger>
              <TabsTrigger value="reports">Laporan</TabsTrigger>
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
                  <CardTitle>Statistik Pengguna</CardTitle>
                  <CardDescription>Pertumbuhan pengguna dalam 30 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Grafik Statistik Pengguna</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>Aktivitas pengguna terbaru di platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Ahmad Fauzi</p>
                        <p className="text-sm text-gray-500">Mendaftar sebagai member baru</p>
                      </div>
                      <p className="text-xs text-gray-500">5 menit yang lalu</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Siti Nurhaliza</p>
                        <p className="text-sm text-gray-500">Melakukan deposit Rp 5.000.000</p>
                      </div>
                      <p className="text-xs text-gray-500">15 menit yang lalu</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Budi Santoso</p>
                        <p className="text-sm text-gray-500">Membeli 25 AGC Coin</p>
                      </div>
                      <p className="text-xs text-gray-500">32 menit yang lalu</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Dewi Lestari</p>
                        <p className="text-sm text-gray-500">Mengupgrade keanggotaan ke Gold</p>
                      </div>
                      <p className="text-xs text-gray-500">1 jam yang lalu</p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Rudi Hermawan</p>
                        <p className="text-sm text-gray-500">Menjual 10 AGC Coin</p>
                      </div>
                      <p className="text-xs text-gray-500">2 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-green-600">
                      Lihat Semua Aktivitas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pengguna Terbaru</CardTitle>
                <CardDescription>Daftar pengguna yang baru mendaftar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2 pl-0">Nama</th>
                        <th className="text-left font-medium p-2">Email</th>
                        <th className="text-left font-medium p-2">Keanggotaan</th>
                        <th className="text-left font-medium p-2">Tanggal Daftar</th>
                        <th className="text-left font-medium p-2">Status</th>
                        <th className="text-right font-medium p-2 pr-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 pl-0">Ahmad Fauzi</td>
                        <td className="p-2">ahmad.fauzi@example.com</td>
                        <td className="p-2">Gold</td>
                        <td className="p-2">21 Mei 2025</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Aktif
                          </span>
                        </td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            Detail
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 pl-0">Siti Nurhaliza</td>
                        <td className="p-2">siti.nurhaliza@example.com</td>
                        <td className="p-2">Silver</td>
                        <td className="p-2">20 Mei 2025</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Aktif
                          </span>
                        </td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            Detail
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 pl-0">Budi Santoso</td>
                        <td className="p-2">budi.santoso@example.com</td>
                        <td className="p-2">Basic</td>
                        <td className="p-2">19 Mei 2025</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            Detail
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 pl-0">Dewi Lestari</td>
                        <td className="p-2">dewi.lestari@example.com</td>
                        <td className="p-2">Platinum</td>
                        <td className="p-2">18 Mei 2025</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Aktif
                          </span>
                        </td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            Detail
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 pl-0">Rudi Hermawan</td>
                        <td className="p-2">rudi.hermawan@example.com</td>
                        <td className="p-2">Gold</td>
                        <td className="p-2">17 Mei 2025</td>
                        <td className="p-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Aktif
                          </span>
                        </td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            Detail
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analitik Platform</CardTitle>
                <CardDescription>Statistik dan analisis platform secara keseluruhan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Grafik Analitik Platform</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Keuangan</CardTitle>
                <CardDescription>Ringkasan laporan keuangan platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Grafik Laporan Keuangan</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
