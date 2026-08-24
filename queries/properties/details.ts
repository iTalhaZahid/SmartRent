import type {SupabaseClient} from "@supabase/supabase-js";

export function queryPublicPropertyMetadata(supabase: SupabaseClient, propertyId: string) {
  return supabase.from("properties").select("title,city").eq("id", propertyId).eq("status", "ACTIVE").eq("is_available", true).is("deleted_at", null).maybeSingle();
}

export function queryPublicPropertyDetails(supabase: SupabaseClient, propertyId: string) {
  return supabase.from("properties").select("id,owner_id,title,description,address,city,property_type,bedrooms,bathrooms,max_occupants,short_term_price,monthly_price,rental_mode,available_from,available_to,availability(id,start_date,end_date,status),property_images(storage_path,alt_text,is_cover,sort_order)").eq("id", propertyId).eq("status", "ACTIVE").eq("is_available", true).is("deleted_at", null).maybeSingle();
}

export function queryPropertyConversation(supabase: SupabaseClient, propertyId: string) {
  return supabase.from("messages").select("id,sender_id,content,created_at").eq("property_id", propertyId).order("created_at", {ascending: true});
}
