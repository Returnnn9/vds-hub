# VDS_HUB - Server Rental Platform

Платформа для аренды виртуальных серверов (VDS/VPS) с полноценной системой управления, JWT аутентификацией и админ-панелью.

## Возможности

- 🔐 **JWT Аутентификация** через Supabase
- 👤 **Управление пользователями** с ролями (user/admin)
- 💰 **Управление тарифами** с редактированием цен в админ-панели
- 📊 **Панель управления** для пользователей
- 🛡️ **Row Level Security (RLS)** для защиты данных
- 🎨 **Современный UI** с Tailwind CSS и shadcn/ui
- 🌐 **Полная русификация** интерфейса

## Технологии

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Deployment**: Vercel

## Начало работы

### 1. Установка зависимостей

\`\`\`bash
npm install
\`\`\`

### 2. Настройка переменных окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Настройка базы данных

Выполните SQL скрипты из папки `scripts/` в следующем порядке:

1. `001_create_profiles.sql` - Создание таблицы профилей
2. `002_create_server_plans.sql` - Создание таблицы тарифов
3. `003_create_orders.sql` - Создание таблицы заказов
4. `004_profile_trigger.sql` - Триггер для автоматического создания профиля
5. `005_seed_server_plans.sql` - Начальные данные тарифов

### 4. Запуск в режиме разработки

\`\`\`bash
npm run dev
\`\`\`

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

\`\`\`
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   ├── auth/                 # Страницы аутентификации
│   ├── admin/                # Админ-панель
│   ├── dashboard/            # Панель пользователя
│   └── page.tsx              # Главная страница
├── components/               # React компоненты
│   ├── admin/                # Компоненты админ-панели
│   ├── auth/                 # Компоненты аутентификации
│   ├── dashboard/            # Компоненты панели управления
│   └── ui/                   # UI компоненты (shadcn/ui)
├── lib/                      # Утилиты и библиотеки
│   ├── supabase/             # Supabase клиенты
│   └── actions/              # Server Actions
├── scripts/                  # SQL скрипты для БД
└── middleware.ts             # Next.js Middleware для auth
\`\`\`

## Роли пользователей

### User (Пользователь)
- Просмотр и заказ серверов
- Управление своими заказами
- Редактирование профиля

### Admin (Администратор)
- Все возможности пользователя
- Управление тарифными планами
- Редактирование цен
- Просмотр всех пользователей и заказов
- Управление системой

## Создание первого администратора

После регистрации первого пользователя, выполните SQL запрос в Supabase:

\`\`\`sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
\`\`\`

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения из `.env.example`
3. Убедитесь, что Supabase интеграция настроена
4. Деплой произойдет автоматически

## Безопасность

- Все данные защищены Row Level Security (RLS)
- JWT токены автоматически обновляются через middleware
- Пароли хешируются Supabase Auth
- API routes защищены проверкой аутентификации

## Лицензия

MIT
