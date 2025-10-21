import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PaymentsTable } from "@/components/admin/payments-table"
import { PaymentStats } from "@/components/admin/payment-stats"

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Управление платежами</h1>
              <p className="text-muted-foreground">Просмотр и управление всеми платежами</p>
            </div>

            <PaymentStats />
            <PaymentsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
