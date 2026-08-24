insert into auth.users (id, email, raw_user_meta_data, created_at, updated_at)
values (
  '00000000-0000-4000-8000-000000000001',
  'demo-owner@smartrent.local',
  '{"full_name":"SmartRent Demo Owner","role":"OWNER"}'::jsonb,
  now(),
  now()
)
on conflict (id) do nothing;

insert into public.properties (
  id, owner_id, title, description, address, city, property_type,
  bedrooms, bathrooms, max_occupants, short_term_price, monthly_price,
  rental_mode, status
)
values
  (
    '00000000-0000-4000-8000-000000000101',
    '00000000-0000-4000-8000-000000000001',
    'Serene Margalla View Apartment',
    'A bright, furnished apartment with sweeping Margalla Hills views, modern interiors, secure parking, and easy access to cafés and business districts.',
    'Street 12, F-8/2', 'Islamabad', 'Apartment',
    2, 2, 4, null, 185000, 'LONG_TERM', 'ACTIVE'
  ),
  (
    '00000000-0000-4000-8000-000000000102',
    '00000000-0000-4000-8000-000000000001',
    'Modern Gulberg City Studio',
    'A thoughtfully designed studio close to Gulberg restaurants and offices, featuring a fitted kitchen, reliable Wi-Fi, and round-the-clock security.',
    'Main Boulevard, Gulberg III', 'Lahore', 'Studio',
    1, 1, 2, 9500, null, 'SHORT_TERM', 'ACTIVE'
  ),
  (
    '00000000-0000-4000-8000-000000000103',
    '00000000-0000-4000-8000-000000000001',
    'Spacious Clifton Family Home',
    'A calm and spacious family home near the sea with generous living areas, a private terrace, dedicated parking, and convenient access to Clifton amenities.',
    'Block 5, Clifton', 'Karachi', 'House',
    4, 3.5, 8, 28000, 420000, 'BOTH', 'ACTIVE'
  ),
  (
    '00000000-0000-4000-8000-000000000104',
    '00000000-0000-4000-8000-000000000001',
    'Bahria Town Garden Townhouse',
    'A comfortable townhouse in a quiet gated community with a small garden, contemporary kitchen, family lounge, and nearby parks and shopping.',
    'Sector C, Bahria Town', 'Rawalpindi', 'Townhouse',
    3, 2.5, 6, null, 145000, 'LONG_TERM', 'ACTIVE'
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  address = excluded.address,
  city = excluded.city,
  property_type = excluded.property_type,
  bedrooms = excluded.bedrooms,
  bathrooms = excluded.bathrooms,
  max_occupants = excluded.max_occupants,
  short_term_price = excluded.short_term_price,
  monthly_price = excluded.monthly_price,
  rental_mode = excluded.rental_mode,
  status = excluded.status;
