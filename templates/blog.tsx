import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Blog() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        <Link href="/" className="flex items-center justify-center">
          <BookOpen className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">Nama Blog</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Beranda
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Artikel
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Kategori
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Tentang
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Kontak
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex items-center gap-2">
          <form className="hidden md:flex items-center gap-2">
            <Input type="search" placeholder="Cari artikel..." className="w-[200px] lg:w-[300px]" />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
              <span className="sr-only">Cari</span>
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Selamat Datang di Blog Kami
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Temukan berbagai artikel menarik dan informatif.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#articles"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Baca Artikel
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="articles" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Artikel Terbaru</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Temukan artikel terbaru kami dengan informasi yang bermanfaat.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Article 1"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Judul Artikel 1</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi singkat artikel 1 yang kami tulis.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Ditulis oleh: Penulis | 21 Mei 2025</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Baca Selengkapnya
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Article 2"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Judul Artikel 2</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi singkat artikel 2 yang kami tulis.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Ditulis oleh: Penulis | 20 Mei 2025</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Baca Selengkapnya
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Article 3"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Judul Artikel 3</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi singkat artikel 3 yang kami tulis.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Ditulis oleh: Penulis | 19 Mei 2025</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Baca Selengkapnya
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Berlangganan Newsletter</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dapatkan informasi terbaru tentang artikel kami.
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 py-12">
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email Anda" />
                <Button type="submit">Berlangganan</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nama Blog. Hak Cipta Dilindungi.
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
