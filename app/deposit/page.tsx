import type { Metadata } from "next"
import { DepositForm } from "@/components/deposit-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Deposit Dana | AGC Platform",
  description: "Tambahkan dana ke akun Anda melalui transfer bank",
}

export default function DepositPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Deposit Dana</h1>
        <DepositForm />
      </div>
    </AuthGuard>
  )
}
