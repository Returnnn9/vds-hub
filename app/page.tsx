import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ServerConfigurator } from "@/components/server-configurator"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-purple">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-16">
            <HeroSection />
            <FeaturesSection />
            <ServerConfigurator />
          </div>
        </main>
      </div>
    </div>
  )
}
