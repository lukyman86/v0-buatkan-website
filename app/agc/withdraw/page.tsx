import type { Metadata } from "next"
import { AgcWithdrawForm } from "@/components/agc-withdraw-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Withdraw AGC | AGC Platform",
  description: "Tarik AGC Coin dari akun Anda",
}

export default function AgcWithdrawPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Withdraw AGC</h1>
        <AgcWithdrawForm />
      </div>
    </AuthGuard>
  )
}
