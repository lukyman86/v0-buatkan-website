export interface Bank {
  id: string
  name: string
  accountNumber: string
  accountName: string
  logo?: string
}

export interface DepositRequest {
  id: string
  userId: string
  amount: number
  bankId: string
  referenceNumber: string
  proofImageUrl?: string
  status: "pending" | "confirmed" | "rejected"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface DepositFormData {
  amount: number
  bankId: string
  referenceNumber: string
  proofImage?: File
}
