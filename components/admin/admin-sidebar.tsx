"use client"

import {
  LayoutDashboard,
  Users,
  Server,
  CreditCard,
  Tag,
  Bell,
  BarChart3,
  Settings,
  Shield,
  Users2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "Обзор", href: "/admin" },
  { icon: Users, label: "Пользователи", href: "/admin/users" },
  { icon: Server, label: "Серверы", href: "/admin/servers" },
  { icon: CreditCard, label: "Платежи", href: "/admin/payments" },
  { icon: Tag, label: "Промокоды", href: "/admin/promo-codes" },
  { icon: Users2, label: "Рефералы", href: "/admin/referrals" },
  { icon: Bell, label: "Уведомления", href: "/admin/notifications" },
  { icon: BarChart3, label: "Аналитика", href: "/admin/analytics" },
  { icon: Settings, label: "Настройки", href: "/admin/settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border/50 bg-sidebar/50 backdrop-blur-sm hidden lg:block">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/20 border border-destructive/30">
          <Shield className="w-4 h-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">Режим администратора</span>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg glow-effect"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
