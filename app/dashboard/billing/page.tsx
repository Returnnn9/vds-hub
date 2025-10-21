import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BalanceCard } from "@/components/billing/balance-card"
import { PaymentMethods } from "@/components/billing/payment-methods"
import { TransactionHistory } from "@/components/billing/transaction-history"

export default function BillingPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Биллинг</h1>
              <p className="text-muted-foreground">Управление балансом и платежами</p>
            </div>

            <BalanceCard />

            <PaymentMethods />

            <TransactionHistory />
          </div>
        </main>
      </div>
    </div>
  )
}
