import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    referrer: "john@example.com",
    referral: "user12346@example.com",
    deposit: "$50.00",
    commission: "$5.00",
    date: "18.01.2025 14:30",
  },
  {
    referrer: "jane@example.com",
    referral: "user12347@example.com",
    deposit: "$100.00",
    commission: "$10.00",
    date: "17.01.2025 16:45",
  },
  {
    referrer: "john@example.com",
    referral: "user12348@example.com",
    deposit: "$25.00",
    commission: "$2.50",
    date: "16.01.2025 12:15",
  },
  {
    referrer: "mike@example.com",
    referral: "user12349@example.com",
    deposit: "$200.00",
    commission: "$20.00",
    date: "15.01.2025 09:30",
  },
]

export function ReferralActivityTable() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">Последняя активность</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Реферер</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Реферал</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Пополнение</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Комиссия</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Дата</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {activity.referrer.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{activity.referrer}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{activity.referral}</td>
                <td className="py-4 px-4 text-sm text-foreground">{activity.deposit}</td>
                <td className="py-4 px-4">
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {activity.commission}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
