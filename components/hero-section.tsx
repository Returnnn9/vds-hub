"use client"

import { ArrowRight, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative py-16 lg:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 text-center space-y-10 px-4">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect text-sm font-semibold text-primary animate-pulse-glow">
          <Server className="w-4 h-4" />
          <span className="tracking-tight">Премиум VDS/VPS хостинг</span>
        </div>

        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-balance leading-[1.1] tracking-tighter">
          <span className="text-primary drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] font-extrabold">
            Виртуальные серверы
          </span>
          <br />
          <span className="text-foreground">нового поколения</span>
        </h1>

        <p className="text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed font-medium">
          Мощные VDS с мгновенным развертыванием, гибкой оплатой и профессиональной поддержкой 24/7
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button
            size="lg"
            className="text-base font-semibold px-8 h-12 glow-effect hover:glow-effect-strong transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => {
              const configurator = document.getElementById("server-configurator")
              configurator?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Создать сервер
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base font-semibold px-8 h-12 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 bg-transparent shadow-sm hover:shadow-md"
            onClick={() => router.push("/register")}
          >
            Зарегистрироваться
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-sm font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
            <span className="text-foreground/90">99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
            <span className="text-foreground/90">Мгновенное развертывание</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
            <span className="text-foreground/90">DDoS защита</span>
          </div>
        </div>
      </div>
    </section>
  )
}
