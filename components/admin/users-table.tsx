"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Ban, Shield, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: "#12345",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    balance: "$25.00",
    servers: 3,
    totalSpent: "$250.00",
    joined: "15.01.2025",
  },
  {
    id: "#12346",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    balance: "$50.00",
    servers: 5,
    totalSpent: "$500.00",
    joined: "14.01.2025",
  },
  {
    id: "#12347",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Manager",
    balance: "$100.00",
    servers: 2,
    totalSpent: "$300.00",
    joined: "13.01.2025",
  },
]

export function UsersTable() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск пользователей..." className="pl-10 bg-background/50 border-border/50" />
        </div>
        <Button className="bg-primary hover:bg-primary/90">Экспорт данных</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Пользователь</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Роль</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Баланс</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Серверы</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Всего потрачено</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Дата регистрации</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-4 px-4 text-sm text-muted-foreground">{user.id}</td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={user.role === "Manager" ? "default" : "secondary"}>{user.role}</Badge>
                </td>
                <td className="py-4 px-4 text-sm text-foreground">{user.balance}</td>
                <td className="py-4 px-4 text-sm text-foreground">{user.servers}</td>
                <td className="py-4 px-4 text-sm text-foreground">{user.totalSpent}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{user.joined}</td>
                <td className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Shield className="w-4 h-4" />
                        Изменить роль
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Ban className="w-4 h-4" />
                        Заблокировать
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Удалить
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
