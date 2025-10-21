import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProfileInfo } from "@/components/dashboard/profile-info"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Профиль</h1>
              <p className="text-muted-foreground">Управление вашим аккаунтом</p>
            </div>

            <ProfileInfo />
            <ProfileSettings />
          </div>
        </main>
      </div>
    </div>
  )
}
