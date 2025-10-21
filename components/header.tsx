"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function Header() {
  const [language, setLanguage] = useState<"ru" | "en">("ru")
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ru" ? "en" : "ru"))
  }

  const t = {
    ru: {
      login: "Войти",
      register: "Зарегистрироваться",
      russian: "Русский",
    },
    en: {
      login: "Login",
      register: "Register",
      russian: "Russian",
    },
  }

  return (
    <header className="border-b-2 border-border/30 backdrop-blur-md bg-background/70 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
            <span className="text-primary-foreground font-bold text-xl">V</span>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">VDS_HUB</h1>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 font-medium">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === "ru" ? t.ru.russian : "English"}</span>
          </Button>
          {user ? (
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary hover:bg-primary/90 font-semibold shadow-sm hover:shadow-md">
                Панель управления
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm" className="font-semibold bg-transparent">
                  {t[language].login}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90 font-semibold shadow-sm hover:shadow-md">
                  {t[language].register}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
