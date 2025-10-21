import { Clock } from "lucide-react"

const activities = [
  {
    action: "Вход в систему",
    ip: "192.168.1.50",
    time: "2 минуты назад",
  },
  {
    action: "Пополнение баланса",
    amount: "$50.00",
    time: "1 час назад",
  },
  {
    action: "Создан сервер",
    server: "Production Server",
    time: "3 часа назад",
  },
  {
    action: "Остановлен сервер",
    server: "Test Server",
    time: "5 часов назад",
  },
  {
    action: "Изменен пароль",
    time: "1 день назад",
  },
]

export function RecentActivity() {
  return (
    <div className="card-gradient rounded-xl p-6 border border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-6">Последняя активность</h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.action}</p>
              {activity.ip && <p className="text-xs text-muted-foreground">IP: {activity.ip}</p>}
              {activity.amount && <p className="text-xs text-green-400">{activity.amount}</p>}
              {activity.server && <p className="text-xs text-muted-foreground">{activity.server}</p>}
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
