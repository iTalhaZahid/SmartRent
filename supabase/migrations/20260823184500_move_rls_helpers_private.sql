-- Keep RLS helpers outside the API-exposed public schema.
create schema if not exists private;
alter function public.is_admin() set schema private;
alter function public.owns_property(uuid) set schema private;

revoke all on schema private from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.owns_property(uuid) to authenticated;
