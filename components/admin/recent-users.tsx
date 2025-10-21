import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const users = [
  { name: "John Doe", email: "john@example.com", role: "User", joined: "2 часа назад" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", joined: "5 часов назад" },
  { name: "Mike Johnson", email: "mike@example.com", role: "Manager", joined: "1 день назад" },
  { name: "Sarah Williams", email: "sarah@example.com", role: "User", joined: "2 дня назад" },
  { name: "Tom Brown", email: "tom@example.com", role: "User", joined: "3 дня назад" },
]

export function RecentUsers() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">Новые пользователи</h2>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/20 text-primary">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={user.role === "Manager" ? "default" : "secondary"} className="text-xs">
                {user.role}
              </Badge>
              <p className="text-xs text-muted-foreground">{user.joined}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
