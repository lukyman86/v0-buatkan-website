"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Bank, DepositFormData } from "@/types/deposit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

// Dummy data untuk bank
const BANKS: Bank[] = [
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "PT. AGC Indonesia",
    logo: "/placeholder.svg?height=40&width=80",
  },
  {
    id: "bni",
    name: "Bank Negara Indonesia (BNI)",
    accountNumber: "0987654321",
    accountName: "PT. AGC Indonesia",
    logo: "/placeholder.svg?height=40&width=80",
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    accountNumber: "1122334455",
    accountName: "PT. AGC Indonesia",
    logo: "/placeholder.svg?height=40&width=80",
  },
  {
    id: "bri",
    name: "Bank Rakyat Indonesia (BRI)",
    accountNumber: "5544332211",
    accountName: "PT. AGC Indonesia",
    logo: "/placeholder.svg?height=40&width=80",
  },
]

// Minimal deposit amount
const MIN_DEPOSIT = 100000 // Rp 100.000

export function DepositForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<1 | 2>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<DepositFormData>({
    amount: MIN_DEPOSIT,
    bankId: BANKS[0].id,
    referenceNumber: "",
  })
  const [proofImagePreview, setProofImagePreview] = useState<string | null>(null)

  const selectedBank = BANKS.find((bank) => bank.id === formData.bankId)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setFormData((prev) => ({ ...prev, amount: isNaN(value) ? 0 : value }))
  }

  const handleBankChange = (value: string) => {
    setFormData((prev) => ({ ...prev, bankId: value }))
  }

  const handleReferenceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, referenceNumber: e.target.value }))
  }

  const handleProofImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, proofImage: file }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNextStep = () => {
    // Validate form
    if (formData.amount < MIN_DEPOSIT) {
      toast({
        title: "Jumlah deposit terlalu kecil",
        description: `Minimal deposit adalah ${formatCurrency(MIN_DEPOSIT, "IDR")}`,
        variant: "destructive",
      })
      return
    }

    setStep(2)
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.referenceNumber) {
      toast({
        title: "Nomor referensi diperlukan",
        description: "Silakan masukkan nomor referensi transfer",
        variant: "destructive",
      })
      return
    }

    if (!formData.proofImage) {
      toast({
        title: "Bukti transfer diperlukan",
        description: "Silakan unggah bukti transfer",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate random ID
      const depositId = Math.random().toString(36).substring(2, 15)

      // Redirect to confirmation page
      router.push(`/deposit/confirmation/${depositId}`)

      toast({
        title: "Deposit berhasil diajukan",
        description: "Tim kami akan memverifikasi deposit Anda segera",
      })
    } catch (error) {
      toast({
        title: "Gagal mengajukan deposit",
        description: "Terjadi kesalahan saat mengajukan deposit. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Deposit Dana</CardTitle>
        <CardDescription>Tambahkan dana ke akun Anda melalui transfer bank</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Jumlah Deposit (IDR)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={MIN_DEPOSIT}
                  step={10000}
                  value={formData.amount}
                  onChange={handleAmountChange}
                  required
                />
                <p className="text-sm text-muted-foreground">Minimal deposit: {formatCurrency(MIN_DEPOSIT, "IDR")}</p>
              </div>

              <div className="space-y-2">
                <Label>Pilih Bank Tujuan</Label>
                <RadioGroup value={formData.bankId} onValueChange={handleBankChange}>
                  <div className="space-y-4">
                    {BANKS.map((bank) => (
                      <div key={bank.id} className="flex items-center space-x-3 border rounded-lg p-3">
                        <RadioGroupItem value={bank.id} id={`bank-${bank.id}`} />
                        <Label htmlFor={`bank-${bank.id}`} className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-20 h-10 relative">
                              <Image
                                src={bank.logo || "/placeholder.svg?height=40&width=80"}
                                alt={bank.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{bank.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {bank.accountNumber} - {bank.accountName}
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Detail Transfer</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Jumlah:</p>
                  <p className="font-medium">{formatCurrency(formData.amount, "IDR")}</p>

                  <p className="text-muted-foreground">Bank Tujuan:</p>
                  <p className="font-medium">{selectedBank?.name}</p>

                  <p className="text-muted-foreground">Nomor Rekening:</p>
                  <p className="font-medium">{selectedBank?.accountNumber}</p>

                  <p className="text-muted-foreground">Atas Nama:</p>
                  <p className="font-medium">{selectedBank?.accountName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceNumber">Nomor Referensi Transfer</Label>
                <Input
                  id="referenceNumber"
                  placeholder="Contoh: 123456789"
                  value={formData.referenceNumber}
                  onChange={handleReferenceNumberChange}
                  required
                />
                <p className="text-sm text-muted-foreground">Masukkan nomor referensi dari bukti transfer Anda</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofImage">Bukti Transfer</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("proofImage")?.click()}
                    className="w-full"
                  >
                    Pilih File
                  </Button>
                  <Input
                    id="proofImage"
                    type="file"
                    accept="image/*"
                    onChange={handleProofImageChange}
                    className="hidden"
                  />
                  {formData.proofImage && <span className="text-sm">{formData.proofImage.name}</span>}
                </div>
                {proofImagePreview && (
                  <div className="mt-4 relative w-full h-64 border rounded-lg overflow-hidden">
                    <Image
                      src={proofImagePreview || "/placeholder.svg"}
                      alt="Bukti transfer"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Unggah bukti transfer Anda (JPG, PNG, atau PDF)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Textarea id="notes" placeholder="Tambahkan catatan jika diperlukan" rows={3} />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 ? (
          <div className="w-full">
            <Button onClick={handleNextStep} className="w-full">
              Lanjutkan
            </Button>
          </div>
        ) : (
          <div className="flex w-full gap-4">
            <Button variant="outline" onClick={handlePrevStep} disabled={isSubmitting}>
              Kembali
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Memproses..." : "Ajukan Deposit"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
