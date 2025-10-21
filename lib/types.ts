export interface User {
  id: string
  email: string
  role: "user" | "manager" | "admin"
  balance: number
  registeredAt: string
  telegram?: string
  referralCode: string
  referredBy?: string
  totalTopUps: number
}

export interface Server {
  id: string
  userId: string
  name: string
  plan: string
  vCores: number
  ram: number
  storage: number
  status: "active" | "stopped" | "suspended"
  ip: string
  createdAt: string
  expiresAt: string
  billingPeriod: "hour" | "month" | "3months" | "year"
  price: number
}

export interface Transaction {
  id: string
  userId: string
  type: "topup" | "purchase" | "referral" | "withdrawal"
  amount: number
  method?: "crypto" | "card" | "sbp"
  status: "pending" | "completed" | "failed"
  createdAt: string
  description: string
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  ip: string
  timestamp: string
  details?: string
}

export interface PromoCode {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  maxUses: number
  currentUses: number
  expiresAt: string
  active: boolean
}

export interface Referral {
  id: string
  referrerId: string
  referredId: string
  earnings: number
  createdAt: string
}

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  status: "open" | "in-progress" | "closed"
  priority: "low" | "medium" | "high"
  messages: SupportMessage[]
  createdAt: string
  updatedAt: string
}

export interface SupportMessage {
  id: string
  ticketId: string
  userId: string
  message: string
  isAdmin: boolean
  createdAt: string
}
