import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="font-bold text-xl">
          Nama Saya
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
            Tentang
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
            Proyek
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:underline underline-offset-4">
            Keahlian
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Kontak
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Nama Saya</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Seorang [Profesi Anda] dengan pengalaman dalam [Bidang Keahlian Anda].
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#contact"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Hubungi Saya
                  </Link>
                  <Link
                    href="#projects"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Lihat Proyek
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                width="400"
                height="400"
                alt="Profile"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tentang Saya</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Saya adalah seorang [Profesi Anda] dengan pengalaman [jumlah tahun] tahun dalam [Bidang Keahlian
                  Anda]. Saya memiliki keahlian dalam [Keahlian 1], [Keahlian 2], dan [Keahlian 3].
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Proyek Saya</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Berikut adalah beberapa proyek yang telah saya kerjakan.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardContent className="p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width="500"
                    height="300"
                    alt="Project 1"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Proyek 1</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi proyek 1 yang telah saya kerjakan.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width="500"
                    height="300"
                    alt="Project 2"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 text-xl font-bold">Proyek 2</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi proyek 2 yang telah saya kerjakan.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Keahlian Saya</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Berikut adalah beberapa keahlian yang saya miliki.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold">Keahlian 1</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi keahlian 1 yang saya miliki.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold">Keahlian 2</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi keahlian 2 yang saya miliki.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold">Keahlian 3</h3>
                  <p className="text-sm text-muted-foreground">Deskripsi keahlian 3 yang saya miliki.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hubungi Saya</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Jangan ragu untuk menghubungi saya jika Anda memiliki pertanyaan atau ingin bekerja sama.
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 py-12">
              <Link href="mailto:email@example.com" className="flex items-center gap-2">
                <Mail className="h-6 w-6" />
                <span>Email</span>
              </Link>
              <Link href="https://github.com/username" className="flex items-center gap-2">
                <Github className="h-6 w-6" />
                <span>GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/username" className="flex items-center gap-2">
                <Linkedin className="h-6 w-6" />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nama Saya. Hak Cipta Dilindungi.
        </p>
      </footer>
    </div>
  )
}
