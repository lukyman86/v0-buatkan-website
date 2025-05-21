"use client"
import { PriceChart } from "@/components/price-chart"
import { StakingCalculator } from "@/components/staking-calculator"
import { StakingHistory } from "@/components/staking-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lock, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function StakingClientPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    // Redirect jika user bukan admin atau member
    if (!isLoading && !user) {
      router.push("/login?redirect=/staking")
    }
  }, [isLoading, user, router])

  // Tampilkan loading atau halaman login jika belum login
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return null // Akan di-redirect ke halaman login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">AGC Staking</h1>
      <p className="mb-6 text-muted-foreground flex items-center">
        Stake AGC/USDT and earn up to 47% APY
        <Link
          href="https://coinmarketcap.com/currencies/tether/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-xs text-blue-500 flex items-center hover:underline"
        >
          USDT Price on CoinMarketCap <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </p>

      <div className="mb-8">
        <PriceChart />
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <StakingCalculator />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staking Options</CardTitle>
              <CardDescription>Choose the best staking option for your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">12 Months Lock</h3>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Lock your AGC coins for 12 months</div>
                <div className="mt-2 text-2xl font-bold text-primary">47% APY</div>
                <div className="mt-1 text-sm">Best option for long-term holders</div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">6 Months Lock</h3>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Lock your AGC coins for 6 months</div>
                <div className="mt-2 text-2xl font-bold text-primary">35% APY</div>
                <div className="mt-1 text-sm">Balanced option for medium-term holders</div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">3 Months Lock</h3>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Lock your AGC coins for 3 months</div>
                <div className="mt-2 text-2xl font-bold text-primary">25% APY</div>
                <div className="mt-1 text-sm">Good option for short-term holders</div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Non Locking</h3>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Stake without locking period, withdraw anytime</div>
                <div className="mt-2 text-2xl font-bold text-primary">15% APY</div>
                <div className="mt-1 text-sm">Flexible option with lower returns</div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Bonus Deposit</AlertTitle>
            <AlertDescription>Get 15% bonus AGC coins when staking more than 1,000,000 AGC!</AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="mb-8">
        <StakingHistory />
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Staking FAQ</CardTitle>
            <CardDescription>Frequently asked questions about AGC staking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium">What is AGC staking?</h3>
                  <p className="text-sm text-muted-foreground">
                    AGC staking is a process where you lock your AGC coins in a smart contract to support the network
                    and earn rewards in return.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">What is the minimum staking amount?</h3>
                  <p className="text-sm text-muted-foreground">The minimum staking amount is 100 AGC coins.</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I withdraw my staked AGC before the lock period ends?</h3>
                  <p className="text-sm text-muted-foreground">
                    No, you cannot withdraw your staked AGC before the lock period ends for locked staking options.
                    However, you can withdraw anytime for the non-locking option.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium">How are rewards calculated?</h3>
                  <p className="text-sm text-muted-foreground">
                    Rewards are calculated based on the APY (Annual Percentage Yield) of your chosen staking option, the
                    amount of AGC staked, and the staking duration.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">When are rewards distributed?</h3>
                  <p className="text-sm text-muted-foreground">
                    Rewards are distributed monthly and can be claimed at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">What is the bonus deposit?</h3>
                  <p className="text-sm text-muted-foreground">
                    When you stake more than 1,000,000 AGC coins, you receive a 15% bonus deposit in AGC coins. This
                    bonus is added to your staking amount and also earns rewards.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium">How secure is AGC staking?</h3>
                  <p className="text-sm text-muted-foreground">
                    AGC staking is secured by smart contracts on the blockchain, which have been audited for security
                    vulnerabilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">What happens if there's a network issue?</h3>
                  <p className="text-sm text-muted-foreground">
                    In case of network issues, your staked AGC and earned rewards are safe as they are recorded on the
                    blockchain.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I stake from a hardware wallet?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can stake AGC coins from any compatible wallet, including hardware wallets.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
