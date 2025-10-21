"use server"

import { prisma } from "@/lib/prisma"
import { hashPassword, comparePassword, setAuthCookie, clearAuthCookie, getAuthUser } from "@/lib/auth-utils"
import { signToken } from "@/lib/jwt"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    })

    if (!user) {
      return { error: "Неверный email или пароль" }
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return { error: "Неверный email или пароль" }
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)
    return { success: true }
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    return { error: "Ошибка входа" }
  }
}

export async function signUp(email: string, password: string, name?: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Пользователь с таким email уже существует" }
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile: {
          create: {
            balance: 0,
          },
        },
      },
    })

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)
    return { success: true }
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    return { error: "Ошибка регистрации" }
  }
}

export async function signOut() {
  await clearAuthCookie()
  revalidatePath("/", "layout")
  redirect("/")
}

export async function getUser() {
  const authUser = await getAuthUser()
  if (!authUser) return null

  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    include: { profile: true },
  })

  return user
}

export async function getUserProfile() {
  const authUser = await getAuthUser()
  if (!authUser) return null

  const profile = await prisma.profile.findUnique({
    where: { userId: authUser.userId },
  })

  return profile
}
