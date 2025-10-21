"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Plus, Send, Globe } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"

interface Profile {
  role: string
  full_name?: string
}

export function DashboardHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()
      setProfile(profile)
    }
  }

  if (!user) return null

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.substring(0, 2).toUpperCase() || "U"

  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">V</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">VDS_HUB</h1>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">RU</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
            <Link href="/dashboard/billing">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Пополнить</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="https://t.me/vdshub" target="_blank">
              <Send className="w-4 h-4" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{profile?.full_name || user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="w-fit text-xs capitalize">
                    {profile?.role || "user"}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Профиль</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/billing">Биллинг</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/referrals">Реферальная система</Link>
              </DropdownMenuItem>
              {profile?.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Админ панель</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={async () => {
                  await signOut()
                }}
              >
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
