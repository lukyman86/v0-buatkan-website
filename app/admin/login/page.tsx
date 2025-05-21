"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AdminLogin() {
  const [headerLogo, setHeaderLogo] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleHeaderLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const logoUrl = URL.createObjectURL(file)
      setHeaderLogo(logoUrl)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulasi login
    setTimeout(() => {
      // Kredensial admin sederhana untuk demo
      if (username === "admin" && password === "admin123") {
        // Simpan status login di sessionStorage
        sessionStorage.setItem("adminLoggedIn", "true")
        // Redirect ke dashboard admin
        router.push("/admin/dashboard")
      } else {
        setError("Username atau password salah. Silakan coba lagi.")
      }
      setLoading(false)
    }, 1000)
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
          <Link href="/member-area" className="text-sm font-medium hover:underline underline-offset-4">
            Member Area
          </Link>
          <Link href="/trading" className="text-sm font-medium hover:underline underline-offset-4">
            Trading
          </Link>
          <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4">
            Daftar
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-green-50 via-green-100 to-emerald-200">
        <Card className="w-full max-w-md shadow-lg border-green-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Masuk ke panel admin untuk mengelola website</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Masukkan username admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Sembunyikan password" : "Tampilkan password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Memproses..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              <p>Untuk demo, gunakan:</p>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
            <div className="text-center">
              <Link href="/" className="text-sm text-green-600 hover:underline">
                Kembali ke Beranda
              </Link>
            </div>
          </CardFooter>
        </Card>
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
