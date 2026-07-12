-- Waitlist para el registro anticipado de Lattice.
-- Corré esto en el SQL Editor de Supabase (o `supabase db push` si usás la CLI).

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Sin políticas de INSERT/SELECT para anon/authenticated: el service role
-- (usado únicamente en /api/waitlist, del lado del servidor) bypassea RLS
-- por diseño, así que no hace falta ninguna policy pública. Esto evita que
-- alguien inserte directo contra la REST API de Supabase sin pasar por la
-- validación del endpoint.
