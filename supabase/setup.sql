create extension if not exists "pgcrypto";

create table if not exists public.tokens (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  status text not null default 'waiting' check (status in ('waiting', 'in_progress', 'done')),
  token_number text not null unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists tokens_status_created_at_idx on public.tokens(status, created_at);

alter table public.tokens enable row level security;

drop policy if exists "Public can read tokens" on public.tokens;
create policy "Public can read tokens"
on public.tokens
for select
to anon, authenticated
using (true);

drop policy if exists "Public can create tokens" on public.tokens;
create policy "Public can create tokens"
on public.tokens
for insert
to anon, authenticated
with check (status = 'waiting');

drop policy if exists "Public can update token status" on public.tokens;
create policy "Public can update token status"
on public.tokens
for update
to anon, authenticated
using (true)
with check (status in ('waiting', 'in_progress', 'done'));

create or replace function public.create_token(
  customer_name text,
  customer_phone text,
  customer_service text
)
returns table (
  id uuid,
  name text,
  phone text,
  service text,
  status text,
  token_number text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  next_number integer;
  new_token public.tokens%rowtype;
begin
  if trim(coalesce(customer_name, '')) = '' then
    raise exception 'Name is required';
  end if;

  if trim(coalesce(customer_phone, '')) = '' then
    raise exception 'Phone is required';
  end if;

  if trim(coalesce(customer_service, '')) = '' then
    raise exception 'Service is required';
  end if;

  lock table public.tokens in exclusive mode;

  select coalesce(
    max(
      nullif(regexp_replace(t.token_number, '[^0-9]', '', 'g'), '')::integer
    ),
    0
  ) + 1
  into next_number
  from public.tokens t;

  insert into public.tokens (name, phone, service, status, token_number)
  values (
    trim(customer_name),
    trim(customer_phone),
    trim(customer_service),
    'waiting',
    'A' || next_number::text
  )
  returning * into new_token;

  return query
  select
    new_token.id,
    new_token.name,
    new_token.phone,
    new_token.service,
    new_token.status,
    new_token.token_number,
    new_token.created_at;
end;
$$;

revoke all on function public.create_token(text, text, text) from public;
grant execute on function public.create_token(text, text, text) to anon, authenticated;

alter publication supabase_realtime add table public.tokens;
