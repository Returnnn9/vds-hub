import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@vdshub.ru" },
    update: {},
    create: {
      email: "admin@vdshub.ru",
      password: adminPassword,
      name: "Администратор",
      role: "ADMIN",
      profile: {
        create: {
          company: "VDS Hub",
          balance: 0,
        },
      },
    },
  })

  console.log("Created admin user:", admin.email)

  // Create server plans
  const plans = [
    {
      name: "Starter",
      nameRu: "Начальный",
      cpu: 2,
      ram: 4,
      storage: 50,
      bandwidth: 1000,
      price: 500,
      popular: false,
      description: "Идеально для небольших проектов",
    },
    {
      name: "Professional",
      nameRu: "Профессиональный",
      cpu: 4,
      ram: 8,
      storage: 100,
      bandwidth: 2000,
      price: 1000,
      popular: true,
      description: "Оптимальный выбор для большинства задач",
    },
    {
      name: "Business",
      nameRu: "Бизнес",
      cpu: 8,
      ram: 16,
      storage: 200,
      bandwidth: 5000,
      price: 2000,
      popular: false,
      description: "Для требовательных приложений",
    },
    {
      name: "Enterprise",
      nameRu: "Корпоративный",
      cpu: 16,
      ram: 32,
      storage: 500,
      bandwidth: 10000,
      price: 4000,
      popular: false,
      description: "Максимальная производительность",
    },
  ]

  for (const plan of plans) {
    await prisma.serverPlan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    })
  }

  console.log("Created server plans")
  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
