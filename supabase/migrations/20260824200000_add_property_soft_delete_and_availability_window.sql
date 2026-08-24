alter table public.properties
  add column deleted_at timestamptz,
  add column available_from date,
  add column available_to date,
  add constraint properties_availability_window_valid check (
    available_from is null or available_to is null or available_to > available_from
  );

create index properties_owner_active_idx
on public.properties (owner_id, created_at desc)
where deleted_at is null;

drop policy "available active properties are public" on public.properties;
create policy "available active properties are public" on public.properties
for select using (status = 'ACTIVE' and is_available and deleted_at is null);
