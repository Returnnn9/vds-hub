import type { User, ActivityLog } from "./types"
import { storage, KEYS } from "./storage"

export const auth = {
  login: (email: string, password: string): User | null => {
    const users = storage.get<User[]>(KEYS.USERS) || []
    const user = users.find((u) => u.email === email)

    if (!user) return null

    // Log activity
    logActivity(user.id, "login", "User logged in")

    storage.set(KEYS.USER, user)
    return user
  },

  register: (email: string, password: string, telegram?: string, referralCode?: string): User | null => {
    const users = storage.get<User[]>(KEYS.USERS) || []

    // Check if user exists
    if (users.find((u) => u.email === email)) {
      return null
    }

    // Generate referral code
    const userReferralCode = generateReferralCode()

    const newUser: User = {
      id: generateId(),
      email,
      role: "user",
      balance: 0,
      registeredAt: new Date().toISOString(),
      telegram,
      referralCode: userReferralCode,
      referredBy: referralCode,
      totalTopUps: 0,
    }

    users.push(newUser)
    storage.set(KEYS.USERS, users)

    // Handle referral
    if (referralCode) {
      const referrer = users.find((u) => u.referralCode === referralCode)
      if (referrer) {
        const referrals = storage.get<any[]>(KEYS.REFERRALS) || []
        referrals.push({
          id: generateId(),
          referrerId: referrer.id,
          referredId: newUser.id,
          earnings: 0,
          createdAt: new Date().toISOString(),
        })
        storage.set(KEYS.REFERRALS, referrals)
      }
    }

    // Log activity
    logActivity(newUser.id, "register", "User registered")

    storage.set(KEYS.USER, newUser)
    return newUser
  },

  logout: (): void => {
    const user = storage.get<User>(KEYS.USER)
    if (user) {
      logActivity(user.id, "logout", "User logged out")
    }
    storage.remove(KEYS.USER)
  },

  getCurrentUser: (): User | null => {
    return storage.get<User>(KEYS.USER)
  },

  updateUser: (updates: Partial<User>): void => {
    const user = storage.get<User>(KEYS.USER)
    if (!user) return

    const updatedUser = { ...user, ...updates }
    storage.set(KEYS.USER, updatedUser)

    // Update in users list
    const users = storage.get<User[]>(KEYS.USERS) || []
    const index = users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      users[index] = updatedUser
      storage.set(KEYS.USERS, users)
    }
  },
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function generateReferralCode(): string {
  return Math.random().toString(36).substr(2, 8).toUpperCase()
}

function logActivity(userId: string, action: string, details: string): void {
  const logs = storage.get<ActivityLog[]>(KEYS.ACTIVITY_LOGS) || []
  logs.push({
    id: generateId(),
    userId,
    action,
    ip: "127.0.0.1", // Mock IP
    timestamp: new Date().toISOString(),
    details,
  })
  storage.set(KEYS.ACTIVITY_LOGS, logs)
}
