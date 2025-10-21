import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MessageCircle } from "lucide-react"

const tickets = [
  {
    id: "#TICKET-001",
    subject: "Проблема с SSH",
    status: "open",
    updated: "2 часа назад",
    messages: 5,
  },
  {
    id: "#TICKET-002",
    subject: "Вопрос по биллингу",
    status: "answered",
    updated: "1 день назад",
    messages: 3,
  },
  {
    id: "#TICKET-003",
    subject: "Запрос на увеличение лимитов",
    status: "closed",
    updated: "3 дня назад",
    messages: 8,
  },
]

export function SupportTickets() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Мои тикеты</h3>
        <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Новый
        </Button>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 rounded-lg bg-background/30 border border-border/30 hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-muted-foreground">{ticket.id}</p>
              <Badge
                variant={ticket.status === "open" ? "default" : ticket.status === "answered" ? "secondary" : "outline"}
              >
                {ticket.status === "open" ? "Открыт" : ticket.status === "answered" ? "Отвечен" : "Закрыт"}
              </Badge>
            </div>
            <p className="text-sm font-medium text-foreground mb-2">{ticket.subject}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{ticket.updated}</span>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{ticket.messages}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
