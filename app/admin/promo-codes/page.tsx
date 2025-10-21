import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PromoCodesManager } from "@/components/admin/promo-codes-manager"

export default function AdminPromoCodesPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Промокоды</h1>
              <p className="text-muted-foreground">Создание и управление промокодами</p>
            </div>

            <PromoCodesManager />
          </div>
        </main>
      </div>
    </div>
  )
}
