import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card-gradient rounded-xl p-8 border border-border/50 shadow-2xl text-center">
          <div className="inline-flex w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">Проверьте вашу почту</h1>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            Мы отправили письмо с подтверждением на вашу почту. Пожалуйста, перейдите по ссылке в письме, чтобы
            активировать аккаунт.
          </p>

          <div className="bg-muted/30 rounded-lg p-4 mb-6 border border-border/30">
            <p className="text-sm text-muted-foreground">
              Не получили письмо? Проверьте папку "Спам" или подождите несколько минут.
            </p>
          </div>

          <Link href="/login">
            <Button variant="outline" className="w-full bg-transparent">
              Вернуться к входу
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
