import type { Metadata } from "next"
import { AgcTransferForm } from "@/components/agc-transfer-form"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Transfer AGC | AGC Platform",
  description: "Kirim AGC Coin ke sesama member",
}

export default function AgcTransferPage() {
  return (
    <AuthGuard allowedRoles={["admin", "member"]}>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Transfer AGC</h1>
        <AgcTransferForm />
      </div>
    </AuthGuard>
  )
}
