import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SupportChat } from "@/components/support/support-chat"
import { SupportTickets } from "@/components/support/support-tickets"

export default function SupportPage() {
  return (
    <div className="min-h-screen gradient-purple">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Поддержка</h1>
              <p className="text-muted-foreground">Мы всегда готовы помочь вам 24/7</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SupportChat />
              </div>
              <div>
                <SupportTickets />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
