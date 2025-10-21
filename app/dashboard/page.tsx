import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ServersList } from "@/components/dashboard/servers-list"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Панель управления</h1>
              <p className="text-muted-foreground">Добро пожаловать в VDS_HUB, {profile?.full_name || user.email}</p>
            </div>

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ServersList />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
