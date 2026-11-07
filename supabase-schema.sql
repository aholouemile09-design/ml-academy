-- À exécuter une fois dans l'éditeur SQL de ton projet Supabase (supabase.com → SQL Editor).

create table if not exists public.user_progress (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  display_name      text not null default '',
  color_id          text not null default 'indigo',
  avatar_id         text not null default 'robot',
  completed_lessons jsonb not null default '[]'::jsonb,
  quiz_scores       jsonb not null default '{}'::jsonb,
  calendar_checks   jsonb not null default '{}'::jsonb,
  calendar_start    text not null default '',
  track_preference  text not null default 'ml',
  xp                integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "select own row" on public.user_progress;
create policy "select own row" on public.user_progress for select using (auth.uid() = user_id);

drop policy if exists "insert own row" on public.user_progress;
create policy "insert own row" on public.user_progress for insert with check (auth.uid() = user_id);

drop policy if exists "update own row" on public.user_progress;
create policy "update own row" on public.user_progress for update using (auth.uid() = user_id);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_touch_updated_at on public.user_progress;
create trigger trg_touch_updated_at before update on public.user_progress
  for each row execute function public.touch_updated_at();

-- Crée automatiquement une ligne de progression à l'inscription d'un nouvel utilisateur.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_progress (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- Migration : notes personnelles par leçon + temps passé par module
-- À exécuter dans le SQL Editor de Supabase.
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.user_progress
  add column if not exists lesson_notes jsonb not null default '{}'::jsonb;

alter table public.user_progress
  add column if not exists module_time  jsonb not null default '{}'::jsonb;

-- ─────────────────────────────────────────────────────────────────────────────
-- Migration : conversations avec le tuteur
--
-- Le fil mourait au rechargement : il vivait dans un useState. Il vit
-- maintenant ici, une ligne par message, groupé par (piste, leçon) — la
-- conversation générale de /tuteur a piste et lecon à null.
-- À exécuter dans le SQL Editor de Supabase.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.tutor_messages (
  id         bigserial   primary key,
  user_id    uuid        not null references auth.users(id) on delete cascade,
  piste      text,
  lecon      text,
  role       text        not null check (role in ('user', 'assistant')),
  contenu    text        not null,
  created_at timestamptz not null default now()
);

-- La seule lecture est « les derniers messages de cette conversation » :
-- l'index suit exactement cet accès.
create index if not exists idx_tutor_messages_conversation
  on public.tutor_messages (user_id, piste, lecon, created_at desc);

alter table public.tutor_messages enable row level security;

-- Pas de politique d'update : un message envoyé ne se réécrit pas. Le delete
-- existe pour qu'un apprenant puisse effacer une conversation.
drop policy if exists "select own messages" on public.tutor_messages;
create policy "select own messages" on public.tutor_messages
  for select using (auth.uid() = user_id);

drop policy if exists "insert own messages" on public.tutor_messages;
create policy "insert own messages" on public.tutor_messages
  for insert with check (auth.uid() = user_id);

drop policy if exists "delete own messages" on public.tutor_messages;
create policy "delete own messages" on public.tutor_messages
  for delete using (auth.uid() = user_id);
