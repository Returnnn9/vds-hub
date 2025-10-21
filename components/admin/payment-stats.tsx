import { DollarSign, TrendingUp, CreditCard, Bitcoin } from "lucide-react"

const stats = [
  {
    icon: DollarSign,
    label: "Доход за сегодня",
    value: "$1,245",
    change: "+12% к вчера",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Доход за месяц",
    value: "$12,450",
    change: "+15% к прошлому месяцу",
    positive: true,
  },
  {
    icon: CreditCard,
    label: "Платежи картой",
    value: "$8,200",
    change: "66% от общего",
    positive: true,
  },
  {
    icon: Bitcoin,
    label: "Крипто платежи",
    value: "$4,250",
    change: "34% от общего",
    positive: true,
  },
]

export function PaymentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="card-gradient rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className={`text-xs ${stat.positive ? "text-green-400" : "text-muted-foreground"}`}>{stat.change}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
