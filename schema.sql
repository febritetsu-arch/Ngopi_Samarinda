-- Ngopi Samarinda
-- Jalankan sekali di Supabase → SQL Editor.
-- Katalog contoh di src/data/cafes.ts tidak dihapus. Kalau tabel cafes kosong,
-- aplikasi tetap memakai data itu. Isi katalog dengan seed.sql setelah skema ini.

create table if not exists public.cafes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text not null,
  neighborhood text not null default '',
  address text not null default '',
  lat double precision not null,
  lng double precision not null,
  price text not null check (price in ('hemat', 'sedang', 'premium')),
  moods text[] not null default '{}',
  facilities text[] not null default '{}',
  open text not null,
  close text not null,
  blurb text not null default '',
  story jsonb not null default '[]'::jsonb,
  image text not null default '',
  image_alt text not null default '',
  menu jsonb not null default '[]'::jsonb,
  crowd smallint[] not null,
  signature text not null default '',
  created_at timestamptz not null default now(),
  constraint cafes_crowd_hours check (cardinality(crowd) = 24)
);

create table if not exists public.crowd_reports (
  id uuid primary key default gen_random_uuid(),
  cafe_slug text not null references public.cafes (slug) on delete cascade,
  level text not null check (level in ('sepi', 'sedang', 'ramai', 'penuh')),
  created_at timestamptz not null default now()
);

create index if not exists crowd_reports_cafe_created_idx
  on public.crowd_reports (cafe_slug, created_at desc);

create table if not exists public.cafe_suggestions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  district text not null,
  moods text[] not null default '{}',
  photo_url text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  constraint cafe_suggestions_name_len check (char_length(name) between 1 and 120),
  constraint cafe_suggestions_address_len check (char_length(address) between 1 and 240),
  constraint cafe_suggestions_notes_len check (char_length(notes) <= 1000),
  constraint cafe_suggestions_moods_present check (cardinality(moods) > 0)
);

alter table public.cafes enable row level security;
alter table public.crowd_reports enable row level security;
alter table public.cafe_suggestions enable row level security;

grant select on public.cafes to anon, authenticated;
grant select, insert on public.crowd_reports to anon, authenticated;
grant insert on public.cafe_suggestions to anon, authenticated;

drop policy if exists "cafes are public" on public.cafes;
create policy "cafes are public"
  on public.cafes
  for select
  to anon, authenticated
  using (true);

drop policy if exists "crowd reports are public" on public.crowd_reports;
create policy "crowd reports are public"
  on public.crowd_reports
  for select
  to anon, authenticated
  using (true);

drop policy if exists "anyone can send a crowd report" on public.crowd_reports;
create policy "anyone can send a crowd report"
  on public.crowd_reports
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anyone can suggest a cafe" on public.cafe_suggestions;
create policy "anyone can suggest a cafe"
  on public.cafe_suggestions
  for insert
  to anon, authenticated
  with check (true);
