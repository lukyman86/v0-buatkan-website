"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, RefreshCw, Users } from "lucide-react"
import { NetworkTree } from "@/components/admin/network-tree"

// Definisi tipe data untuk node jaringan
interface NetworkNode {
  id: number
  name: string
  email: string
  membershipType: string
  level: number
  children: NetworkNode[]
  totalDownline: number
}

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

  // Data jaringan contoh
  const networkData: NetworkNode = {
    id: 1,
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    membershipType: "Gold",
    level: 0,
    totalDownline: 25,
    children: [
      {
        id: 2,
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@example.com",
        membershipType: "Silver",
        level: 1,
        totalDownline: 10,
        children: [
          {
            id: 5,
            name: "Rudi Hermawan",
            email: "rudi.hermawan@example.com",
            membershipType: "Gold",
            level: 2,
            totalDownline: 4,
            children: [
              {
                id: 8,
                name: "Anita Wijaya",
                email: "anita.wijaya@example.com",
                membershipType: "Basic",
                level: 3,
                totalDownline: 0,
                children: [],
              },
              {
                id: 9,
                name: "Hendra Gunawan",
                email: "hendra.gunawan@example.com",
                membershipType: "Silver",
                level: 3,
                totalDownline: 0,
                children: [],
              },
            ],
          },
          {
            id: 6,
            name: "Nina Septiani",
            email: "nina.septiani@example.com",
            membershipType: "Basic",
            level: 2,
            totalDownline: 2,
            children: [
              {
                id: 10,
                name: "Dodi Pratama",
                email: "dodi.pratama@example.com",
                membershipType: "Basic",
                level: 3,
                totalDownline: 0,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Budi Santoso",
        email: "budi.santoso@example.com",
        membershipType: "Basic",
        level: 1,
        totalDownline: 2,
        children: [
          {
            id: 7,
            name: "Rina Marlina",
            email: "rina.marlina@example.com",
            membershipType: "Basic",
            level: 2,
            totalDownline: 0,
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: "Dewi Lestari",
        email: "dewi.lestari@example.com",
        membershipType: "Platinum",
        level: 1,
        totalDownline: 8,
        children: [
          {
            id: 11,
            name: "Joko Widodo",
            email: "joko.widodo@example.com",
            membershipType: "Gold",
            level: 2,
            totalDownline: 3,
            children: [],
          },
          {
            id: 12,
            name: "Sri Mulyani",
            email: "sri.mulyani@example.com",
            membershipType: "Silver",
            level: 2,
            totalDownline: 2,
            children: [],
          },
        ],
      },
    ],
  }

  // Fungsi untuk refresh data
  const refreshData = () => {
    setIsLoading(true)
    // Simulasi refresh data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Fungsi untuk mencari node berdasarkan ID
  const findNodeById = (node: NetworkNode, id: number): NetworkNode | null => {
    if (node.id === id) {
      return node
    }

    for (const child of node.children) {
      const found = findNodeById(child, id)
      if (found) {
        return found
      }
    }

    return null
  }

  // Mendapatkan node yang dipilih
  const selectedNode = selectedMemberId ? findNodeById(networkData, selectedMemberId) : networkData

  return (
    <AdminLayout title="Jaringan">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Struktur Jaringan</h1>
            <p className="text-gray-500">Visualisasi struktur jaringan member</p>
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
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Member</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-gray-500 mt-1">Aktif di jaringan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level 1</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-gray-500 mt-1">Member di level 1</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level 2</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">356</div>
              <p className="text-xs text-gray-500 mt-1">Member di level 2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level 3</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">768</div>
              <p className="text-xs text-gray-500 mt-1">Member di level 3</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tree">
          <TabsList>
            <TabsTrigger value="tree">Pohon Jaringan</TabsTrigger>
            <TabsTrigger value="list">Daftar Jaringan</TabsTrigger>
          </TabsList>
          <TabsContent value="tree" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visualisasi Jaringan</CardTitle>
                <CardDescription>
                  {selectedMemberId && selectedMemberId !== networkData.id
                    ? `Menampilkan jaringan untuk member: ${selectedNode?.name || ""}`
                    : "Menampilkan seluruh struktur jaringan"}
                </CardDescription>
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
                  {selectedMemberId && selectedMemberId !== networkData.id && (
                    <Button variant="outline" onClick={() => setSelectedMemberId(null)}>
                      Kembali ke Jaringan Utama
                    </Button>
                  )}
                </div>

                <div className="border rounded-lg p-4 overflow-auto">
                  <div className="min-h-[500px] flex items-center justify-center">
                    <NetworkTree data={selectedNode || networkData} onNodeSelect={(id) => setSelectedMemberId(id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Jaringan</CardTitle>
                <CardDescription>Daftar member dalam struktur jaringan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-medium">Daftar Jaringan</h3>
                  <p className="text-sm text-gray-500 mt-1">Fitur ini akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Bonus Jaringan</CardTitle>
            <CardDescription>Penjelasan tentang struktur bonus jaringan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4 bg-gray-50">
                <h3 className="text-lg font-medium mb-2">Struktur Bonus Jaringan</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Bonus jaringan dihitung berdasarkan struktur level sebagai berikut:
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
                <h3 className="text-lg font-medium mb-2">Ketentuan Jaringan</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Setiap member dapat mensponsori member baru tanpa batas</li>
                  <li>• Struktur jaringan maksimal hingga level 3 untuk perhitungan bonus</li>
                  <li>• Member harus aktif untuk mendapatkan bonus jaringan</li>
                  <li>• Bonus jaringan dihitung setiap akhir bulan</li>
                  <li>• Bonus akan ditransfer ke saldo Agri Coins member pada tanggal 5 bulan berikutnya</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
