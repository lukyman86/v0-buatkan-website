import type { Metadata } from "next"
import { AgcTransactionNotifications } from "@/components/agc-transaction-notifications"
import { AgcTransactionStatus } from "@/components/agc-transaction-status"
import { AgcTransactionAlert } from "@/components/agc-transaction-alert"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Dashboard Member | AGC Platform",
  description: "Dashboard untuk member AGC Platform",
}

export default function MemberDashboardPage() {
  return (
    <AuthGuard allowedRoles={["member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard Member</h1>

        {/* Transaction Alert - Akan muncul ketika ada transaksi baru */}
        <AgcTransactionAlert
          transactionId="tx_123456"
          type="deposit"
          status="success"
          message="Deposit 5 AGC berhasil dikonfirmasi dan telah ditambahkan ke saldo Anda"
        />

        {/* Transaction Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Status Transaksi AGC</h2>
          <AgcTransactionStatus />
        </div>

        {/* Transaction Notifications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Notifikasi Transaksi</h2>
          <AgcTransactionNotifications />
        </div>
      </div>
    </AuthGuard>
  )
}
