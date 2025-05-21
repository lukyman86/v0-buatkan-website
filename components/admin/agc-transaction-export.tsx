"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Download, FileSpreadsheet, FileText } from "lucide-react"

export function AgcTransactionExport() {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState("csv")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const handleExport = () => {
    // Simulasi export
    console.log("Exporting in format:", format)
    console.log("Date range:", dateRange)

    // Tutup dialog setelah export
    setOpen(false)

    // Reset form
    setFormat("csv")
    setDateRange({ from: undefined, to: undefined })

    // Tampilkan notifikasi sukses (dalam implementasi nyata)
    alert("Data berhasil diexport!")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Data Transaksi</DialogTitle>
          <DialogDescription>Pilih format dan rentang tanggal untuk mengexport data transaksi AGC.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Format File</Label>
            <RadioGroup value={format} onValueChange={setFormat} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center cursor-pointer">
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  CSV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center cursor-pointer">
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-600" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                  <FileText className="mr-2 h-4 w-4 text-red-600" />
                  PDF
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Rentang Tanggal</Label>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
