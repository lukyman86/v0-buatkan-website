"use client"

import { useState, useEffect } from "react"
import { ReferralLinkGenerator } from "@/components/referral-link-generator"
import { ReferralStats } from "@/components/referral-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mountain, User, LogOut } from "lucide-react"
import Link from "next/link"

export default function ReferralPage() {
  const [isClient, setIsClient] = useState(false)

  // Simulasi data member yang sedang login
  const memberData = {
    id: "USR12345",
    name: "Ahmad Fauzi",
    username: "ahmadfauzi",
    email: "ahmad.fauzi@example.com",
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Mountain className="h-6 w-6" />
          <span className="ml-2 font-bold">Agri Ecosystem Fund</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/member-area" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link
            href="/member-area/referral"
            className="text-sm font-medium text-green-600 hover:underline underline-offset-4"
          >
            Referral
          </Link>
          <Link href="/notifications" className="text-sm font-medium hover:underline underline-offset-4">
            Notifikasi
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/member-area/profile" className="text-sm font-medium hover:underline underline-offset-4">
              <User className="h-4 w-4" />
            </Link>
            <Link href="/logout" className="text-sm font-medium hover:underline underline-offset-4">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-12 bg-gradient-to-br from-green-50 via-green-100 to-emerald-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Program Referral</h1>
              <p className="text-gray-500 md:text-xl">
                Bagikan link referral Anda dan dapatkan bonus untuk setiap member baru yang bergabung.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <ReferralLinkGenerator
              memberId={memberData.id}
              memberName={memberData.name}
              memberUsername={memberData.username}
            />

            <ReferralStats memberId={memberData.id} />

            <Card>
              <CardHeader>
                <CardTitle>Cara Kerja Program Referral</CardTitle>
                <CardDescription>
                  Pelajari cara mendapatkan bonus dari program referral Agri Ecosystem Fund
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="how-it-works">
                  <TabsList className="mb-4">
                    <TabsTrigger value="how-it-works">Cara Kerja</TabsTrigger>
                    <TabsTrigger value="bonus-structure">Struktur Bonus</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  <TabsContent value="how-it-works">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-4">
                            1
                          </div>
                          <h3 className="text-lg font-medium mb-2">Bagikan Link Referral</h3>
                          <p className="text-gray-600 text-sm">
                            Bagikan link referral Anda kepada teman, keluarga, atau melalui media sosial Anda.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-4">
                            2
                          </div>
                          <h3 className="text-lg font-medium mb-2">Mereka Mendaftar</h3>
                          <p className="text-gray-600 text-sm">
                            Ketika seseorang mengklik link Anda dan mendaftar sebagai member baru, mereka akan terhubung
                            dengan akun Anda.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-4">
                            3
                          </div>
                          <h3 className="text-lg font-medium mb-2">Dapatkan Bonus</h3>
                          <p className="text-gray-600 text-sm">
                            Setelah mereka menyelesaikan pendaftaran dan verifikasi, Anda akan mendapatkan bonus 15 Agri
                            Coins.
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-medium text-green-800 mb-2">Tips Sukses</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Bagikan link di grup WhatsApp keluarga dan teman</li>
                          <li>Posting di media sosial Anda dengan penjelasan tentang manfaat bergabung</li>
                          <li>Buat konten video atau blog tentang pengalaman Anda dengan platform ini</li>
                          <li>Gunakan link kustom yang mudah diingat untuk meningkatkan konversi</li>
                          <li>Jelaskan keuntungan investasi di Agri Ecosystem Fund kepada calon member</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bonus-structure">
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-lg font-medium mb-2">Struktur Bonus Referral</h3>
                        <p className="text-gray-600 mb-4">
                          Program referral kami memberikan bonus multi-level yang memungkinkan Anda mendapatkan
                          penghasilan dari jaringan yang Anda bangun.
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div>
                              <h4 className="font-medium">Bonus Sponsor</h4>
                              <p className="text-sm text-gray-600">Referral langsung (Level 0)</p>
                            </div>
                            <div className="text-lg font-bold text-green-600">15 Agri Coins</div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div>
                              <h4 className="font-medium">Bonus Level 1</h4>
                              <p className="text-sm text-gray-600">Referral dari member Anda</p>
                            </div>
                            <div className="text-lg font-bold text-blue-600">3 Agri Coins</div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <div>
                              <h4 className="font-medium">Bonus Level 2</h4>
                              <p className="text-sm text-gray-600">Referral dari level 1</p>
                            </div>
                            <div className="text-lg font-bold text-purple-600">2 Agri Coins</div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <div>
                              <h4 className="font-medium">Bonus Level 3</h4>
                              <p className="text-sm text-gray-600">Referral dari level 2</p>
                            </div>
                            <div className="text-lg font-bold text-amber-600">1 Agri Coins</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-lg font-medium mb-2">Contoh Perhitungan</h3>
                        <p className="text-gray-600 mb-4">
                          Berikut adalah contoh perhitungan bonus yang bisa Anda dapatkan:
                        </p>

                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Anda mengajak 5 orang:</span> 5 × 15 = 75 Agri Coins
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">
                              Setiap orang mengajak 3 orang (total 15 orang di level 1):
                            </span>{" "}
                            15 × 3 = 45 Agri Coins
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">
                              Setiap orang di level 1 mengajak 2 orang (total 30 orang di level 2):
                            </span>{" "}
                            30 × 2 = 60 Agri Coins
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">
                              Setiap orang di level 2 mengajak 1 orang (total 30 orang di level 3):
                            </span>{" "}
                            30 × 1 = 30 Agri Coins
                          </p>
                          <div className="border-t pt-2 mt-2">
                            <p className="font-medium">Total bonus: 210 Agri Coins</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="faq">
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Kapan saya mendapatkan bonus referral?</h3>
                        <p className="text-gray-600 text-sm">
                          Bonus referral akan dikreditkan ke akun Anda setelah member yang Anda referensikan
                          menyelesaikan pendaftaran dan verifikasi email mereka.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Berapa banyak orang yang bisa saya referensikan?</h3>
                        <p className="text-gray-600 text-sm">
                          Tidak ada batasan jumlah orang yang dapat Anda referensikan. Semakin banyak orang yang
                          bergabung melalui link Anda, semakin banyak bonus yang Anda dapatkan.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Bagaimana cara mencairkan Agri Coins?</h3>
                        <p className="text-gray-600 text-sm">
                          Agri Coins dapat digunakan untuk berbagai transaksi di platform atau ditukarkan menjadi uang
                          tunai sesuai dengan ketentuan yang berlaku. Kunjungi halaman Pencairan untuk informasi lebih
                          lanjut.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Apakah link referral saya memiliki masa berlaku?</h3>
                        <p className="text-gray-600 text-sm">
                          Tidak, link referral Anda tidak memiliki masa berlaku dan dapat digunakan selama Anda masih
                          menjadi member aktif di platform kami.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">
                          Bagaimana jika seseorang mendaftar tanpa menggunakan link referral saya?
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Sayangnya, Anda hanya akan mendapatkan bonus jika mereka mendaftar menggunakan link referral
                          Anda. Pastikan mereka mengklik link Anda atau memasukkan kode referral Anda saat pendaftaran.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
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
