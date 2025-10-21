import { Zap, Shield, Clock, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Мгновенное развертывание",
    titleEn: "Instant Deployment",
    description: "Ваш сервер будет готов к работе через несколько секунд после оплаты",
    descriptionEn: "Your server will be ready in seconds after payment",
  },
  {
    icon: Shield,
    title: "Защита от DDoS",
    titleEn: "DDoS Protection",
    description: "Встроенная защита от DDoS-атак на всех тарифных планах",
    descriptionEn: "Built-in DDoS protection on all plans",
  },
  {
    icon: Clock,
    title: "Почасовая оплата",
    titleEn: "Hourly Billing",
    description: "Платите только за фактическое время использования сервера",
    descriptionEn: "Pay only for actual server usage time",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    titleEn: "24/7 Support",
    description: "Наша команда всегда готова помочь вам в любое время",
    descriptionEn: "Our team is always ready to help you anytime",
  },
]

export function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <div
            key={index}
            className="group card-gradient rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:glow-effect hover:scale-105"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        )
      })}
    </section>
  )
}
