"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Mountain, UserCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Register() {
  const searchParams = useSearchParams()
  const [headerLogo, setHeaderLogo] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [referralCode, setReferralCode] = useState("")
  const [referrerInfo, setReferrerInfo] = useState<{ name: string; id: string } | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    referralCode: "",
    membershipType: "basic",
    agreeTerms: false,
  })

  // Mengambil kode referral dari URL jika ada
  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) {
      setReferralCode(ref)
      setFormData((prev) => ({ ...prev, referralCode: ref }))

      // Simulasi mendapatkan info referrer dari API
      fetchReferrerInfo(ref)
    }
  }, [searchParams])

  // Simulasi mendapatkan info referrer
  const fetchReferrerInfo = async (code: string) => {
    // Dalam implementasi nyata, ini akan menjadi panggilan API ke server
    // Untuk demo, kita gunakan data statis
    setTimeout(() => {
      if (code === "USR12345" || code === "ahmadfauzi") {
        setReferrerInfo({
          name: "Ahmad Fauzi",
          id: "USR12345",
        })
      } else if (code.length > 5) {
        // Simulasi referrer ditemukan jika kode cukup panjang
        setReferrerInfo({
          name: "Member Agri Ecosystem",
          id: code,
        })
      }
    }, 500)
  }

  const handleHeaderLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setHeaderLogo(logoUrl)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReferralCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReferralCode(value)
    setFormData((prev) => ({ ...prev, referralCode: value }))

    if (value.length > 3) {
      fetchReferrerInfo(value)
    } else {
      setReferrerInfo(null)
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, membershipType: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi logika pendaftaran di sini
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.")
    // Redirect ke halaman login atau dashboard
  }

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
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Beranda
          </Link>
          <Link href="/templates/member-area" className="text-sm font-medium hover:underline underline-offset-4">
            Member Area
          </Link>
          <Link href="/templates/trading" className="text-sm font-medium hover:underline underline-offset-4">
            Trading
          </Link>
          <Link
            href="/templates/register"
            className="text-sm font-medium text-green-600 hover:underline underline-offset-4"
          >
            Daftar
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 bg-gradient-to-br from-green-50 via-green-100 to-emerald-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Daftar Member Baru</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Bergabunglah dengan komunitas Agri Ecosystem Fund dan mulai perjalanan investasi Anda.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            {referrerInfo && (
              <div className="mb-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Anda diundang oleh {referrerInfo.name}</p>
                      <p className="text-sm text-green-600">Kode referral: {referralCode}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${step >= 1 ? "text-green-600" : "text-gray-500"}`}>
                    Informasi Pribadi
                  </p>
                </div>
              </div>
              <div className="w-16 h-1 bg-gray-200">
                <div className={`h-full ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${step >= 2 ? "text-green-600" : "text-gray-500"}`}>
                    Detail Alamat
                  </p>
                </div>
              </div>
              <div className="w-16 h-1 bg-gray-200">
                <div className={`h-full ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > 3 ? <Check className="h-5 w-5" /> : "3"}
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${step >= 3 ? "text-green-600" : "text-gray-500"}`}>Keanggotaan</p>
                </div>
              </div>
            </div>

            <Card className="border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Informasi Pribadi"}
                  {step === 2 && "Detail Alamat"}
                  {step === 3 && "Pilih Keanggotaan"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Masukkan informasi pribadi Anda untuk mendaftar"}
                  {step === 2 && "Masukkan detail alamat Anda"}
                  {step === 3 && "Pilih jenis keanggotaan dan selesaikan pendaftaran"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Nama Lengkap</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Masukkan nama lengkap"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="nama@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+62 8xx xxxx xxxx"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="Masukkan alamat lengkap"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="city">Kota</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Masukkan kota"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="country">Negara</Label>
                        <Input
                          id="country"
                          name="country"
                          placeholder="Masukkan negara"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="referralCode">
                          Kode Referral {referrerInfo ? "(Terisi Otomatis)" : "(Opsional)"}
                        </Label>
                        <Input
                          id="referralCode"
                          name="referralCode"
                          placeholder="Masukkan kode referral jika ada"
                          value={referralCode}
                          onChange={handleReferralCodeChange}
                          className={referrerInfo ? "bg-green-50 border-green-200" : ""}
                          readOnly={!!referrerInfo}
                        />
                        {referrerInfo && (
                          <p className="text-xs text-green-600 mt-1 flex items-center">
                            <Check className="h-3 w-3 mr-1" /> Kode referral valid dari {referrerInfo.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="membershipType">Jenis Keanggotaan</Label>
                        <Select value={formData.membershipType} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis keanggotaan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic - Gratis</SelectItem>
                            <SelectItem value="silver">Silver - Rp 500.000/tahun</SelectItem>
                            <SelectItem value="gold">Gold - Rp 1.000.000/tahun</SelectItem>
                            <SelectItem value="platinum">Platinum - Rp 2.500.000/tahun</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Basic</h3>
                              <p className="text-sm text-gray-500">Akses dasar ke platform</p>
                            </div>
                            <p className="font-medium">Gratis</p>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Akses ke dashboard member
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Informasi pasar dasar
                            </li>
                          </ul>
                        </div>

                        <div className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Silver</h3>
                              <p className="text-sm text-gray-500">Untuk investor pemula</p>
                            </div>
                            <p className="font-medium">Rp 500.000/tahun</p>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Semua fitur Basic
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Analisis pasar mingguan
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Komisi trading 1%
                            </li>
                          </ul>
                        </div>

                        <div className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Gold</h3>
                              <p className="text-sm text-gray-500">Untuk investor aktif</p>
                            </div>
                            <p className="font-medium">Rp 1.000.000/tahun</p>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Semua fitur Silver
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Analisis pasar harian
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Komisi trading 0.5%
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Akses ke webinar eksklusif
                            </li>
                          </ul>
                        </div>

                        <div className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Platinum</h3>
                              <p className="text-sm text-gray-500">Untuk investor profesional</p>
                            </div>
                            <p className="font-medium">Rp 2.500.000/tahun</p>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm text-gray-500">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Semua fitur Gold
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Konsultasi pribadi bulanan
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Komisi trading 0.25%
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Akses ke investasi eksklusif
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              Prioritas layanan pelanggan
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="agreeTerms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Saya setuju dengan syarat dan ketentuan
                          </label>
                          <p className="text-sm text-gray-500">
                            Dengan mendaftar, Anda menyetujui{" "}
                            <Link href="#" className="text-green-600 hover:underline">
                              Syarat & Ketentuan
                            </Link>{" "}
                            dan{" "}
                            <Link href="#" className="text-green-600 hover:underline">
                              Kebijakan Privasi
                            </Link>{" "}
                            kami.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    Kembali
                  </Button>
                ) : (
                  <div></div>
                )}
                {step < 3 ? (
                  <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                    Lanjutkan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!formData.agreeTerms}
                    onClick={handleSubmit}
                  >
                    Daftar Sekarang
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Sudah memiliki akun?{" "}
                <Link href="#" className="text-green-600 hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Agri Ecosystem Fund. Hak Cipta Dilindungi.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Syarat & Ketentuan
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Kebijakan Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}
