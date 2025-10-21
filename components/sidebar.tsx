"use client"

import { Server, Wrench, MessageCircle, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: Server, label: "Виртуальный сервер", href: "/" },
  { icon: Wrench, label: "Мои услуги", href: "/dashboard" },
  { icon: MessageCircle, label: "Поддержка", href: "/dashboard/support" },
  { icon: Users, label: "Реферальная система", href: "/dashboard/referrals" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border/50 bg-sidebar/50 backdrop-blur-sm hidden lg:block sticky top-0 h-screen">
      <nav className="p-4 space-y-1.5">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full transition-all duration-300",
                  isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2",
                )}
              />

              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110",
                )}
              />

              <span
                className={cn(
                  "font-medium text-sm transition-all duration-300",
                  isActive ? "font-semibold" : "group-hover:translate-x-0.5",
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl" />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
