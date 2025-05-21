import type { Metadata } from "next"
import { AgcTokenInfo } from "@/components/agc-token-info"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AGC_TOKEN_INFO } from "@/types/agc-token"

export const metadata: Metadata = {
  title: `${AGC_TOKEN_INFO.name} (${AGC_TOKEN_INFO.symbol}) - Informasi Token`,
  description: `Informasi lengkap tentang ${AGC_TOKEN_INFO.name} (${AGC_TOKEN_INFO.symbol}), token SPL di jaringan Solana blockchain.`,
}

export default function AgcInfoPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Informasi Token {AGC_TOKEN_INFO.name}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <AgcTokenInfo />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tentang {AGC_TOKEN_INFO.name}</CardTitle>
              <CardDescription>Informasi lengkap tentang token {AGC_TOKEN_INFO.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {AGC_TOKEN_INFO.name} ({AGC_TOKEN_INFO.symbol}) adalah token SPL yang berjalan di jaringan Solana
                blockchain. Token ini digunakan sebagai mata uang utama dalam platform kami untuk berbagai transaksi
                seperti staking, trading, dan transfer antar member.
              </p>

              <p className="mb-4">
                Dengan menggunakan teknologi blockchain Solana, {AGC_TOKEN_INFO.symbol} menawarkan transaksi yang cepat,
                biaya rendah, dan keamanan tinggi. Token ini dapat ditransfer antar member dengan biaya transfer 0.9%
                dan tambahan biaya jaringan sebesar 0.00005000 per {AGC_TOKEN_INFO.symbol}.
              </p>

              <p>
                Untuk melihat informasi lebih lanjut tentang token {AGC_TOKEN_INFO.symbol}, Anda dapat mengunjungi
                <a
                  href={AGC_TOKEN_INFO.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Solscan Explorer
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Fitur</TabsTrigger>
              <TabsTrigger value="usage">Penggunaan</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-4 border rounded-md mt-2">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Transaksi cepat dengan teknologi Solana blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Biaya transaksi rendah</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Keamanan tinggi dengan standar SPL Token</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Dapat digunakan untuk staking dengan APY hingga 47%</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Transfer antar member dengan mudah</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="usage" className="p-4 border rounded-md mt-2">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    1
                  </span>
                  <span>Staking: Kunci AGC Anda untuk mendapatkan reward hingga 47% APY</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    2
                  </span>
                  <span>Trading: Beli dan jual AGC dengan mata uang lain</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    3
                  </span>
                  <span>Transfer: Kirim AGC ke sesama member dengan biaya rendah</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    4
                  </span>
                  <span>Deposit & Withdraw: Kelola AGC Anda dengan mudah</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="faq" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Bagaimana cara mendapatkan AGC?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Anda dapat membeli AGC melalui exchange yang terdaftar atau dari sesama member.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Berapa biaya transfer AGC antar member?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Biaya transfer adalah 0.9% dari jumlah yang ditransfer ditambah biaya jaringan sebesar 0.00005000
                    per AGC.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Apakah AGC dapat disimpan di wallet Solana?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ya, AGC adalah token SPL yang dapat disimpan di wallet Solana seperti Phantom, Solflare, atau
                    Sollet.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Bagaimana cara melihat transaksi AGC saya?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Anda dapat melihat transaksi AGC di Solscan Explorer dengan memasukkan alamat wallet atau hash
                    transaksi.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
