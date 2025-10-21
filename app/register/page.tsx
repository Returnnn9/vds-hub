import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Назад на главную
          </Button>
        </Link>

        <div className="card-gradient rounded-xl p-8 border border-border/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 rounded-lg bg-primary items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Создать аккаунт</h1>
            <p className="text-muted-foreground">Присоединяйтесь к VDS_HUB сегодня</p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
