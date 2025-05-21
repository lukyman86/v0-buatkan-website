"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Check, Upload } from "lucide-react"

export default function GeneralSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulasi penyimpanan
    setTimeout(() => {
      setIsSaving(false)
      setSavedSuccess(true)
      // Reset status sukses setelah 3 detik
      setTimeout(() => {
        setSavedSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <AdminLayout title="Pengaturan Umum">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pengaturan Umum</h1>
            <p className="text-gray-500">Kelola pengaturan dasar website</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
              {isSaving ? (
                "Menyimpan..."
              ) : savedSuccess ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Tersimpan
                </span>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="website">
          <TabsList className="mb-4">
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="company">Perusahaan</TabsTrigger>
            <TabsTrigger value="localization">Lokalisasi</TabsTrigger>
            <TabsTrigger value="maintenance">Pemeliharaan</TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Website</CardTitle>
                <CardDescription>Pengaturan dasar untuk website Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Nama Website</Label>
                    <Input id="site-name" defaultValue="Agri Ecosystem Fund" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">URL Website</Label>
                    <Input id="site-url" defaultValue="https://aecofund.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Deskripsi Website</Label>
                  <Textarea
                    id="site-description"
                    defaultValue="Platform investasi pertanian terpercaya untuk masa depan yang lebih baik."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Deskripsi singkat tentang website Anda. Digunakan untuk SEO dan meta description.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-keywords">Kata Kunci</Label>
                  <Input
                    id="site-keywords"
                    defaultValue="investasi, pertanian, agrikultur, coin, cryptocurrency, blockchain"
                  />
                  <p className="text-xs text-gray-500">
                    Kata kunci yang relevan dengan website Anda, dipisahkan dengan koma.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Favicon</CardTitle>
                <CardDescription>Unggah logo dan favicon untuk website Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo Website</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-gray-50">
                      <img
                        src="/placeholder.svg?height=96&width=96"
                        alt="Logo Preview"
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Unggah Logo
                      </Button>
                      <p className="text-xs text-gray-500">
                        Format yang didukung: PNG, JPG, SVG. Ukuran maksimal: 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border rounded-md flex items-center justify-center bg-gray-50">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="Favicon Preview"
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Unggah Favicon
                      </Button>
                      <p className="text-xs text-gray-500">
                        Format yang didukung: ICO, PNG. Ukuran yang direkomendasikan: 32x32px.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pengaturan SEO</CardTitle>
                <CardDescription>Pengaturan untuk meningkatkan peringkat SEO website Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input id="meta-title" defaultValue="Agri Ecosystem Fund | Platform Investasi Pertanian Terpercaya" />
                  <p className="text-xs text-gray-500">
                    Judul yang akan ditampilkan di hasil pencarian dan tab browser.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    defaultValue="Agri Ecosystem Fund adalah platform investasi pertanian terpercaya yang menghubungkan investor dengan petani untuk masa depan yang lebih baik."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">Deskripsi yang akan ditampilkan di hasil pencarian.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robots">Robots</Label>
                  <Select defaultValue="index-follow">
                    <SelectTrigger id="robots">
                      <SelectValue placeholder="Pilih pengaturan robots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index-follow">Index, Follow</SelectItem>
                      <SelectItem value="index-nofollow">Index, No Follow</SelectItem>
                      <SelectItem value="noindex-follow">No Index, Follow</SelectItem>
                      <SelectItem value="noindex-nofollow">No Index, No Follow</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Mengontrol bagaimana mesin pencari mengindeks dan mengikuti tautan di website Anda.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sitemap" defaultChecked />
                  <Label htmlFor="sitemap">Aktifkan Sitemap Otomatis</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Perusahaan</CardTitle>
                <CardDescription>Informasi tentang perusahaan Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nama Perusahaan</Label>
                    <Input id="company-name" defaultValue="PT Agri Ecosystem Indonesia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Perusahaan</Label>
                    <Input id="company-email" defaultValue="info@aecofund.com" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Nomor Telepon</Label>
                    <Input id="company-phone" defaultValue="+62 21 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-tax-id">NPWP</Label>
                    <Input id="company-tax-id" defaultValue="01.234.567.8-123.000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Alamat</Label>
                  <Textarea
                    id="company-address"
                    defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220, Indonesia"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
                <CardDescription>Tautan ke akun media sosial perusahaan Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social-facebook">Facebook</Label>
                    <Input id="social-facebook" defaultValue="https://facebook.com/aecofund" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-twitter">Twitter</Label>
                    <Input id="social-twitter" defaultValue="https://twitter.com/aecofund" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social-instagram">Instagram</Label>
                    <Input id="social-instagram" defaultValue="https://instagram.com/aecofund" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-linkedin">LinkedIn</Label>
                    <Input id="social-linkedin" defaultValue="https://linkedin.com/company/aecofund" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Lokalisasi</CardTitle>
                <CardDescription>Pengaturan bahasa, zona waktu, dan format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">Bahasa Default</Label>
                    <Select defaultValue="id">
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="Pilih bahasa default" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zona Waktu</Label>
                    <Select defaultValue="asia-jakarta">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Pilih zona waktu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                        <SelectItem value="asia-makassar">Asia/Makassar (GMT+8)</SelectItem>
                        <SelectItem value="asia-jayapura">Asia/Jayapura (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Format Tanggal</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Pilih format tanggal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Mata Uang</Label>
                    <Select defaultValue="idr">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Pilih mata uang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idr">Rupiah (IDR)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="sgd">Singapore Dollar (SGD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="multi-language" />
                  <Label htmlFor="multi-language">Aktifkan Multi Bahasa</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mode Pemeliharaan</CardTitle>
                <CardDescription>Aktifkan mode pemeliharaan saat website sedang dalam perbaikan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Aktifkan Mode Pemeliharaan</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Pesan Pemeliharaan</Label>
                  <Textarea
                    id="maintenance-message"
                    defaultValue="Website sedang dalam pemeliharaan. Silakan kembali beberapa saat lagi."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Pesan yang akan ditampilkan kepada pengunjung saat mode pemeliharaan aktif.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-end">Waktu Selesai Pemeliharaan</Label>
                  <Input id="maintenance-end" type="datetime-local" />
                  <p className="text-xs text-gray-500">
                    Waktu perkiraan selesainya pemeliharaan. Biarkan kosong jika tidak diketahui.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-allow-admin" defaultChecked />
                  <Label htmlFor="maintenance-allow-admin">Izinkan Admin Mengakses Website</Label>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Saat mode pemeliharaan aktif, pengunjung tidak akan dapat mengakses website dan akan melihat pesan
                  pemeliharaan.
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>Kelola backup dan restore data website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Backup Manual</Label>
                  <div className="flex gap-2">
                    <Button variant="outline">Backup Database</Button>
                    <Button variant="outline">Backup File</Button>
                    <Button variant="outline">Backup Penuh</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Backup Otomatis</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-backup" defaultChecked />
                    <Label htmlFor="auto-backup">Aktifkan Backup Otomatis</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Pilih frekuensi backup" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Harian</SelectItem>
                          <SelectItem value="weekly">Mingguan</SelectItem>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-retention">Retensi Backup</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="backup-retention">
                          <SelectValue placeholder="Pilih retensi backup" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 hari</SelectItem>
                          <SelectItem value="30">30 hari</SelectItem>
                          <SelectItem value="90">90 hari</SelectItem>
                          <SelectItem value="365">1 tahun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Restore Backup</Label>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="restore-file">Pilih File Backup</Label>
                      <Input id="restore-file" type="file" />
                      <p className="text-xs text-gray-500">
                        Pilih file backup yang ingin di-restore. Format yang didukung: .zip, .sql.
                      </p>
                    </div>
                    <Button variant="outline" className="mt-2">
                      Restore Backup
                    </Button>
                  </div>
                  <p className="text-xs text-red-500">
                    Perhatian: Restore backup akan menimpa data yang ada. Pastikan untuk membuat backup terlebih dahulu.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
