-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  server_plan_id uuid not null references public.server_plans(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended', 'cancelled')),
  price_paid numeric(10, 2) not null,
  billing_period text not null default 'monthly' check (billing_period in ('monthly', 'quarterly', 'yearly')),
  server_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies for orders
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id or exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "orders_update_own"
  on public.orders for update
  using (auth.uid() = user_id or exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));

create policy "orders_delete_admin"
  on public.orders for delete
  using (exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  ));
