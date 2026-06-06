-- Tabla de perfiles (extiende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  stripe_customer_id text unique,
  subscription_status text not null default 'free',
  subscription_id text,
  created_at timestamptz not null default now()
);

-- Tabla de check-ins
create table public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  emocion text not null,
  categoria text,
  intensidad int not null check (intensidad between 1 and 10),
  respuestas jsonb not null default '{}',
  journal text,
  reflexion_ia text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.checkins enable row level security;

create policy "Usuario ve su perfil" on public.profiles
  for all using (auth.uid() = id);

create policy "Usuario ve sus checkins" on public.checkins
  for all using (auth.uid() = user_id);

-- Trigger para crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Índices
create index checkins_user_id_idx on public.checkins(user_id);
create index checkins_created_at_idx on public.checkins(created_at desc);
