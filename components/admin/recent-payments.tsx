import { Badge } from "@/components/ui/badge"
import { DollarSign } from "lucide-react"

const payments = [
  { user: "john@example.com", amount: "$50.00", method: "Crypto", status: "completed", time: "5 минут назад" },
  { user: "jane@example.com", amount: "$100.00", method: "Card", status: "completed", time: "15 минут назад" },
  { user: "mike@example.com", amount: "$25.00", method: "SBP", status: "pending", time: "30 минут назад" },
  { user: "sarah@example.com", amount: "$75.00", method: "Crypto", status: "completed", time: "1 час назад" },
  { user: "tom@example.com", amount: "$200.00", method: "Card", status: "completed", time: "2 часа назад" },
]

export function RecentPayments() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">Последние платежи</h2>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{payment.amount}</p>
              <p className="text-xs text-muted-foreground truncate">{payment.user}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                {payment.method}
              </Badge>
              <p className="text-xs text-muted-foreground">{payment.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
