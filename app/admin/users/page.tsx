import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UsersTable } from "@/components/admin/users-table"

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Управление пользователями</h1>
              <p className="text-muted-foreground">Просмотр и управление всеми пользователями</p>
            </div>

            <UsersTable />
          </div>
        </main>
      </div>
    </div>
  )
}
