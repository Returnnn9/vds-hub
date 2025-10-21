"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Power, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const servers = [
  {
    id: "#SRV-001",
    name: "Production Server",
    owner: "john@example.com",
    plan: "4 vCore",
    status: "running",
    ip: "192.168.1.100",
    location: "Moscow",
    created: "15.01.2025",
  },
  {
    id: "#SRV-002",
    name: "Development Server",
    owner: "jane@example.com",
    plan: "2 vCore",
    status: "running",
    ip: "192.168.1.101",
    location: "Amsterdam",
    created: "14.01.2025",
  },
  {
    id: "#SRV-003",
    name: "Test Server",
    owner: "mike@example.com",
    plan: "1 vCore",
    status: "stopped",
    ip: "192.168.1.102",
    location: "Frankfurt",
    created: "13.01.2025",
  },
]

export function ServersTable() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск серверов..." className="pl-10 bg-background/50 border-border/50" />
        </div>
        <Button className="bg-primary hover:bg-primary/90">Экспорт данных</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Название</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Владелец</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">План</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Статус</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">IP</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Локация</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Создан</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Действия</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server, index) => (
              <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-4 px-4 text-sm text-muted-foreground">{server.id}</td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">{server.name}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{server.owner}</td>
                <td className="py-4 px-4 text-sm text-foreground">{server.plan}</td>
                <td className="py-4 px-4">
                  <Badge variant={server.status === "running" ? "default" : "secondary"}>
                    {server.status === "running" ? "Работает" : "Остановлен"}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm text-foreground">{server.ip}</td>
                <td className="py-4 px-4 text-sm text-foreground">{server.location}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{server.created}</td>
                <td className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Power className="w-4 h-4" />
                        {server.status === "running" ? "Остановить" : "Запустить"}
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
