"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Download, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending" | "suspended"
  membershipType: string
  registeredDate: string
  lastLogin: string
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [membershipFilter, setMembershipFilter] = useState<string>("all")

  // Data pengguna contoh
  const users: User[] = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@example.com",
      role: "Member",
      status: "active",
      membershipType: "Gold",
      registeredDate: "21 Mei 2025",
      lastLogin: "21 Mei 2025, 14:30",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.com",
      role: "Member",
      status: "active",
      membershipType: "Silver",
      registeredDate: "20 Mei 2025",
      lastLogin: "21 Mei 2025, 10:15",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      role: "Member",
      status: "pending",
      membershipType: "Basic",
      registeredDate: "19 Mei 2025",
      lastLogin: "-",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi.lestari@example.com",
      role: "Member",
      status: "active",
      membershipType: "Platinum",
      registeredDate: "18 Mei 2025",
      lastLogin: "20 Mei 2025, 16:45",
    },
    {
      id: 5,
      name: "Rudi Hermawan",
      email: "rudi.hermawan@example.com",
      role: "Member",
      status: "active",
      membershipType: "Gold",
      registeredDate: "17 Mei 2025",
      lastLogin: "21 Mei 2025, 09:30",
    },
    {
      id: 6,
      name: "Admin Utama",
      email: "admin@aecofund.com",
      role: "Admin",
      status: "active",
      membershipType: "-",
      registeredDate: "01 Jan 2025",
      lastLogin: "21 Mei 2025, 15:00",
    },
    {
      id: 7,
      name: "Moderator",
      email: "moderator@aecofund.com",
      role: "Moderator",
      status: "active",
      membershipType: "-",
      registeredDate: "15 Jan 2025",
      lastLogin: "20 Mei 2025, 11:20",
    },
  ]

  // Filter pengguna berdasarkan pencarian dan filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesMembership = membershipFilter === "all" || user.membershipType === membershipFilter

    return matchesSearch && matchesStatus && matchesRole && matchesMembership
  })

  const getStatusBadgeClass = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout title="Pengguna">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pengguna</h1>
            <p className="text-gray-500">Kelola semua pengguna di platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
            <CardDescription>Total {users.length} pengguna terdaftar di platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari pengguna..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Ditangguhkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Peran</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Peran</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <Select value={membershipFilter} onValueChange={setMembershipFilter}>
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Keanggotaan</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Keanggotaan</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Platinum">Platinum</SelectItem>
                      <SelectItem value="-">Tidak Ada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setRoleFilter("all")
                    setMembershipFilter("all")
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
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Keanggotaan</TableHead>
                    <TableHead>Terdaftar</TableHead>
                    <TableHead>Login Terakhir</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                        Tidak ada pengguna yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                              user.status,
                            )}`}
                          >
                            {user.status === "active" && "Aktif"}
                            {user.status === "inactive" && "Tidak Aktif"}
                            {user.status === "pending" && "Pending"}
                            {user.status === "suspended" && "Ditangguhkan"}
                          </span>
                        </TableCell>
                        <TableCell>{user.membershipType}</TableCell>
                        <TableCell>{user.registeredDate}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                              <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                              <DropdownMenuItem>Edit Pengguna</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "active" ? (
                                <DropdownMenuItem className="text-yellow-600">Nonaktifkan</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">Aktifkan</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">Hapus Pengguna</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Menampilkan {filteredUsers.length} dari {users.length} pengguna
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
      </div>
    </AdminLayout>
  )
}
