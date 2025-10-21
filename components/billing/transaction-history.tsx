import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Server, Gift } from "lucide-react"

const transactions = [
  {
    type: "deposit",
    description: "Пополнение баланса",
    method: "Crypto (BTC)",
    amount: "+$50.00",
    status: "completed",
    date: "18.01.2025 14:30",
  },
  {
    type: "withdrawal",
    description: "Оплата сервера",
    method: "Production Server",
    amount: "-$11.00",
    status: "completed",
    date: "17.01.2025 10:15",
  },
  {
    type: "deposit",
    description: "Пополнение баланса",
    method: "Card",
    amount: "+$100.00",
    status: "completed",
    date: "15.01.2025 16:45",
  },
  {
    type: "withdrawal",
    description: "Оплата сервера",
    method: "Development Server",
    amount: "-$5.00",
    status: "completed",
    date: "15.01.2025 09:20",
  },
  {
    type: "referral",
    description: "Реферальный доход",
    method: "От пользователя #12346",
    amount: "+$2.50",
    status: "completed",
    date: "14.01.2025 12:00",
  },
  {
    type: "deposit",
    description: "Пополнение баланса",
    method: "SBP",
    amount: "+$25.00",
    status: "pending",
    date: "14.01.2025 08:30",
  },
]

export function TransactionHistory() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">История транзакций</h2>

      <div className="space-y-3">
        {transactions.map((transaction, index) => {
          const Icon =
            transaction.type === "deposit"
              ? ArrowUpRight
              : transaction.type === "referral"
                ? Gift
                : transaction.type === "withdrawal"
                  ? ArrowDownRight
                  : Server

          return (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-background/30 border border-border/30 hover:border-primary/50 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === "deposit" || transaction.type === "referral"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    transaction.type === "deposit" || transaction.type === "referral"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.method}</p>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    transaction.type === "deposit" || transaction.type === "referral"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.amount}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>

              <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="capitalize">
                {transaction.status === "completed" ? "Завершено" : "В обработке"}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
