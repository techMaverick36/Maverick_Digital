-- Maverick Digital Hub: booking database.
-- Run once in Supabase: SQL Editor > New query > paste all of this > Run.
-- Safe to run again (it only creates what is missing).

create table if not exists public.bookings (
	id uuid primary key default gen_random_uuid(),
	reference text not null unique,
	created_at timestamptz not null default now(),
	starts_at timestamptz not null,
	ends_at timestamptz not null,
	service text not null,
	call_type text not null,
	fullname text not null,
	company text,
	phone text not null,
	phone_digits text not null,
	email text not null,
	budget text,
	notes text,
	status text not null default 'confirmed' check (status in ('confirmed', 'done', 'no_show', 'cancelled')),
	admin_notes text,
	google_event_id text,
	meet_link text,
	calendar_synced boolean not null default false
);

-- Two live bookings can never share a start time (stops double booking, even at the same instant).
create unique index if not exists bookings_one_per_slot on public.bookings (starts_at) where status <> 'cancelled';
create index if not exists bookings_starts_at on public.bookings (starts_at);
create index if not exists bookings_email on public.bookings (email);
create index if not exists bookings_phone_digits on public.bookings (phone_digits);

-- Who may open the dashboard.
create table if not exists public.admins (
	email text primary key
);
insert into public.admins (email) values ('mavericktech750@gmail.com') on conflict do nothing;

-- Row level security: the public website cannot read or write anything directly.
-- Bookings are created by the server (api/book.js) with the secret key.
-- Signed-in admins can read bookings; changes go through api/manage.js.
alter table public.bookings enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
	select exists (select 1 from public.admins where email = lower(auth.jwt() ->> 'email'));
$$;

drop policy if exists "admins read bookings" on public.bookings;
create policy "admins read bookings" on public.bookings for select to authenticated using (public.is_admin());

drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins" on public.admins for select to authenticated using (public.is_admin());

revoke all on public.bookings from anon;
revoke all on public.admins from anon;
revoke insert, update, delete on public.bookings from authenticated;
revoke insert, update, delete on public.admins from authenticated;
