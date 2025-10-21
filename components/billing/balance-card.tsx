import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react"

export function BalanceCard() {
  return (
    <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Текущий баланс</p>
            <p className="text-4xl font-bold text-foreground mb-2">$25.00</p>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+$50.00 за последний месяц</span>
            </div>
          </div>
        </div>

        <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
          <ArrowUpRight className="w-5 h-5" />
          Пополнить баланс
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Всего пополнений</p>
          <p className="text-2xl font-bold text-foreground">$250.00</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Потрачено за месяц</p>
          <p className="text-2xl font-bold text-foreground">$45.00</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Средний расход</p>
          <p className="text-2xl font-bold text-foreground">$1.50/день</p>
        </div>
      </div>
    </div>
  )
}
