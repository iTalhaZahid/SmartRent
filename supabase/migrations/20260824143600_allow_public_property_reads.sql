drop policy "active properties are public" on public.properties;

create policy "active properties are public" on public.properties
for select to anon, authenticated
using (status = 'ACTIVE');

create policy "owners and admins view managed properties" on public.properties
for select to authenticated
using (owner_id = (select auth.uid()) or private.is_admin());
