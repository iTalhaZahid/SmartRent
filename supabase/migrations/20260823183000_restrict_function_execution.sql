-- Trigger functions are invoked by PostgreSQL and must not be exposed as RPCs.
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.protect_profile_privileges() from public, anon, authenticated;
revoke all on function public.protect_property_moderation() from public, anon, authenticated;
revoke all on function public.validate_availability_write() from public, anon, authenticated;
revoke all on function public.validate_booking_write() from public, anon, authenticated;
revoke all on function public.sync_booking_side_effects() from public, anon, authenticated;

-- RLS helper functions are required by signed-in queries, but not by anonymous users.
revoke all on function public.is_admin() from public, anon;
revoke all on function public.owns_property(uuid) from public, anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.owns_property(uuid) to authenticated;
