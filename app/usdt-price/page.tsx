import { LiveCoinWatchWidget } from "@/components/livecoinwatch-widget"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsdtPricePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">USDT Price Tracker</h1>

      <Tabs defaultValue="default" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="default">Default Theme</TabsTrigger>
          <TabsTrigger value="light">Light Theme</TabsTrigger>
          <TabsTrigger value="custom">Custom Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="default" className="pt-4">
          <div className="max-w-md mx-auto">
            <LiveCoinWatchWidget />
          </div>
        </TabsContent>

        <TabsContent value="light" className="pt-4">
          <div className="max-w-md mx-auto">
            <LiveCoinWatchWidget textColor="#000000" backgroundColor="#ffffff" />
          </div>
        </TabsContent>

        <TabsContent value="custom" className="pt-4">
          <div className="max-w-md mx-auto">
            <LiveCoinWatchWidget textColor="#e2e8f0" backgroundColor="#1e293b" borderWidth="2" period="w" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-muted p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Konfigurasi Widget</h2>
          <p className="mb-4">Widget LiveCoinWatch dapat dikonfigurasi dengan parameter berikut:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>coin</strong>: Koin yang ingin ditampilkan (default: USDT)
            </li>
            <li>
              <strong>base</strong>: Mata uang dasar (default: USD)
            </li>
            <li>
              <strong>period</strong>: Periode waktu (h: jam, d: hari, w: minggu, m: bulan, y: tahun)
            </li>
            <li>
              <strong>textColor</strong>: Warna teks dalam format hex
            </li>
            <li>
              <strong>backgroundColor</strong>: Warna latar belakang dalam format hex
            </li>
            <li>
              <strong>borderWidth</strong>: Lebar border dalam piksel
            </li>
          </ul>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Implementasi</h2>
          <p className="mb-4">Untuk menggunakan widget ini di halaman lain:</p>
          <pre className="bg-slate-800 text-white p-3 rounded text-sm overflow-x-auto">
            {`import { LiveCoinWatchWidget } from "@/components/livecoinwatch-widget"

// Dalam komponen React Anda:
<LiveCoinWatchWidget 
  coin="USDT"
  base="USD"
  period="d"
  textColor="#ffffff"
  backgroundColor="#1f2434"
  borderWidth="1"
/>`}
          </pre>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Contoh Penggunaan Lainnya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <LiveCoinWatchWidget coin="BTC" base="USD" period="d" className="h-full" />
          <LiveCoinWatchWidget coin="ETH" base="USD" period="d" className="h-full" />
          <LiveCoinWatchWidget coin="SOL" base="USD" period="d" className="h-full" />
        </div>
      </div>
    </div>
  )
}
