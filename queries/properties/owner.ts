import type {SupabaseClient} from "@supabase/supabase-js";

export function queryOwnerProfile(supabase: SupabaseClient, ownerId: string) {
  return supabase.from("profiles").select("role,status").eq("id", ownerId).maybeSingle();
}

export function queryOwnerDashboard(supabase: SupabaseClient, ownerId: string) {
  return Promise.all([supabase.from("properties").select("id,title,city,status,is_available,monthly_price,short_term_price,available_from,available_to,availability(id,start_date,end_date,status,reason),property_images(storage_path,is_cover,sort_order)").eq("owner_id", ownerId).is("deleted_at", null).order("created_at", {ascending: false}).order("id", {ascending: true}), supabase.from("messages").select("id,property_id,sender_id,receiver_id,content,is_read,created_at").or(`sender_id.eq.${ownerId},receiver_id.eq.${ownerId}`).order("created_at", {ascending: true}), supabase.from("bookings").select("id,property_id,renter_id,rental_mode,start_date,end_date,occupants,estimated_cost,status,created_at").eq("owner_id", ownerId).order("created_at", {ascending: false})]);
}

export function queryViewerNames(supabase: SupabaseClient, viewerIds: string[]) {
  return supabase.from("profiles").select("id,full_name").in("id", viewerIds);
}

export function queryOwnerPropertyForEdit(supabase: SupabaseClient, propertyId: string, ownerId: string) {
  return supabase.from("properties").select("title,description,address,city,property_type,bedrooms,bathrooms,max_occupants,rental_mode,short_term_price,monthly_price,available_from,available_to").eq("id", propertyId).eq("owner_id", ownerId).is("deleted_at", null).maybeSingle();
}
