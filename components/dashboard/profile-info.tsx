import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Send, Hash } from "lucide-react"

export function ProfileInfo() {
  return (
    <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
          </Avatar>
          <Badge variant="secondary" className="text-sm">
            User
          </Badge>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
            <p className="text-muted-foreground">Участник с января 2025</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">john@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Telegram</p>
                <p className="text-sm font-medium text-foreground">@johndoe</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Дата регистрации</p>
                <p className="text-sm font-medium text-foreground">15 января 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ID пользователя</p>
                <p className="text-sm font-medium text-foreground">#12345</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Всего пополнений</p>
                <p className="text-xl font-bold text-foreground">$250.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Активных серверов</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Реферальный доход</p>
                <p className="text-xl font-bold text-foreground">$12.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
