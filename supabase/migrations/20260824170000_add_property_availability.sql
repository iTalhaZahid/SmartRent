alter table public.properties
add column is_available boolean not null default true;

create index properties_available_search_idx
on public.properties (status, is_available, created_at desc)
where status = 'ACTIVE' and is_available;

drop policy "active properties are public" on public.properties;
create policy "available active properties are public" on public.properties
for select using (status = 'ACTIVE' and is_available);
