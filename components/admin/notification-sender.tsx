"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Send } from "lucide-react"
import { useState } from "react"

export function NotificationSender() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [sendToSite, setSendToSite] = useState(true)
  const [sendToEmail, setSendToEmail] = useState(false)

  return (
    <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
      <h3 className="text-xl font-bold text-foreground mb-6">Отправить уведомление</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground">
            Заголовок
          </Label>
          <Input
            id="title"
            placeholder="Важное обновление"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background/50 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Сообщение
          </Label>
          <Textarea
            id="message"
            placeholder="Введите текст уведомления..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="bg-background/50 border-border/50 resize-none"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-foreground">Каналы отправки</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="site" checked={sendToSite} onCheckedChange={(checked) => setSendToSite(checked === true)} />
              <Label htmlFor="site" className="text-sm text-muted-foreground cursor-pointer">
                Уведомление на сайте
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="email"
                checked={sendToEmail}
                onCheckedChange={(checked) => setSendToEmail(checked === true)}
              />
              <Label htmlFor="email" className="text-sm text-muted-foreground cursor-pointer">
                Email рассылка
              </Label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Send className="w-4 h-4" />
            Отправить всем пользователям
          </Button>
        </div>
      </div>
    </div>
  )
}
