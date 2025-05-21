import type { Metadata } from "next"
import { AgcDepositForm } from "@/components/agc-deposit-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Deposit AGC | AGC Platform",
  description: "Deposit AGC Coin ke akun Anda",
}

export default function AgcDepositPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Deposit AGC</h1>
        <AgcDepositForm />
      </div>
    </AuthGuard>
  )
}
