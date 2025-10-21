// Local storage utilities for data persistence
const STORAGE_KEYS = {
  USER: "vds_hub_user",
  USERS: "vds_hub_users",
  SERVERS: "vds_hub_servers",
  TRANSACTIONS: "vds_hub_transactions",
  ACTIVITY_LOGS: "vds_hub_activity_logs",
  PROMO_CODES: "vds_hub_promo_codes",
  REFERRALS: "vds_hub_referrals",
  SUPPORT_TICKETS: "vds_hub_support_tickets",
}

export const storage = {
  get: (key: string): any | null => {
    if (typeof window === "undefined") return null
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },

  set: (key: string, value: any): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear: (): void => {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}

export const KEYS = STORAGE_KEYS
