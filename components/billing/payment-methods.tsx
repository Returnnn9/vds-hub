"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin, CreditCard, Smartphone } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useData } from "@/contexts/data-context"
import { useToast } from "@/hooks/use-toast"

type PaymentMethod = "crypto" | "card" | "sbp"

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("crypto")
  const [amount, setAmount] = useState("")
  const { user, updateUser } = useAuth()
  const { addTransaction } = useData()
  const { toast } = useToast()

  const methods = [
    {
      id: "crypto" as PaymentMethod,
      name: "Криптовалюта",
      icon: Bitcoin,
      description: "BTC, ETH, USDT",
      fee: "5%",
    },
    {
      id: "card" as PaymentMethod,
      name: "Банковская карта",
      icon: CreditCard,
      description: "Visa, Mastercard",
      fee: "3%",
    },
    {
      id: "sbp" as PaymentMethod,
      name: "СБП",
      icon: Smartphone,
      description: "Система быстрых платежей",
      fee: "0%",
    },
  ]

  return (
    <div className="card-gradient rounded-xl p-6 lg:p-8 border border-border/50">
      <h2 className="text-2xl font-bold text-foreground mb-6">Пополнить баланс</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-foreground">Выберите способ оплаты</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methods.map((method) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedMethod === method.id
                      ? "border-primary bg-primary/10 glow-effect"
                      : "border-border/50 bg-background/30 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedMethod === method.id ? "bg-primary/20" : "bg-muted/30"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${selectedMethod === method.id ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{method.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                      <p className="text-xs text-primary">Комиссия: {method.fee}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-foreground">
            Сумма пополнения
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="50.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-background/50 border-border/50 focus:border-primary"
          />
          <p className="text-xs text-muted-foreground">Минимальная сумма: $10.00</p>
        </div>

        {selectedMethod === "crypto" && <CryptoPayment amount={amount} />}
        {selectedMethod === "card" && <CardPayment amount={amount} />}
        {selectedMethod === "sbp" && <SBPPayment amount={amount} />}
      </div>
    </div>
  )
}

function CryptoPayment({ amount }: { amount: string }) {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const { user, updateUser } = useAuth()
  const { addTransaction } = useData()
  const { toast } = useToast()

  const cryptos = [
    { id: "BTC", name: "Bitcoin", network: "Bitcoin" },
    { id: "ETH", name: "Ethereum", network: "ERC-20" },
    { id: "USDT", name: "Tether", network: "TRC-20" },
  ]

  const handlePayment = () => {
    if (!user || !amount || Number.parseFloat(amount) < 10) return

    const baseAmount = Number.parseFloat(amount)
    const randomAddition = Math.random() * 0.99 + 0.01
    const totalAmount = baseAmount + randomAddition
    const fee = totalAmount * 0.05
    const finalAmount = totalAmount - fee

    setTimeout(() => {
      updateUser({
        balance: user.balance + finalAmount,
        totalTopUps: user.totalTopUps + finalAmount,
      })

      addTransaction({
        userId: user.id,
        type: "topup",
        amount: finalAmount,
        method: "crypto",
        status: "completed",
        description: `Top-up via ${selectedCrypto} (${totalAmount.toFixed(2)} - 5% fee)`,
      })

      toast({
        title: "Платеж обработан!",
        description: `Баланс пополнен на $${finalAmount.toFixed(2)}`,
      })
    }, 2000)

    toast({
      title: "Обработка платежа...",
      description: "Пожалуйста, подождите",
    })
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border/50">
      <div className="space-y-2">
        <Label className="text-foreground">Выберите криптовалюту</Label>
        <div className="grid grid-cols-3 gap-3">
          {cryptos.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto.id)}
              className={`p-3 rounded-lg border transition-all ${
                selectedCrypto === crypto.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <p className="font-semibold text-sm">{crypto.id}</p>
              <p className="text-xs">{crypto.network}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
        <p className="text-sm text-muted-foreground mb-2">
          К сумме будет добавлено случайное значение от $0.01 до $1.00 для идентификации платежа
        </p>
        <p className="text-lg font-semibold text-foreground">
          Итого к оплате: ${amount ? (Number.parseFloat(amount) + Math.random()).toFixed(2) : "0.00"}
        </p>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!amount || Number.parseFloat(amount) < 10}
        onClick={handlePayment}
      >
        Создать счет
      </Button>
    </div>
  )
}

function CardPayment({ amount }: { amount: string }) {
  const { user, updateUser } = useAuth()
  const { addTransaction } = useData()
  const { toast } = useToast()

  const handlePayment = () => {
    if (!user || !amount || Number.parseFloat(amount) < 10) return

    const baseAmount = Number.parseFloat(amount)
    const totalWithFee = baseAmount * 1.03

    setTimeout(() => {
      updateUser({
        balance: user.balance + baseAmount,
        totalTopUps: user.totalTopUps + baseAmount,
      })

      addTransaction({
        userId: user.id,
        type: "topup",
        amount: baseAmount,
        method: "card",
        status: "completed",
        description: `Top-up via Card (${totalWithFee.toFixed(2)} with 3% fee)`,
      })

      toast({
        title: "Платеж обработан!",
        description: `Баланс пополнен на $${baseAmount.toFixed(2)}`,
      })
    }, 2000)

    toast({
      title: "Обработка платежа...",
      description: "Пожалуйста, подождите",
    })
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border/50">
      <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
        <p className="text-sm text-muted-foreground mb-2">Оплата через Crystal Pay</p>
        <p className="text-lg font-semibold text-foreground">
          Итого к оплате: ${amount ? (Number.parseFloat(amount) * 1.03).toFixed(2) : "0.00"} (включая комиссию 3%)
        </p>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!amount || Number.parseFloat(amount) < 10}
        onClick={handlePayment}
      >
        Перейти к оплате
      </Button>
    </div>
  )
}

function SBPPayment({ amount }: { amount: string }) {
  const { user, updateUser } = useAuth()
  const { addTransaction } = useData()
  const { toast } = useToast()

  const handlePayment = () => {
    if (!user || !amount || Number.parseFloat(amount) < 10) return

    const baseAmount = Number.parseFloat(amount)

    setTimeout(() => {
      updateUser({
        balance: user.balance + baseAmount,
        totalTopUps: user.totalTopUps + baseAmount,
      })

      addTransaction({
        userId: user.id,
        type: "topup",
        amount: baseAmount,
        method: "sbp",
        status: "completed",
        description: `Top-up via SBP (no fee)`,
      })

      toast({
        title: "Платеж обработан!",
        description: `Баланс пополнен на $${baseAmount.toFixed(2)}`,
      })
    }, 2000)

    toast({
      title: "Обработка платежа...",
      description: "Пожалуйста, подождите",
    })
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border/50">
      <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
        <p className="text-sm text-muted-foreground mb-2">Оплата через СБП (Crystal Pay)</p>
        <p className="text-lg font-semibold text-foreground">Итого к оплате: ${amount || "0.00"} (без комиссии)</p>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!amount || Number.parseFloat(amount) < 10}
        onClick={handlePayment}
      >
        Создать счет СБП
      </Button>
    </div>
  )
}
