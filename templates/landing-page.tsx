"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mountain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
;<style jsx global>{`
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`}</style>

export default function LandingPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [headerLogo, setHeaderLogo] = useState<string | null>(null)
  const [largeLogo, setLargeLogo] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
    }
  }

  const handleHeaderLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setHeaderLogo(logoUrl)
    }
  }

  const handleLargeLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setLargeLogo(logoUrl)
    }
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
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
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Beranda
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Layanan
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Tentang Kami
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Kontak
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-br from-green-50 via-green-100 to-emerald-200 border-y border-green-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>

          {/* Area untuk logo besar */}
          <div className="relative z-20 flex justify-center items-center pt-0 pb-6 -mt-8">
            {largeLogo ? (
              <div className="relative">
                <Image
                  src={largeLogo || "/placeholder.svg"}
                  width={400}
                  height={200}
                  alt="Large Logo"
                  className="max-h-64 w-auto object-contain"
                />
                <button
                  onClick={() => setLargeLogo(null)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-green-300 rounded-lg bg-white/50 backdrop-blur-sm cursor-pointer hover:bg-green-50 transition-colors w-80 h-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-green-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base font-medium text-green-700">Upload Logo Besar</span>
                <span className="text-sm text-green-600 mt-2">Klik untuk memilih file</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleLargeLogoUpload} />
              </label>
            )}
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 relative z-10">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-green-800">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                    Solusi Terbaik untuk Investasi Anda
                  </span>
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
                <p className="mx-auto max-w-[700px] text-green-700 md:text-xl font-medium">
                  Agri Ecosystem Fund siap wujudkan mimpi Anda.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-green-500/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Mulai Sekarang
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-green-300 bg-white/90 px-6 py-3 text-sm font-medium text-green-700 shadow-sm transition-all duration-300 hover:bg-green-50 hover:text-green-800 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>
            </div>
            {/* State untuk menyimpan gambar yang diupload */}
            {uploadedImage ? (
              <div className="relative mx-auto mt-8 transform transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur-md opacity-75"></div>
                <Image
                  src={uploadedImage || "/placeholder.svg"}
                  width={1270}
                  height={400}
                  alt="Hero"
                  className="relative mx-auto aspect-[3/1] overflow-hidden rounded-xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-green-400/20"></div>
              </div>
            ) : (
              <div className="relative mx-auto mt-8 transform transition-all duration-500 hover:scale-[1.02] border-2 border-dashed border-green-300 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-green-50 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-green-700 font-medium">Klik untuk mengupload gambar</p>
                  <p className="text-sm text-green-600">atau seret dan lepas file di sini</p>
                  <label className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-green-500/30 hover:scale-105 cursor-pointer">
                    Pilih Gambar
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Layanan Kami</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kami menawarkan berbagai layanan untuk meningkatkan penghasilan Anda.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Trade AGC Coins</h3>
                <p className="text-sm text-muted-foreground">
                  Layanan jual beli Agri Coins yang akan memberikan keuntungan dari selisih harga beli dan jual yang
                  akan menambah pundi-pundi keuangan anda.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Staking AGC Coins</h3>
                <p className="text-sm text-muted-foreground">
                  Menjadi salah satu solusi bagi anda yang sibuk namun ingin mendapatkan keuntungan tambahan tanpa
                  ribet.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Investasi Pertanian</h3>
                <p className="text-sm text-muted-foreground">
                  Secara bersama-sama mendanai project pertanian yang ditentukan oleh tim Aecofund dengan kentungan
                  tertentu.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hubungi Kami</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau ingin bekerja sama.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2">
                <Input type="email" placeholder="Email Anda" className="max-w-lg" />
                <Input type="text" placeholder="Pesan Anda" className="max-w-lg" />
                <Button type="submit" className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} aecofund. Hak Cipta Dilindungi.
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
