export interface AgcTokenInfo {
  name: string
  symbol: string
  mintAddress: string
  network: string
  explorerUrl: string
  decimals: number
  logo: string
  description?: string
}

export const AGC_TOKEN_INFO: AgcTokenInfo = {
  name: "AGRI Coins",
  symbol: "AGC",
  mintAddress: "Hp3DUJpvjEbvFXM4HKLgGR9AV1r6UjcUHuvEKewx789t",
  network: "Solana",
  explorerUrl: "https://solscan.io/token/Hp3DUJpvjEbvFXM4HKLgGR9AV1r6UjcUHuvEKewx789t",
  decimals: 9,
  logo: "/images/agc-logo.png", // Menggunakan logo baru
  description: "AGRI Coins (AGC) adalah token SPL yang berjalan di jaringan Solana blockchain.",
}
