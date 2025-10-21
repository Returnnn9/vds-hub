"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useData } from "@/contexts/data-context"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ServerPlanCard } from "@/components/server-plan-card"

type BillingPeriod = "hour" | "month" | "3months" | "year"

const billingPeriods = [
  { value: "hour" as BillingPeriod, label: "Час", labelEn: "Hour" },
  { value: "month" as BillingPeriod, label: "Месяц", labelEn: "Month" },
  { value: "3months" as BillingPeriod, label: "3 месяца", labelEn: "3 Months" },
  { value: "year" as BillingPeriod, label: "Год", labelEn: "Year" },
]

const serverPlans = [
  {
    name: "1 vCore",
    cores: 1,
    ram: 2,
    storage: 30,
    prices: { hour: 0.05, month: 1.6, "3months": 4.5, year: 16 },
  },
  {
    name: "2 vCore",
    cores: 2,
    ram: 4,
    storage: 45,
    prices: { hour: 0.17, month: 5, "3months": 14, year: 50 },
  },
  {
    name: "3 vCore",
    cores: 3,
    ram: 6,
    storage: 70,
    prices: { hour: 0.23, month: 7, "3months": 20, year: 70 },
  },
  {
    name: "4 vCore",
    cores: 4,
    ram: 8,
    storage: 80,
    prices: { hour: 0.37, month: 11, "3months": 31, year: 110 },
    popular: true,
  },
  {
    name: "6 vCore",
    cores: 6,
    ram: 12,
    storage: 110,
    prices: { hour: 0.5, month: 15, "3months": 42, year: 150 },
  },
  {
    name: "8 vCore",
    cores: 8,
    ram: 16,
    storage: 140,
    prices: { hour: 0.63, month: 19, "3months": 53, year: 190 },
  },
  {
    name: "8 vCore Pro",
    cores: 8,
    ram: 32,
    storage: 220,
    prices: { hour: 0.9, month: 26, "3months": 73, year: 260 },
  },
  {
    name: "12 vCore",
    cores: 12,
    ram: 24,
    storage: 250,
    prices: { hour: 1.25, month: 36, "3months": 101, year: 360 },
  },
]

export function ServerConfigurator() {
  const [serverName, setServerName] = useState("")
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("hour")
  const [showMore, setShowMore] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<(typeof serverPlans)[0] | null>(null)
  const { user } = useAuth()
  const { createServer } = useData()
  const router = useRouter()

  const visiblePlans = showMore ? serverPlans : serverPlans.slice(0, 8)

  const handleCreateServer = (plan: (typeof serverPlans)[0]) => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!serverName.trim()) {
      alert("Пожалуйста, введите название сервера")
      return
    }

    const price = plan.prices[billingPeriod]

    if (user.balance < price) {
      alert("Недостаточно средств на балансе")
      router.push("/dashboard/billing")
      return
    }

    // Calculate expiration date
    const expiresAt = new Date()
    if (billingPeriod === "hour") expiresAt.setHours(expiresAt.getHours() + 1)
    else if (billingPeriod === "month") expiresAt.setMonth(expiresAt.getMonth() + 1)
    else if (billingPeriod === "3months") expiresAt.setMonth(expiresAt.getMonth() + 3)
    else if (billingPeriod === "year") expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    createServer({
      name: serverName,
      plan: plan.name,
      vCores: plan.cores,
      ram: plan.ram,
      storage: plan.storage,
      status: "active",
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      expiresAt: expiresAt.toISOString(),
      billingPeriod,
      price,
    })

    router.push("/dashboard")
  }

  return (
    <section className="space-y-6">
      <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Ваш новый Виртуальный сервер</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="server-name" className="text-foreground">
              Название
            </Label>
            <Input
              id="server-name"
              placeholder="Мой первый сервер"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Тип оплаты</Label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {billingPeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setBillingPeriod(period.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    billingPeriod === period.value
                      ? "bg-primary text-primary-foreground shadow-lg glow-effect"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Выберите тариф</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {visiblePlans.map((plan, index) => (
                <ServerPlanCard
                  key={index}
                  plan={plan}
                  billingPeriod={billingPeriod}
                  onSelect={() => handleCreateServer(plan)}
                />
              ))}
            </div>

            {serverPlans.length > 8 && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={() => setShowMore(!showMore)} className="w-full max-w-xs">
                  {showMore ? "Показать меньше" : "Показать еще"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
