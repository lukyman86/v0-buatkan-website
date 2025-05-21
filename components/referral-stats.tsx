"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, Award, Calendar } from "lucide-react"

interface ReferralStatsProps {
  memberId: string
}

export function ReferralStats({ memberId }: ReferralStatsProps) {
  const [period, setPeriod] = useState("all")

  // Data statistik contoh
  const stats = {
    totalReferrals: 23,
    pendingReferrals: 3,
    completedReferrals: 20,
    totalEarnings: 345,
    conversionRate: 87,
  }

  // Data grafik contoh
  const chartData = [
    { name: "Jan", referrals: 2 },
    { name: "Feb", referrals: 3 },
    { name: "Mar", referrals: 1 },
    { name: "Apr", referrals: 4 },
    { name: "Mei", referrals: 5 },
    { name: "Jun", referrals: 2 },
    { name: "Jul", referrals: 3 },
    { name: "Agu", referrals: 1 },
    { name: "Sep", referrals: 0 },
    { name: "Okt", referrals: 2 },
    { name: "Nov", referrals: 0 },
    { name: "Des", referrals: 0 },
  ]

  // Data riwayat referral contoh
  const referralHistory = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      date: "21 Mei 2025",
      status: "completed",
      earnings: 15,
    },
    {
      id: 2,
      name: "Dewi Lestari",
      email: "dewi.lestari@example.com",
      date: "20 Mei 2025",
      status: "completed",
      earnings: 15,
    },
    {
      id: 3,
      name: "Rudi Hermawan",
      email: "rudi.hermawan@example.com",
      date: "19 Mei 2025",
      status: "completed",
      earnings: 15,
    },
    {
      id: 4,
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.com",
      date: "18 Mei 2025",
      status: "completed",
      earnings: 15,
    },
    {
      id: 5,
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@example.com",
      date: "17 Mei 2025",
      status: "pending",
      earnings: 0,
    },
  ]

  // Fungsi untuk mendapatkan kelas badge status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Statistik Referral</CardTitle>
            <CardDescription>Pantau performa link referral Anda</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Waktu</SelectItem>
              <SelectItem value="this-month">Bulan Ini</SelectItem>
              <SelectItem value="last-month">Bulan Lalu</SelectItem>
              <SelectItem value="this-year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Referral</p>
                <h3 className="text-2xl font-bold">{stats.totalReferrals}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tingkat Konversi</p>
                <h3 className="text-2xl font-bold">{stats.conversionRate}%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bonus</p>
                <h3 className="text-2xl font-bold">{stats.totalEarnings} AGC</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Bulan Ini</p>
                <h3 className="text-2xl font-bold">{chartData[4].referrals}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Grafik</TabsTrigger>
            <TabsTrigger value="history">Riwayat Referral</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Referral per Bulan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip
                        formatter={(value) => [`${value} referral`, "Jumlah"]}
                        labelFormatter={(label) => `Bulan: ${label}`}
                      />
                      <Bar dataKey="referrals" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Riwayat Referral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Bonus</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referralHistory.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.name}</TableCell>
                          <TableCell>{referral.email}</TableCell>
                          <TableCell>{referral.date}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                                referral.status,
                              )}`}
                            >
                              {referral.status === "completed" && "Selesai"}
                              {referral.status === "pending" && "Pending"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {referral.earnings > 0 ? `${referral.earnings} AGC` : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">
                    Lihat Semua Riwayat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
