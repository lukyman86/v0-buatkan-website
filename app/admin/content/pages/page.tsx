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
import { Eye, FileText, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react"

interface Page {
  id: number
  title: string
  slug: string
  status: "published" | "draft"
  author: string
  createdAt: string
  updatedAt: string
}

export default function PagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Data halaman contoh
  const pages: Page[] = [
    {
      id: 1,
      title: "Beranda",
      slug: "/",
      status: "published",
      author: "Admin",
      createdAt: "01 Jan 2025",
      updatedAt: "15 Mei 2025",
    },
    {
      id: 2,
      title: "Tentang Kami",
      slug: "/about",
      status: "published",
      author: "Admin",
      createdAt: "01 Jan 2025",
      updatedAt: "10 Mei 2025",
    },
    {
      id: 3,
      title: "Layanan",
      slug: "/services",
      status: "published",
      author: "Admin",
      createdAt: "05 Jan 2025",
      updatedAt: "12 Mei 2025",
    },
    {
      id: 4,
      title: "Kontak",
      slug: "/contact",
      status: "published",
      author: "Admin",
      createdAt: "10 Jan 2025",
      updatedAt: "18 Mei 2025",
    },
    {
      id: 5,
      title: "Syarat & Ketentuan",
      slug: "/terms",
      status: "published",
      author: "Admin",
      createdAt: "15 Jan 2025",
      updatedAt: "20 Apr 2025",
    },
    {
      id: 6,
      title: "Kebijakan Privasi",
      slug: "/privacy",
      status: "published",
      author: "Admin",
      createdAt: "15 Jan 2025",
      updatedAt: "20 Apr 2025",
    },
    {
      id: 7,
      title: "Halaman Baru",
      slug: "/new-page",
      status: "draft",
      author: "Admin",
      createdAt: "19 Mei 2025",
      updatedAt: "19 Mei 2025",
    },
  ]

  // Filter halaman berdasarkan pencarian
  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminLayout title="Halaman">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Halaman</h1>
            <p className="text-gray-500">Kelola halaman statis website</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Halaman
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Halaman</CardTitle>
            <CardDescription>Total {pages.length} halaman di website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari halaman..."
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
                    <TableHead>Judul</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Penulis</TableHead>
                    <TableHead>Dibuat</TableHead>
                    <TableHead>Diperbarui</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        Tidak ada halaman yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            {page.title}
                          </div>
                        </TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              page.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {page.status === "published" ? "Dipublikasikan" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>{page.author}</TableCell>
                        <TableCell>{page.createdAt}</TableCell>
                        <TableCell>{page.updatedAt}</TableCell>
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {page.status === "published" ? (
                                <DropdownMenuItem>Jadikan Draft</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>Publikasikan</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus
                              </DropdownMenuItem>
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
                Menampilkan {filteredPages.length} dari {pages.length} halaman
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
