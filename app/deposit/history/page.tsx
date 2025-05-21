import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DepositHistory } from "@/components/deposit-history"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Riwayat Deposit | AGC Platform",
  description: "Riwayat deposit dana ke akun Anda",
}

export default function DepositHistoryPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Riwayat Deposit</h1>
          <Button asChild>
            <Link href="/deposit">Deposit Baru</Link>
          </Button>
        </div>

        <DepositHistory />
      </div>
    </AuthGuard>
  )
}
