"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

const promoCodes = [
  { code: "WELCOME2025", discount: "10%", uses: 45, maxUses: 100, expires: "31.12.2025", active: true },
  { code: "SUMMER50", discount: "$50", uses: 23, maxUses: 50, expires: "31.08.2025", active: true },
  { code: "FIRSTSERVER", discount: "20%", uses: 89, maxUses: 100, expires: "31.03.2025", active: false },
]

export function PromoCodesManager() {
  const [code, setCode] = useState("")
  const [discount, setDiscount] = useState("")
  const [maxUses, setMaxUses] = useState("")
  const [expires, setExpires] = useState("")

  return (
    <div className="space-y-6">
      <div className="card-gradient rounded-xl p-6 border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-6">Создать промокод</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-foreground">
              Код промокода
            </Label>
            <Input
              id="code"
              placeholder="PROMO2025"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount" className="text-foreground">
              Скидка (% или $)
            </Label>
            <Input
              id="discount"
              placeholder="10% или $50"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-uses" className="text-foreground">
              Максимум использований
            </Label>
            <Input
              id="max-uses"
              type="number"
              placeholder="100"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expires" className="text-foreground">
              Дата истечения
            </Label>
            <Input
              id="expires"
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>
        </div>

        <Button className="mt-6 bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Создать промокод
        </Button>
      </div>

      <div className="card-gradient rounded-xl p-6 border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-6">Активные промокоды</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Код</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Скидка</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Использовано</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Истекает</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Статус</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.map((promo, index) => (
                <tr key={index} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{promo.code}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{promo.discount}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {promo.uses} / {promo.maxUses}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{promo.expires}</td>
                  <td className="py-4 px-4">
                    <Badge variant={promo.active ? "default" : "secondary"}>
                      {promo.active ? "Активен" : "Неактивен"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
