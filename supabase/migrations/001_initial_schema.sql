-- ============================================================
-- Check-in Emocional Diario — Sana y Florece
-- Schema inicial para Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ── Tabla de perfiles (extiende auth.users) ──────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  subscription_status text not null default 'free',  -- 'free' | 'active' | 'canceled' | 'past_due'
  subscription_id text,    -- ID de suscripción de Gumroad
  created_at timestamptz not null default now()
);

-- ── Tabla de check-ins ────────────────────────────────────────
create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  emocion text not null,
  categoria text,
  intensidad int not null check (intensidad between 1 and 10),
  respuestas jsonb not null default '{}',
  journal text,
  reflexion_ia text,       -- null para usuarios Free
  created_at timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.checkins enable row level security;

-- Cada usuario solo accede a sus propios datos
create policy "Usuario ve su perfil"
  on public.profiles for all
  using (auth.uid() = id);

create policy "Usuario ve sus checkins"
  on public.checkins for all
  using (auth.uid() = user_id);

-- ── Trigger: crear perfil al registrarse ─────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Eliminar trigger anterior si existe (para re-ejecuciones seguras)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Índices de rendimiento ────────────────────────────────────
create index if not exists checkins_user_id_idx on public.checkins(user_id);
create index if not exists checkins_created_at_idx on public.checkins(created_at desc);
create index if not exists profiles_subscription_idx on public.profiles(subscription_status);
