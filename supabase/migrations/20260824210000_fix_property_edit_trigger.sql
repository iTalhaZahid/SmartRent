create or replace function public.protect_property_moderation()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null and not private.is_admin() then
    new.status := old.status;
    new.rejection_reason := old.rejection_reason;
  end if;
  return new;
end;
$$;

revoke execute on function public.protect_property_moderation() from public, anon, authenticated;

-- Accepted long-term bookings take the property off the public market.
create or replace function public.sync_booking_side_effects() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    insert into public.availability (property_id, booking_id, start_date, end_date, status, created_by)
    values (new.property_id, new.id, new.start_date, new.end_date, 'RESERVED', new.renter_id);
    insert into public.notifications (user_id, type, title, message, metadata)
    values (new.owner_id, 'BOOKING_REQUEST', 'New booking request', 'A renter submitted a booking request for your property.', jsonb_build_object('booking_id', new.id));
  elsif new.status is distinct from old.status then
    if new.status = 'APPROVED' then
      update public.availability set status = 'BOOKED' where booking_id = new.id;
      if new.rental_mode = 'LONG_TERM' then
        update public.properties set is_available = false where id = new.property_id and owner_id = new.owner_id;
      end if;
    elsif new.status in ('REJECTED', 'CANCELLED') then
      delete from public.availability where booking_id = new.id;
    end if;
    if new.status in ('APPROVED', 'REJECTED', 'CANCELLED') then
      insert into public.notifications (user_id, type, title, message, metadata)
      values (case when new.status = 'CANCELLED' then new.owner_id else new.renter_id end,
        case new.status when 'APPROVED' then 'BOOKING_APPROVED'::public.notification_type when 'REJECTED' then 'BOOKING_REJECTED'::public.notification_type else 'BOOKING_CANCELLED'::public.notification_type end,
        initcap(lower(new.status::text)) || ' booking', 'Booking status changed to ' || new.status::text || '.', jsonb_build_object('booking_id', new.id));
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function public.sync_booking_side_effects() from public, anon, authenticated;
