"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"
import { auth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, telegram?: string, referralCode?: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load user from storage on mount
    const currentUser = auth.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const loggedInUser = auth.login(email, password)

    if (loggedInUser) {
      setUser(loggedInUser)
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно вошли в систему",
      })
      router.push("/dashboard")
      return true
    }

    toast({
      title: "Ошибка входа",
      description: "Неверный email или пароль",
      variant: "destructive",
    })
    return false
  }

  const register = async (
    email: string,
    password: string,
    telegram?: string,
    referralCode?: string,
  ): Promise<boolean> => {
    const newUser = auth.register(email, password, telegram, referralCode)

    if (newUser) {
      setUser(newUser)
      toast({
        title: "Регистрация успешна!",
        description: "Добро пожаловать в VDS_HUB",
      })
      router.push("/dashboard")
      return true
    }

    toast({
      title: "Ошибка регистрации",
      description: "Пользователь с таким email уже существует",
      variant: "destructive",
    })
    return false
  }

  const logout = () => {
    auth.logout()
    setUser(null)
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!",
    })
    router.push("/")
  }

  const updateUser = (updates: Partial<User>) => {
    auth.updateUser(updates)
    const updatedUser = auth.getCurrentUser()
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
