"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, LockIcon, UnlockIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Simulasi data staking aktif
const activeStakings = [
  {
    id: "stk-001",
    amount: 5000,
    option: "12-month",
    optionName: "12 Months Lock",
    apy: 47,
    startDate: "2023-10-15",
    endDate: "2024-10-15",
    earned: 1175.42,
    status: "active",
    progress: 40,
  },
  {
    id: "stk-002",
    amount: 1500,
    option: "3-month",
    optionName: "3 Months Lock",
    apy: 25,
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    earned: 78.12,
    status: "active",
    progress: 70,
  },
  {
    id: "stk-003",
    amount: 10000,
    option: "non-lock",
    optionName: "Non Locking",
    apy: 15,
    startDate: "2023-12-05",
    endDate: null,
    earned: 625.34,
    status: "active",
    progress: null,
  },
]

// Simulasi data riwayat staking
const stakingHistory = [
  {
    id: "stk-h001",
    amount: 2000,
    option: "6-month",
    optionName: "6 Months Lock",
    apy: 35,
    startDate: "2023-05-10",
    endDate: "2023-11-10",
    earned: 350.82,
    status: "completed",
  },
  {
    id: "stk-h002",
    amount: 500,
    option: "3-month",
    optionName: "3 Months Lock",
    apy: 25,
    startDate: "2023-07-15",
    endDate: "2023-10-15",
    earned: 31.25,
    status: "completed",
  },
  {
    id: "stk-h003",
    amount: 1200,
    option: "12-month",
    optionName: "12 Months Lock",
    apy: 47,
    startDate: "2023-01-20",
    endDate: "2023-08-20",
    earned: 0,
    status: "cancelled",
  },
]

// Format tanggal
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Hitung sisa waktu
const calculateTimeRemaining = (endDate: string) => {
  const end = new Date(endDate)
  const now = new Date()
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} left`
  }

  return `${diffDays} day${diffDays > 1 ? "s" : ""} left`
}

export function StakingHistory() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Staking</CardTitle>
        <CardDescription>Manage your active stakings and view history</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Stakings</TabsTrigger>
            <TabsTrigger value="history">Staking History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeStakings.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                <Clock className="mb-2 h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No Active Stakings</h3>
                <p className="text-sm text-muted-foreground">Start staking your AGC coins to earn rewards</p>
                <Button className="mt-4">Start Staking</Button>
              </div>
            ) : (
              activeStakings.map((staking) => (
                <div key={staking.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{staking.amount.toLocaleString()} AGC</h3>
                        <Badge variant={staking.option === "non-lock" ? "outline" : "default"} className="ml-2">
                          {staking.option === "non-lock" ? (
                            <UnlockIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <LockIcon className="mr-1 h-3 w-3" />
                          )}
                          {staking.optionName}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {staking.apy}% APY • Started {formatDate(staking.startDate)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-500">
                        +{staking.earned.toLocaleString()} AGC earned
                      </div>
                      {staking.endDate && (
                        <div className="mt-1 text-xs text-muted-foreground">Ends {formatDate(staking.endDate)}</div>
                      )}
                    </div>
                  </div>

                  {staking.progress !== null && (
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{calculateTimeRemaining(staking.endDate!)}</span>
                      </div>
                      <Progress value={staking.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mt-4 flex justify-end space-x-2">
                    {staking.option === "non-lock" && (
                      <Button variant="outline" size="sm">
                        Withdraw
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Claim Rewards
                    </Button>
                    <Button size="sm">Add More</Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {stakingHistory.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                <Clock className="mb-2 h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">No Staking History</h3>
                <p className="text-sm text-muted-foreground">Your completed stakings will appear here</p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 gap-4 border-b p-4 text-sm font-medium text-muted-foreground">
                  <div>Amount</div>
                  <div>Type</div>
                  <div>Period</div>
                  <div>Earned</div>
                  <div>Status</div>
                </div>
                {stakingHistory.map((staking) => (
                  <div key={staking.id} className="grid grid-cols-5 gap-4 border-b p-4 last:border-0">
                    <div className="font-medium">{staking.amount.toLocaleString()} AGC</div>
                    <div>{staking.optionName}</div>
                    <div>
                      {formatDate(staking.startDate)} - {formatDate(staking.endDate!)}
                    </div>
                    <div className={staking.status === "completed" ? "text-green-500" : ""}>
                      {staking.status === "completed" ? <>+{staking.earned.toLocaleString()} AGC</> : <>-</>}
                    </div>
                    <div>
                      {staking.status === "completed" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      ) : staking.status === "cancelled" ? (
                        <Badge variant="outline" className="bg-red-50 text-red-600">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Cancelled
                        </Badge>
                      ) : (
                        <Badge>
                          <Clock className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
