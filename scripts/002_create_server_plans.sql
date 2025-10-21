-- Create server plans table
create table if not exists public.server_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ru text not null,
  cpu_cores integer not null,
  ram_gb integer not null,
  storage_gb integer not null,
  price_monthly numeric(10, 2) not null,
  price_currency text not null default 'RUB',
  is_popular boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.server_plans enable row level security;

-- Policies for server plans (public read, admin write)
create policy "server_plans_select_all"
  on public.server_plans for select
  using (is_active = true or exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "server_plans_insert_admin"
  on public.server_plans for insert
  with check (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "server_plans_update_admin"
  on public.server_plans for update
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "server_plans_delete_admin"
  on public.server_plans for delete
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));
