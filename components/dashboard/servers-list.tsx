import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Server, MoreVertical, Power, Settings } from "lucide-react"

const servers = [
  {
    name: "Production Server",
    ip: "192.168.1.100",
    status: "running",
    plan: "4 vCore",
    ram: "8 GB",
    storage: "80 GB NVMe",
    location: "Moscow",
  },
  {
    name: "Development Server",
    ip: "192.168.1.101",
    status: "running",
    plan: "2 vCore",
    ram: "4 GB",
    storage: "45 GB NVMe",
    location: "Amsterdam",
  },
  {
    name: "Test Server",
    ip: "192.168.1.102",
    status: "stopped",
    plan: "1 vCore",
    ram: "2 GB",
    storage: "30 GB NVMe",
    location: "Frankfurt",
  },
]

export function ServersList() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Мои серверы</h2>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          Создать сервер
        </Button>
      </div>

      <div className="space-y-4">
        {servers.map((server, index) => (
          <div
            key={index}
            className="bg-background/30 rounded-lg p-4 border border-border/30 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{server.name}</h3>
                  <p className="text-sm text-muted-foreground">{server.ip}</p>
                </div>
              </div>
              <Badge variant={server.status === "running" ? "default" : "secondary"} className="capitalize">
                {server.status === "running" ? "Работает" : "Остановлен"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">План</p>
                <p className="text-sm font-medium text-foreground">{server.plan}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">RAM</p>
                <p className="text-sm font-medium text-foreground">{server.ram}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Диск</p>
                <p className="text-sm font-medium text-foreground">{server.storage}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Локация</p>
                <p className="text-sm font-medium text-foreground">{server.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Power className="w-4 h-4" />
                {server.status === "running" ? "Остановить" : "Запустить"}
              </Button>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Управление
              </Button>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
