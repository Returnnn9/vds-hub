"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Server, Transaction, PromoCode, Referral, SupportTicket } from "@/lib/types"
import { storage, KEYS } from "@/lib/storage"
import { useAuth } from "./auth-context"
import { useToast } from "@/hooks/use-toast"

interface DataContextType {
  servers: Server[]
  transactions: Transaction[]
  promoCodes: PromoCode[]
  referrals: Referral[]
  supportTickets: SupportTicket[]
  createServer: (server: Omit<Server, "id" | "userId" | "createdAt">) => void
  deleteServer: (serverId: string) => void
  updateServer: (serverId: string, updates: Partial<Server>) => void
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => void
  createPromoCode: (promoCode: Omit<PromoCode, "id" | "currentUses">) => void
  applyPromoCode: (code: string, amount: number) => number
  createSupportTicket: (ticket: Omit<SupportTicket, "id" | "createdAt" | "updatedAt">) => void
  refreshData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [servers, setServers] = useState<Server[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([])

  const loadData = () => {
    setServers(storage.get<Server[]>(KEYS.SERVERS) || [])
    setTransactions(storage.get<Transaction[]>(KEYS.TRANSACTIONS) || [])
    setPromoCodes(storage.get<PromoCode[]>(KEYS.PROMO_CODES) || [])
    setReferrals(storage.get<Referral[]>(KEYS.REFERRALS) || [])
    setSupportTickets(storage.get<SupportTicket[]>(KEYS.SUPPORT_TICKETS) || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  const createServer = (serverData: Omit<Server, "id" | "userId" | "createdAt">) => {
    if (!user) return

    const newServer: Server = {
      ...serverData,
      id: generateId(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    }

    const updatedServers = [...servers, newServer]
    setServers(updatedServers)
    storage.set(KEYS.SERVERS, updatedServers)

    // Deduct from balance
    updateUser({ balance: user.balance - serverData.price })

    // Add transaction
    addTransaction({
      userId: user.id,
      type: "purchase",
      amount: -serverData.price,
      status: "completed",
      description: `Purchased server: ${serverData.name}`,
    })

    toast({
      title: "Сервер создан!",
      description: `Сервер ${serverData.name} успешно создан`,
    })
  }

  const deleteServer = (serverId: string) => {
    const updatedServers = servers.filter((s) => s.id !== serverId)
    setServers(updatedServers)
    storage.set(KEYS.SERVERS, updatedServers)

    toast({
      title: "Сервер удален",
      description: "Сервер успешно удален",
    })
  }

  const updateServer = (serverId: string, updates: Partial<Server>) => {
    const updatedServers = servers.map((s) => (s.id === serverId ? { ...s, ...updates } : s))
    setServers(updatedServers)
    storage.set(KEYS.SERVERS, updatedServers)
  }

  const addTransaction = (transactionData: Omit<Transaction, "id" | "createdAt">) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    storage.set(KEYS.TRANSACTIONS, updatedTransactions)

    // Handle referral commission
    if (transactionData.type === "topup" && transactionData.status === "completed" && user) {
      const userReferrals = referrals.filter((r) => r.referredId === user.id)
      if (userReferrals.length > 0) {
        const commission = transactionData.amount * 0.1
        const referral = userReferrals[0]

        // Update referral earnings
        const updatedReferrals = referrals.map((r) =>
          r.id === referral.id ? { ...r, earnings: r.earnings + commission } : r,
        )
        setReferrals(updatedReferrals)
        storage.set(KEYS.REFERRALS, updatedReferrals)
      }
    }
  }

  const createPromoCode = (promoCodeData: Omit<PromoCode, "id" | "currentUses">) => {
    const newPromoCode: PromoCode = {
      ...promoCodeData,
      id: generateId(),
      currentUses: 0,
    }

    const updatedPromoCodes = [...promoCodes, newPromoCode]
    setPromoCodes(updatedPromoCodes)
    storage.set(KEYS.PROMO_CODES, updatedPromoCodes)

    toast({
      title: "Промокод создан",
      description: `Промокод ${promoCodeData.code} успешно создан`,
    })
  }

  const applyPromoCode = (code: string, amount: number): number => {
    const promoCode = promoCodes.find(
      (p) => p.code === code && p.active && p.currentUses < p.maxUses && new Date(p.expiresAt) > new Date(),
    )

    if (!promoCode) {
      toast({
        title: "Ошибка",
        description: "Промокод недействителен или истек",
        variant: "destructive",
      })
      return amount
    }

    // Update promo code usage
    const updatedPromoCodes = promoCodes.map((p) =>
      p.id === promoCode.id ? { ...p, currentUses: p.currentUses + 1 } : p,
    )
    setPromoCodes(updatedPromoCodes)
    storage.set(KEYS.PROMO_CODES, updatedPromoCodes)

    const discount = promoCode.type === "percentage" ? amount * (promoCode.discount / 100) : promoCode.discount

    toast({
      title: "Промокод применен!",
      description: `Скидка: ${discount.toFixed(2)}$`,
    })

    return amount - discount
  }

  const createSupportTicket = (ticketData: Omit<SupportTicket, "id" | "createdAt" | "updatedAt">) => {
    if (!user) return

    const newTicket: SupportTicket = {
      ...ticketData,
      id: generateId(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedTickets = [...supportTickets, newTicket]
    setSupportTickets(updatedTickets)
    storage.set(KEYS.SUPPORT_TICKETS, updatedTickets)

    toast({
      title: "Тикет создан",
      description: "Ваш запрос отправлен в поддержку",
    })
  }

  const refreshData = () => {
    loadData()
  }

  return (
    <DataContext.Provider
      value={{
        servers,
        transactions,
        promoCodes,
        referrals,
        supportTickets,
        createServer,
        deleteServer,
        updateServer,
        addTransaction,
        createPromoCode,
        applyPromoCode,
        createSupportTicket,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
