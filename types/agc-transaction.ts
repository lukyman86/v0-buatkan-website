export interface AgcTransaction {
  id: string
  type: "deposit" | "withdraw" | "transfer"
  senderId: string
  senderUsername?: string
  receiverId?: string
  receiverUsername?: string
  amount: number
  fee: number
  networkFee: number
  status: "pending" | "completed" | "failed" | "cancelled"
  txHash?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface AgcWallet {
  id: string
  userId: string
  balance: number
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface AgcExchange {
  id: string
  name: string
  depositAddress: string
  withdrawalFee: number
  minWithdrawal: number
  maxWithdrawal: number
  isActive: boolean
}
