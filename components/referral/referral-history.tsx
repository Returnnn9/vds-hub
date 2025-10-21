import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign } from "lucide-react"

const referrals = [
  {
    user: "user12346@example.com",
    joined: "18.01.2025",
    totalDeposits: "$150.00",
    yourEarnings: "$15.00",
    status: "active",
  },
  {
    user: "user12347@example.com",
    joined: "17.01.2025",
    totalDeposits: "$200.00",
    yourEarnings: "$20.00",
    status: "active",
  },
  {
    user: "user12348@example.com",
    joined: "15.01.2025",
    totalDeposits: "$75.00",
    yourEarnings: "$7.50",
    status: "active",
  },
  {
    user: "user12349@example.com",
    joined: "14.01.2025",
    totalDeposits: "$500.00",
    yourEarnings: "$50.00",
    status: "active",
  },
  {
    user: "user12350@example.com",
    joined: "12.01.2025",
    totalDeposits: "$100.00",
    yourEarnings: "$10.00",
    status: "inactive",
  },
]

export function ReferralHistory() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">Ваши рефералы</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Пользователь</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Дата регистрации</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Всего пополнений</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Ваш доход</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Статус</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {referral.user.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{referral.user}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{referral.joined}</td>
                <td className="py-4 px-4 text-sm text-foreground">{referral.totalDeposits}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">{referral.yourEarnings}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={referral.status === "active" ? "default" : "secondary"}>
                    {referral.status === "active" ? "Активен" : "Неактивен"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
