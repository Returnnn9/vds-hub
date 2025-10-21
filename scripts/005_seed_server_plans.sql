-- Seed initial server plans
insert into public.server_plans (name, name_ru, cpu_cores, ram_gb, storage_gb, price_monthly, is_popular) values
  ('Starter', 'Начальный', 2, 4, 80, 599.00, false),
  ('Professional', 'Профессиональный', 4, 8, 160, 1199.00, true),
  ('Business', 'Бизнес', 8, 16, 320, 2399.00, false),
  ('Enterprise', 'Корпоративный', 16, 32, 640, 4799.00, false)
on conflict do nothing;
