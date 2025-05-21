import type { Metadata } from "next"
import StakingClientPage from "./StakingClientPage"

export const metadata: Metadata = {
  title: "AGC Staking - Agri Ecosystem Fund",
  description: "Stake your AGC coins and earn rewards",
}

export default function StakingPage() {
  return <StakingClientPage />
}
