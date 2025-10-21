import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ReferralStats } from "@/components/referral/referral-stats"
import { ReferralLink } from "@/components/referral/referral-link"
import { ReferralHistory } from "@/components/referral/referral-history"

export default function ReferralsPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Реферальная система</h1>
              <p className="text-muted-foreground">Приглашайте друзей и получайте 10% от их пополнений</p>
            </div>

            <ReferralStats />
            <ReferralLink />
            <ReferralHistory />
          </div>
        </main>
      </div>
    </div>
  )
}
