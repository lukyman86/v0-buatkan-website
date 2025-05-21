import type { Metadata } from "next"
import { AgcTransactionHistory } from "@/components/agc-transaction-history"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Riwayat Transaksi AGC | AGC Platform",
  description: "Riwayat transaksi AGC Coin Anda",
}

export default function AgcTransactionsPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi AGC</h1>
        <AgcTransactionHistory />
      </div>
    </AuthGuard>
  )
}
