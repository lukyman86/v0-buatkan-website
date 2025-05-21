"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Facebook, Twitter, Mail, Linkedin, PhoneIcon as WhatsApp, AlertCircle, CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ReferralLinkGeneratorProps {
  memberId: string
  memberName: string
  memberUsername?: string
}

export function ReferralLinkGenerator({ memberId, memberName, memberUsername }: ReferralLinkGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [customSlug, setCustomSlug] = useState("")
  const [isCustomSlugAvailable, setIsCustomSlugAvailable] = useState(true)
  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
  const [activeTab, setActiveTab] = useState("default")
  const [referralLink, setReferralLink] = useState("")
  const [customReferralLink, setCustomReferralLink] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Simulasi pengecekan ketersediaan slug kustom
  const checkSlugAvailability = async (slug: string) => {
    setIsCheckingSlug(true)
    // Simulasi API call untuk memeriksa ketersediaan slug
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Untuk demo, kita anggap slug tersedia jika panjangnya > 5 karakter
    const isAvailable = slug.length > 5
    setIsCustomSlugAvailable(isAvailable)
    setIsCheckingSlug(false)
    return isAvailable
  }

  // Generate link referral default berdasarkan ID member
  useEffect(() => {
    const baseUrl = window.location.origin
    const defaultLink = `${baseUrl}/register?ref=${memberId}`
    setReferralLink(defaultLink)

    // Jika username tersedia, gunakan sebagai slug default
    if (memberUsername) {
      setCustomSlug(memberUsername)
      setCustomReferralLink(`${baseUrl}/register?ref=${memberUsername}`)
    }
  }, [memberId, memberUsername])

  // Handle perubahan slug kustom
  const handleCustomSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase()
    setCustomSlug(value)
  }

  // Handle blur pada input slug kustom
  const handleCustomSlugBlur = async () => {
    if (customSlug.length > 0) {
      const isAvailable = await checkSlugAvailability(customSlug)
      if (isAvailable) {
        const baseUrl = window.location.origin
        setCustomReferralLink(`${baseUrl}/register?ref=${customSlug}`)
      }
    }
  }

  // Handle simpan slug kustom
  const handleSaveCustomSlug = async () => {
    if (customSlug.length > 0) {
      const isAvailable = await checkSlugAvailability(customSlug)
      if (isAvailable) {
        const baseUrl = window.location.origin
        setCustomReferralLink(`${baseUrl}/register?ref=${customSlug}`)
        setShowSuccessAlert(true)
        setTimeout(() => setShowSuccessAlert(false), 3000)
        // Di sini Anda akan menyimpan slug kustom ke database
        // saveCustomSlugToDatabase(memberId, customSlug)
      }
    }
  }

  // Handle salin link referral
  const handleCopyLink = () => {
    const linkToCopy = activeTab === "default" ? referralLink : customReferralLink
    navigator.clipboard.writeText(linkToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle bagikan link referral
  const handleShare = (platform: string) => {
    const linkToShare = activeTab === "default" ? referralLink : customReferralLink
    const text = `Bergabunglah dengan Agri Ecosystem Fund menggunakan link referral saya: ${linkToShare}`

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkToShare)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
        break
      case "email":
        shareUrl = `mailto:?subject=Bergabung dengan Agri Ecosystem Fund&body=${encodeURIComponent(text)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Link Referral Anda</CardTitle>
        <CardDescription>
          Bagikan link referral Anda untuk mengundang orang lain bergabung dan dapatkan bonus 15 Agri Coins untuk setiap
          pendaftaran.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="default" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="default">Link Default</TabsTrigger>
            <TabsTrigger value="custom">Link Kustom</TabsTrigger>
          </TabsList>

          <TabsContent value="default">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Link Referral Default</label>
                <div className="flex">
                  <Input value={referralLink} readOnly className="flex-1 bg-gray-50" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="ml-2" onClick={handleCopyLink}>
                          {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Disalin!" : "Salin link"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Link ini berisi ID member Anda dan akan selalu berfungsi. Gunakan link ini jika Anda ingin link yang
                  sederhana.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Buat Link Referral Kustom</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        {window.location.origin}/register?ref=
                      </span>
                      <Input
                        value={customSlug}
                        onChange={handleCustomSlugChange}
                        onBlur={handleCustomSlugBlur}
                        placeholder="nama-anda"
                        className="rounded-l-none"
                      />
                    </div>
                    {isCheckingSlug && <p className="text-xs text-gray-500 mt-1">Memeriksa ketersediaan...</p>}
                    {!isCustomSlugAvailable && customSlug.length > 0 && (
                      <p className="text-xs text-red-500 mt-1">Slug tidak tersedia. Gunakan minimal 6 karakter.</p>
                    )}
                  </div>
                  <Button
                    onClick={handleSaveCustomSlug}
                    disabled={!isCustomSlugAvailable || customSlug.length === 0 || isCheckingSlug}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Simpan
                  </Button>
                </div>
              </div>

              {customReferralLink && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Link Referral Kustom Anda</label>
                  <div className="flex">
                    <Input value={customReferralLink} readOnly className="flex-1 bg-gray-50" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="ml-2" onClick={handleCopyLink}>
                            {copied ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Disalin!" : "Salin link"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Buat link referral yang lebih mudah diingat dengan nama atau kata kunci pilihan Anda. Gunakan hanya
                  huruf, angka, dan tanda hubung.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {showSuccessAlert && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">Link referral kustom berhasil disimpan!</AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Bagikan Link Referral</h4>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bagikan ke Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
                    <Twitter className="h-4 w-4 text-sky-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bagikan ke Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleShare("whatsapp")}>
                    <WhatsApp className="h-4 w-4 text-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bagikan ke WhatsApp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")}>
                    <Linkedin className="h-4 w-4 text-blue-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bagikan ke LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => handleShare("email")}>
                    <Mail className="h-4 w-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bagikan via Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="outline" className="ml-auto" onClick={handleCopyLink}>
              {copied ? <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Disalin!" : "Salin Link"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t pt-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
          <p className="text-sm text-gray-600">
            Anda akan mendapatkan 15 Agri Coins untuk setiap member baru yang mendaftar menggunakan link referral Anda.
            Pastikan mereka menyelesaikan pendaftaran dan verifikasi.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
