import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ECommerce() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">Toko Online</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden md:flex items-center gap-2">
            <Input type="search" placeholder="Cari produk..." className="w-[200px] lg:w-[300px]" />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
              <span className="sr-only">Cari</span>
            </Button>
          </form>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Akun</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Keranjang</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Belanja Produk Berkualitas
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Temukan berbagai produk berkualitas dengan harga terbaik.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#products"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Belanja Sekarang
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
        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Produk Terbaru</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Temukan produk terbaru kami dengan kualitas terbaik.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    width="300"
                    height="300"
                    alt="Product 1"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Produk 1</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi produk 1 yang kami tawarkan.</p>
                  <p className="mt-2 font-bold">Rp 100.000</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Tambah ke Keranjang</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    width="300"
                    height="300"
                    alt="Product 2"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Produk 2</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi produk 2 yang kami tawarkan.</p>
                  <p className="mt-2 font-bold">Rp 150.000</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Tambah ke Keranjang</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    width="300"
                    height="300"
                    alt="Product 3"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Produk 3</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi produk 3 yang kami tawarkan.</p>
                  <p className="mt-2 font-bold">Rp 200.000</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Tambah ke Keranjang</Button>
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
                  Dapatkan informasi terbaru tentang produk dan promo kami.
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
          &copy; {new Date().getFullYear()} Toko Online. Hak Cipta Dilindungi.
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
