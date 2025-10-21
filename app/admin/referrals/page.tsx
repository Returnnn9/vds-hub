import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ReferralStatsAdmin } from "@/components/admin/referral-stats-admin"
import { ReferralActivityTable } from "@/components/admin/referral-activity-table"

export default function AdminReferralsPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Реферальная система</h1>
              <p className="text-muted-foreground">Статистика и управление реферальной программой</p>
            </div>

            <ReferralStatsAdmin />
            <ReferralActivityTable />
          </div>
        </main>
      </div>
    </div>
  )
}
