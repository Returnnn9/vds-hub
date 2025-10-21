"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/actions/auth"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn(email, password)

      if (result.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError("Ошибка входа")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
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
          Пароль
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
          <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Запомнить меня
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Забыли пароль?
        </Link>
      </div>

      <div className="pt-2">
        <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/30">
          <p className="text-xs text-muted-foreground text-center">Защита от ботов (Cloudflare Turnstile)</p>
          <div className="mt-2 h-16 bg-background/30 rounded border border-border/30 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">[ Captcha Widget ]</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Вход...
          </>
        ) : (
          "Войти"
        )}
      </Button>
    </form>
  )
}
