"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Check, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const payments = [
  {
    id: "#PAY-001",
    user: "john@example.com",
    amount: "$50.00",
    method: "Crypto (BTC)",
    status: "completed",
    date: "18.01.2025 14:30",
  },
  {
    id: "#PAY-002",
    user: "jane@example.com",
    amount: "$100.00",
    method: "Card",
    status: "completed",
    date: "17.01.2025 16:45",
  },
  {
    id: "#PAY-003",
    user: "mike@example.com",
    amount: "$25.00",
    method: "SBP",
    status: "pending",
    date: "17.01.2025 08:30",
  },
  {
    id: "#PAY-004",
    user: "sarah@example.com",
    amount: "$75.00",
    method: "Crypto (ETH)",
    status: "completed",
    date: "16.01.2025 12:15",
  },
  {
    id: "#PAY-005",
    user: "tom@example.com",
    amount: "$200.00",
    method: "Card",
    status: "failed",
    date: "16.01.2025 09:00",
  },
]

export function PaymentsTable() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск платежей..." className="pl-10 bg-background/50 border-border/50" />
        </div>
        <Button className="bg-primary hover:bg-primary/90">Экспорт данных</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Пользователь</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Сумма</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Метод</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Статус</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Дата</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Действия</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-4 px-4 text-sm text-muted-foreground">{payment.id}</td>
                <td className="py-4 px-4 text-sm text-foreground">{payment.user}</td>
                <td className="py-4 px-4 text-sm font-semibold text-foreground">{payment.amount}</td>
                <td className="py-4 px-4 text-sm text-foreground">{payment.method}</td>
                <td className="py-4 px-4">
                  <Badge
                    variant={
                      payment.status === "completed"
                        ? "default"
                        : payment.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {payment.status === "completed"
                      ? "Завершено"
                      : payment.status === "pending"
                        ? "В обработке"
                        : "Отклонено"}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{payment.date}</td>
                <td className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Check className="w-4 h-4" />
                        Подтвердить
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <X className="w-4 h-4" />
                        Отклонить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
