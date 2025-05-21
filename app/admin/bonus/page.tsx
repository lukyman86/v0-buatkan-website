"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Download, Filter, RefreshCw, Search, Users, Calculator, Calendar, ArrowUpRight } from "lucide-react"

// Definisi tipe data untuk bonus
interface BonusRate {
  type: string
  amount: number
  description: string
}

// Definisi tipe data untuk member
interface Member {
  id: number
  name: string
  email: string
  membershipType: string
  sponsorId: number | null
  sponsorName: string | null
  level1Count: number
  level2Count: number
  level3Count: number
  totalBonus: number
  lastCalculation: string
}

// Definisi tipe data untuk riwayat bonus
interface BonusHistory {
  id: number
  memberId: number
  memberName: string
  bonusType: string
  amount: number
  description: string
  date: string
  status: "pending" | "processed" | "paid"
}

export default function BonusPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [periodFilter, setPeriodFilter] = useState<string>("this-month")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Data tarif bonus
  const bonusRates: BonusRate[] = [
    {
      type: "sponsor",
      amount: 15,
      description: "Bonus Sponsor",
    },
    {
      type: "level1",
      amount: 3,
      description: "Bonus Level 1",
    },
    {
      type: "level2",
      amount: 2,
      description: "Bonus Level 2",
    },
    {
      type: "level3",
      amount: 1,
      description: "Bonus Level 3",
    },
  ]

  // Data member contoh
  const members: Member[] = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@example.com",
      membershipType: "Gold",
      sponsorId: null,
      sponsorName: null,
      level1Count: 5,
      level2Count: 12,
      level3Count: 8,
      totalBonus: 15 * 5 + 3 * 5 + 2 * 12 + 1 * 8,
      lastCalculation: "21 Mei 2025, 14:30",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.com",
      membershipType: "Silver",
      sponsorId: 1,
      sponsorName: "Ahmad Fauzi",
      level1Count: 3,
      level2Count: 5,
      level3Count: 2,
      totalBonus: 15 * 3 + 3 * 3 + 2 * 5 + 1 * 2,
      lastCalculation: "21 Mei 2025, 14:30",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      membershipType: "Basic",
      sponsorId: 1,
      sponsorName: "Ahmad Fauzi",
      level1Count: 2,
      level2Count: 0,
      level3Count: 0,
      totalBonus: 15 * 2 + 3 * 2,
      lastCalculation: "21 Mei 2025, 14:30",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi.lestari@example.com",
      membershipType: "Platinum",
      sponsorId: 1,
      sponsorName: "Ahmad Fauzi",
      level1Count: 4,
      level2Count: 7,
      level3Count: 3,
      totalBonus: 15 * 4 + 3 * 4 + 2 * 7 + 1 * 3,
      lastCalculation: "21 Mei 2025, 14:30",
    },
    {
      id: 5,
      name: "Rudi Hermawan",
      email: "rudi.hermawan@example.com",
      membershipType: "Gold",
      sponsorId: 2,
      sponsorName: "Siti Nurhaliza",
      level1Count: 1,
      level2Count: 3,
      level3Count: 0,
      totalBonus: 15 * 1 + 3 * 1 + 2 * 3,
      lastCalculation: "21 Mei 2025, 14:30",
    },
  ]

  // Data riwayat bonus contoh
  const bonusHistory: BonusHistory[] = [
    {
      id: 1,
      memberId: 1,
      memberName: "Ahmad Fauzi",
      bonusType: "sponsor",
      amount: 15,
      description: "Bonus sponsor untuk member Siti Nurhaliza",
      date: "10 Mei 2025",
      status: "paid",
    },
    {
      id: 2,
      memberId: 1,
      memberName: "Ahmad Fauzi",
      bonusType: "sponsor",
      amount: 15,
      description: "Bonus sponsor untuk member Budi Santoso",
      date: "12 Mei 2025",
      status: "paid",
    },
    {
      id: 3,
      memberId: 1,
      memberName: "Ahmad Fauzi",
      bonusType: "sponsor",
      amount: 15,
      description: "Bonus sponsor untuk member Dewi Lestari",
      date: "15 Mei 2025",
      status: "paid",
    },
    {
      id: 4,
      memberId: 1,
      memberName: "Ahmad Fauzi",
      bonusType: "level1",
      amount: 3,
      description: "Bonus level 1 dari aktivitas Siti Nurhaliza",
      date: "18 Mei 2025",
      status: "paid",
    },
    {
      id: 5,
      memberId: 2,
      memberName: "Siti Nurhaliza",
      bonusType: "sponsor",
      amount: 15,
      description: "Bonus sponsor untuk member Rudi Hermawan",
      date: "19 Mei 2025",
      status: "paid",
    },
    {
      id: 6,
      memberId: 1,
      memberName: "Ahmad Fauzi",
      bonusType: "level2",
      amount: 2,
      description: "Bonus level 2 dari aktivitas Rudi Hermawan",
      date: "20 Mei 2025",
      status: "pending",
    },
    {
      id: 7,
      memberId: 3,
      memberName: "Budi Santoso",
      bonusType: "level1",
      amount: 3,
      description: "Bonus level 1 dari aktivitas downline",
      date: "21 Mei 2025",
      status: "pending",
    },
  ]

  // Filter member berdasarkan pencarian
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter riwayat bonus berdasarkan status dan periode
  const filteredBonusHistory = bonusHistory.filter((history) => {
    const matchesStatus = statusFilter === "all" || history.status === statusFilter

    // Filter berdasarkan periode (implementasi sederhana)
    let matchesPeriod = true
    if (periodFilter === "this-month") {
      // Anggap semua data di bulan ini
      matchesPeriod = true
    } else if (periodFilter === "last-month") {
      // Implementasi filter bulan lalu
      matchesPeriod = false
    } else if (periodFilter === "this-year") {
      // Anggap semua data di tahun ini
      matchesPeriod = true
    }

    return matchesStatus && matchesPeriod
  })

  // Fungsi untuk menghitung bonus
  const calculateBonus = () => {
    setIsCalculating(true)
    // Simulasi perhitungan bonus
    setTimeout(() => {
      setIsCalculating(false)
      alert("Perhitungan bonus berhasil dilakukan!")
    }, 2000)
  }

  // Fungsi untuk refresh data
  const refreshData = () => {
    setIsLoading(true)
    // Simulasi refresh data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Fungsi untuk mendapatkan kelas badge status
  const getStatusBadgeClass = (status: BonusHistory["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout title="Bonus Member">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bonus Member</h1>
            <p className="text-gray-500">Kelola dan hitung bonus untuk member</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Memperbarui..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              size="sm"
              className="h-9 bg-green-600 hover:bg-green-700"
              onClick={calculateBonus}
              disabled={isCalculating}
            >
              <Calculator className="mr-2 h-4 w-4" />
              {isCalculating ? "Menghitung..." : "Hitung Bonus"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bonus Dibagikan</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">325 AGC</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +15% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bonus Sponsor</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">225 AGC</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bonus Level</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100 AGC</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8% dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perhitungan Terakhir</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21 Mei 2025</div>
              <p className="text-xs text-gray-500 mt-1">14:30 WIB</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tarif Bonus</CardTitle>
            <CardDescription>Pengaturan tarif bonus untuk setiap level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis Bonus</TableHead>
                    <TableHead>Jumlah (AGC)</TableHead>
                    <TableHead>Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bonusRates.map((rate) => (
                    <TableRow key={rate.type}>
                      <TableCell className="font-medium">
                        {rate.type === "sponsor" && "Bonus Sponsor"}
                        {rate.type === "level1" && "Bonus Level 1"}
                        {rate.type === "level2" && "Bonus Level 2"}
                        {rate.type === "level3" && "Bonus Level 3"}
                      </TableCell>
                      <TableCell>{rate.amount} AGC</TableCell>
                      <TableCell>{rate.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Member</TabsTrigger>
            <TabsTrigger value="history">Riwayat Bonus</TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Member dan Bonus</CardTitle>
                <CardDescription>Daftar member dan perhitungan bonus mereka</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Cari member..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Keanggotaan</TableHead>
                        <TableHead>Sponsor</TableHead>
                        <TableHead>Level 1</TableHead>
                        <TableHead>Level 2</TableHead>
                        <TableHead>Level 3</TableHead>
                        <TableHead>Total Bonus</TableHead>
                        <TableHead>Terakhir Dihitung</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                            Tidak ada member yang ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.membershipType}</TableCell>
                            <TableCell>{member.sponsorName || "-"}</TableCell>
                            <TableCell>{member.level1Count} member</TableCell>
                            <TableCell>{member.level2Count} member</TableCell>
                            <TableCell>{member.level3Count} member</TableCell>
                            <TableCell className="font-medium">{member.totalBonus} AGC</TableCell>
                            <TableCell>{member.lastCalculation}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Menampilkan {filteredMembers.length} dari {members.length} member
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Sebelumnya
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-50">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Bonus</CardTitle>
                <CardDescription>Riwayat pemberian bonus kepada member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Cari riwayat bonus..." className="pl-8" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Status</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processed">Diproses</SelectItem>
                          <SelectItem value="paid">Dibayar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center">
                      <Select value={periodFilter} onValueChange={setPeriodFilter}>
                        <SelectTrigger className="w-[150px]">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Periode</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="this-month">Bulan Ini</SelectItem>
                          <SelectItem value="last-month">Bulan Lalu</SelectItem>
                          <SelectItem value="this-year">Tahun Ini</SelectItem>
                          <SelectItem value="custom">Kustom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatusFilter("all")
                        setPeriodFilter("this-month")
                      }}
                    >
                      Reset Filter
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Jenis Bonus</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBonusHistory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                            Tidak ada riwayat bonus yang ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBonusHistory.map((history) => (
                          <TableRow key={history.id}>
                            <TableCell>#{history.id}</TableCell>
                            <TableCell className="font-medium">{history.memberName}</TableCell>
                            <TableCell>
                              {history.bonusType === "sponsor" && "Bonus Sponsor"}
                              {history.bonusType === "level1" && "Bonus Level 1"}
                              {history.bonusType === "level2" && "Bonus Level 2"}
                              {history.bonusType === "level3" && "Bonus Level 3"}
                            </TableCell>
                            <TableCell>{history.amount} AGC</TableCell>
                            <TableCell>{history.description}</TableCell>
                            <TableCell>{history.date}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                                  history.status,
                                )}`}
                              >
                                {history.status === "paid" && "Dibayar"}
                                {history.status === "pending" && "Pending"}
                                {history.status === "processed" && "Diproses"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Menampilkan {filteredBonusHistory.length} dari {bonusHistory.length} riwayat bonus
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Sebelumnya
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-50">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Perhitungan Bonus</CardTitle>
            <CardDescription>Penjelasan tentang cara perhitungan bonus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4 bg-gray-50">
                <h3 className="text-lg font-medium mb-2">Rumus Perhitungan Bonus</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Bonus dihitung berdasarkan struktur jaringan member dengan tarif sebagai berikut:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-medium mr-2">
                      1
                    </span>
                    <span>
                      <strong>Bonus Sponsor</strong>: 15 Agri Coins untuk setiap member yang disponsori langsung
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-medium mr-2">
                      2
                    </span>
                    <span>
                      <strong>Bonus Level 1</strong>: 3 Agri Coins untuk setiap member di level 1 (downline langsung)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-medium mr-2">
                      3
                    </span>
                    <span>
                      <strong>Bonus Level 2</strong>: 2 Agri Coins untuk setiap member di level 2
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-medium mr-2">
                      4
                    </span>
                    <span>
                      <strong>Bonus Level 3</strong>: 1 Agri Coin untuk setiap member di level 3
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-2">Contoh Perhitungan</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Berikut adalah contoh perhitungan bonus untuk member Ahmad Fauzi:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Bonus Sponsor (5 member × 15 AGC)</span>
                    <span className="font-medium">75 AGC</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Bonus Level 1 (5 member × 3 AGC)</span>
                    <span className="font-medium">15 AGC</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Bonus Level 2 (12 member × 2 AGC)</span>
                    <span className="font-medium">24 AGC</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Bonus Level 3 (8 member × 1 AGC)</span>
                    <span className="font-medium">8 AGC</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Total Bonus</span>
                    <span>122 AGC</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4 bg-yellow-50">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-800 font-medium mr-2">
                    !
                  </span>
                  Catatan Penting
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Perhitungan bonus dilakukan setiap akhir bulan</li>
                  <li>• Bonus akan ditransfer ke saldo Agri Coins member pada tanggal 5 bulan berikutnya</li>
                  <li>• Minimal penarikan bonus adalah 10 Agri Coins</li>
                  <li>• Member harus aktif untuk menerima bonus</li>
                  <li>• Bonus yang tidak diklaim dalam 6 bulan akan hangus</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
