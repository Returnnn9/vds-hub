"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [telegram, setTelegram] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    if (!acceptTerms) {
      setError("Необходимо принять условия использования")
      return
    }

    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов")
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(email, password, fullName)

      if (result.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError("Ошибка регистрации")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-foreground">
          Полное имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Иван Иванов"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="bg-background/50 border-border/50 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background/50 border-border/50 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Пароль <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="bg-background/50 border-border/50 focus:border-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Минимум 8 символов</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-foreground">
          Подтвердите пароль <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-background/50 border-border/50 focus:border-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telegram" className="text-foreground">
          Telegram Username <span className="text-muted-foreground text-xs">(опционально)</span>
        </Label>
        <Input
          id="telegram"
          type="text"
          placeholder="@username"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="bg-background/50 border-border/50 focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="promo-code" className="text-foreground">
          Промокод <span className="text-muted-foreground text-xs">(опционально)</span>
        </Label>
        <Input
          id="promo-code"
          type="text"
          placeholder="Введите промокод"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="bg-background/50 border-border/50 focus:border-primary"
        />
      </div>

      <div className="flex items-start gap-2 pt-2">
        <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked === true)} />
        <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
          Я принимаю{" "}
          <Link href="/terms" className="text-primary hover:underline">
            условия использования
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            политику конфиденциальности
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11" disabled={isLoading || !acceptTerms}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Регистрация...
          </>
        ) : (
          "Создать аккаунт"
        )}
      </Button>
    </form>
  )
}
