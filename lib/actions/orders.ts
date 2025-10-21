"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createOrder(serverPlanId: string, billingPeriod: string, serverName?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Get server plan details
  const { data: plan, error: planError } = await supabase
    .from("server_plans")
    .select("price_monthly")
    .eq("id", serverPlanId)
    .single()

  if (planError || !plan) {
    throw new Error("Server plan not found")
  }

  // Calculate price based on billing period
  let pricePaid = plan.price_monthly
  if (billingPeriod === "quarterly") {
    pricePaid = plan.price_monthly * 3 * 0.95 // 5% discount
  } else if (billingPeriod === "yearly") {
    pricePaid = plan.price_monthly * 12 * 0.9 // 10% discount
  }

  // Calculate expiration date
  const expiresAt = new Date()
  if (billingPeriod === "monthly") {
    expiresAt.setMonth(expiresAt.getMonth() + 1)
  } else if (billingPeriod === "quarterly") {
    expiresAt.setMonth(expiresAt.getMonth() + 3)
  } else if (billingPeriod === "yearly") {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
  }

  // Create order
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      server_plan_id: serverPlanId,
      price_paid: pricePaid,
      billing_period: billingPeriod,
      server_name: serverName,
      status: "active",
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  return data
}

export async function getUserOrders() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      server_plans (
        name,
        name_ru,
        cpu_cores,
        ram_gb,
        storage_gb
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching orders:", error)
    return []
  }

  return data || []
}
