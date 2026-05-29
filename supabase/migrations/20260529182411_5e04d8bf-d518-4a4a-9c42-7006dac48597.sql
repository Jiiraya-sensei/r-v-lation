
-- ============= PROFILES =============
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  age integer,
  phone text,
  account_type text not null default 'spectator' check (account_type in ('spectator','participant')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = user_id);
create policy "Users can insert own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = user_id);
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = user_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- handle_new_user trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, first_name, last_name, age, phone, account_type)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    nullif(new.raw_user_meta_data->>'age','')::int,
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'account_type','spectator')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============= AUDITION_SUBMISSIONS update =============
alter table public.audition_submissions add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.audition_submissions add column if not exists status text not null default 'submitted' check (status in ('submitted','under_review','accepted','rejected'));

grant select on public.audition_submissions to authenticated;

create policy "Users can view own submissions"
  on public.audition_submissions for select to authenticated
  using (auth.uid() = user_id);

-- ============= ORDERS =============
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  customer_email text not null,
  customer_name text,
  total_amount integer not null,
  currency text not null default 'cad',
  status text not null default 'pending',
  environment text not null default 'sandbox',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_email on public.orders(customer_email);
create index idx_orders_user on public.orders(user_id);

grant select on public.orders to authenticated;
grant all on public.orders to service_role;

alter table public.orders enable row level security;

create policy "Users can view own orders by email"
  on public.orders for select to authenticated
  using (customer_email = (select email from auth.users where id = auth.uid()));

create trigger orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

-- ============= TICKETS =============
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  ticket_type text not null check (ticket_type in ('semifinal','finale','bundle_semifinal','bundle_finale')),
  token uuid not null unique default gen_random_uuid(),
  holder_email text not null,
  pdf_path text,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_tickets_order on public.tickets(order_id);
create index idx_tickets_email on public.tickets(holder_email);

grant select on public.tickets to authenticated;
grant all on public.tickets to service_role;

alter table public.tickets enable row level security;

create policy "Users can view own tickets by email"
  on public.tickets for select to authenticated
  using (holder_email = (select email from auth.users where id = auth.uid()));

-- ============= STORAGE bucket tickets-pdf (private) =============
insert into storage.buckets (id, name, public) values ('tickets-pdf','tickets-pdf', false)
on conflict (id) do nothing;

-- Only service_role manages tickets-pdf; users get PDFs via signed URLs
create policy "Service role manages tickets pdf"
  on storage.objects for all to service_role
  using (bucket_id = 'tickets-pdf') with check (bucket_id = 'tickets-pdf');
