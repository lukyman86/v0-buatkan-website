"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AgcTransactionTable } from "@/components/admin/agc-transaction-table"
import { AgcTransactionFilter } from "@/components/admin/agc-transaction-filter"
import { AgcTransactionExport } from "@/components/admin/agc-transaction-export"
import { AgcTransactionStats } from "@/components/admin/agc-transaction-stats"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { RefreshCw } from "lucide-react"

export default function AgcTransactionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Dummy data untuk statistik
  const stats = {
    totalTransactions: 156,
    pendingTransactions: 12,
    completedTransactions: 132,
    failedTransactions: 12,
    totalDeposit: 5432.12345678,
    totalWithdraw: 2345.87654321,
    totalTransfer: 1234.56789012,
    totalFees: 87.65432109,
  }

  // Handle approve transaction
  const handleApprove = (id: string) => {
    console.log("Approve transaction:", id)
    // Implementasi nyata: panggil API untuk menyetujui transaksi
  }

  // Handle reject transaction
  const handleReject = (id: string) => {
    console.log("Reject transaction:", id)
    // Implementasi nyata: panggil API untuk menolak transaksi
  }

  // Handle filter
  const handleFilter = (filters: any) => {
    console.log("Apply filters:", filters)
    // Implementasi nyata: panggil API dengan filter
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Handle reset filter
  const handleResetFilter = () => {
    console.log("Reset filters")
    // Implementasi nyata: panggil API tanpa filter
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Handle refresh
  const handleRefresh = () => {
    console.log("Refresh data")
    // Implementasi nyata: panggil API untuk mendapatkan data terbaru
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <AdminLayout title="Transaksi AGC">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Transaksi AGC</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <AgcTransactionExport />
          </div>
        </div>

        <AgcTransactionStats {...stats} />

        <AgcTransactionFilter onFilter={handleFilter} onReset={handleResetFilter} />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu ({stats.pendingTransactions})</TabsTrigger>
            <TabsTrigger value="completed">Berhasil ({stats.completedTransactions})</TabsTrigger>
            <TabsTrigger value="failed">Gagal ({stats.failedTransactions})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <AgcTransactionTable onApprove={handleApprove} onReject={handleReject} />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <AgcTransactionTable onApprove={handleApprove} onReject={handleReject} />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <AgcTransactionTable onApprove={handleApprove} onReject={handleReject} />
          </TabsContent>
          <TabsContent value="failed" className="mt-4">
            <AgcTransactionTable onApprove={handleApprove} onReject={handleReject} />
          </TabsContent>
        </Tabs>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AdminLayout>
  )
}
