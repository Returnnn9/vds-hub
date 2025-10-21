"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ProfileSettings() {
  const [telegram, setTelegram] = useState("@johndoe")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className="space-y-6">
      <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-6">Настройки профиля</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegram" className="text-foreground">
              Telegram Username
            </Label>
            <Input
              id="telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          <Button className="bg-primary hover:bg-primary/90">Сохранить изменения</Button>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-6">Изменить пароль</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-foreground">
              Текущий пароль
            </Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-foreground">
              Новый пароль
            </Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-new-password" className="text-foreground">
              Подтвердите новый пароль
            </Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          </div>

          <Button className="bg-primary hover:bg-primary/90">Изменить пароль</Button>
        </div>
      </div>
    </div>
  )
}
