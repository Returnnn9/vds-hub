import { Users, Server, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Всего пользователей",
    value: "1,234",
    change: "+48 за неделю",
    positive: true,
  },
  {
    icon: Server,
    label: "Активные серверы",
    value: "856",
    change: "+23 за неделю",
    positive: true,
  },
  {
    icon: DollarSign,
    label: "Доход за месяц",
    value: "$12,450",
    change: "+15% к прошлому месяцу",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Средний чек",
    value: "$45.20",
    change: "+$2.30 к прошлому месяцу",
    positive: true,
  },
]

export function AdminStatsCards() {
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
