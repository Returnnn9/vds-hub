"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Paperclip } from "lucide-react"
import { useState } from "react"

const messages = [
  {
    id: 1,
    sender: "support",
    text: "Здравствуйте! Чем могу помочь?",
    time: "14:30",
  },
  {
    id: 2,
    sender: "user",
    text: "Привет! У меня вопрос по серверу",
    time: "14:31",
  },
  {
    id: 3,
    sender: "support",
    text: "Конечно, расскажите подробнее о проблеме",
    time: "14:31",
  },
  {
    id: 4,
    sender: "user",
    text: "Не могу подключиться к серверу по SSH",
    time: "14:32",
  },
  {
    id: 5,
    sender: "support",
    text: "Проверьте, пожалуйста, что сервер запущен и используете правильный IP адрес. Также убедитесь, что SSH ключ добавлен в настройках сервера.",
    time: "14:33",
  },
]

export function SupportChat() {
  const [message, setMessage] = useState("")

  return (
    <div className="card-gradient rounded-xl border border-border/50 flex flex-col h-[600px]">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">Поддержка VDS_HUB</h3>
            <p className="text-xs text-green-400">Онлайн</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/50 border border-border/50 text-foreground"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="bg-transparent">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Введите сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-background/50 border-border/50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim()) {
                console.log("[v0] Sending message:", message)
                setMessage("")
              }
            }}
          />
          <Button className="bg-primary hover:bg-primary/90" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Также доступна поддержка в{" "}
          <a
            href="https://t.me/vdshub_support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Telegram
          </a>
        </p>
      </div>
    </div>
  )
}
