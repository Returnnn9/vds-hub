"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, Share2 } from "lucide-react"
import { useState } from "react"

export function ReferralLink() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://vdshub.com/ref/johndoe123"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Share2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Ваша реферальная ссылка</h2>
          <p className="text-sm text-muted-foreground">
            Поделитесь этой ссылкой с друзьями и получайте 10% от их пополнений
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Input value={referralLink} readOnly className="bg-background/50 border-border/50 font-mono text-sm" />
        <Button onClick={copyToClipboard} className="bg-primary hover:bg-primary/90 gap-2 min-w-[120px]">
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Скопировано
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Копировать
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Как это работает:</span> Когда кто-то регистрируется по вашей ссылке и
          пополняет баланс, вы получаете 10% от суммы пополнения на свой счет. Выплаты происходят автоматически.
        </p>
      </div>
    </div>
  )
}
