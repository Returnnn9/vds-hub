import { Users, DollarSign, TrendingUp, Percent } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Всего рефералов",
    value: "456",
    change: "+48 за месяц",
    positive: true,
  },
  {
    icon: DollarSign,
    label: "Выплачено комиссий",
    value: "$2,450",
    change: "+$250 за месяц",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Активных рефереров",
    value: "89",
    change: "19.5% от всех пользователей",
    positive: true,
  },
  {
    icon: Percent,
    label: "Средняя комиссия",
    value: "10%",
    change: "От пополнений",
    positive: true,
  },
]

export function ReferralStatsAdmin() {
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
