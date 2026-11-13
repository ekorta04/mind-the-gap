-- =====================================================================
-- MIND THE GAP · Progreso sincronizado entre dispositivos
-- Supabase → SQL Editor → New query → pegar todo → Run.
-- Se puede ejecutar más de una vez sin problema.
-- =====================================================================
create table if not exists public.mtg_state (
    user_id    uuid primary key default auth.uid()
               references auth.users (id) on delete cascade,
    data       jsonb       not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
);

alter table public.mtg_state enable row level security;

drop policy if exists "mtg_state_select_own" on public.mtg_state;
create policy "mtg_state_select_own" on public.mtg_state
    for select to authenticated using (auth.uid() = user_id);

drop policy if exists "mtg_state_insert_own" on public.mtg_state;
create policy "mtg_state_insert_own" on public.mtg_state
    for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "mtg_state_update_own" on public.mtg_state;
create policy "mtg_state_update_own" on public.mtg_state
    for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "mtg_state_delete_own" on public.mtg_state;
create policy "mtg_state_delete_own" on public.mtg_state
    for delete to authenticated using (auth.uid() = user_id);

grant select, insert, update, delete on public.mtg_state to authenticated;
revoke all on public.mtg_state from anon;
