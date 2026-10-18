-- Hrmnx Shop public catalogue
-- Run this in Supabase SQL Editor for project bftgnubawqwvpbqkldpm.
-- This creates catalogue data only; it does not enable payments or checkout.

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  artist_name text not null,
  artist_slug text not null,
  format text not null check (format in ('Vinyl', 'CD', 'Digital', 'Merchandise', 'Other')),
  edition text,
  description text,
  price numeric(10,2) check (price is null or price >= 0),
  currency text not null default 'EUR',
  image_url text,
  checkout_url text,
  available boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  release_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shop_products_public_listing_idx
  on public.shop_products (artist_slug, is_active, sort_order);

alter table public.shop_products enable row level security;

-- Visitors can read active listings only. No public insert/update/delete policies.
drop policy if exists "Public can view active shop products" on public.shop_products;
create policy "Public can view active shop products"
  on public.shop_products
  for select
  to anon, authenticated
  using (is_active = true);

-- Starter catalogue entries for SEIUN's known release.
-- Prices/artwork remain blank until confirmed; checkout is intentionally disabled.
insert into public.shop_products
  (slug, name, artist_name, artist_slug, format, edition, description,
   price, currency, image_url, checkout_url, available, is_active, sort_order)
values
  ('seiun-wink-the-beginning-vinyl', 'WINK: The Beginning', 'SEIUN', 'seiun',
   'Vinyl', 'Vinyl edition', 'Official SEIUN release. Product details to be announced.',
   null, 'EUR', null, null, false, true, 10),
  ('seiun-wink-the-beginning-cd', 'WINK: The Beginning', 'SEIUN', 'seiun',
   'CD', 'CD edition', 'Official SEIUN release. Product details to be announced.',
   null, 'EUR', null, null, false, true, 20)
on conflict (slug) do nothing;
