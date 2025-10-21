import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      server_plan:server_plans(*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { server_plan_id, billing_period, server_name } = body

  // Get server plan details
  const { data: plan, error: planError } = await supabase
    .from("server_plans")
    .select("*")
    .eq("id", server_plan_id)
    .single()

  if (planError || !plan) {
    return NextResponse.json({ error: "Server plan not found" }, { status: 404 })
  }

  // Calculate price based on billing period
  let price_paid = plan.price_monthly
  if (billing_period === "quarterly") {
    price_paid = plan.price_monthly * 3 * 0.95 // 5% discount
  } else if (billing_period === "yearly") {
    price_paid = plan.price_monthly * 12 * 0.9 // 10% discount
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      server_plan_id,
      price_paid,
      billing_period,
      server_name: server_name || `Server ${Date.now()}`,
      status: "pending",
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  return NextResponse.json(order)
}
