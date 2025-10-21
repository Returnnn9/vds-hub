import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ServerPlansManager } from "@/components/admin/server-plans-manager"

export default async function AdminServersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Управление тарифами</h1>
              <p className="text-muted-foreground">Редактирование цен и параметров серверных планов</p>
            </div>

            <ServerPlansManager />
          </div>
        </main>
      </div>
    </div>
  )
}
