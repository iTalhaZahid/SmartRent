import type {SupabaseClient} from "@supabase/supabase-js";

export function querySiteProfile(supabase: SupabaseClient, userId: string) {
  return supabase.from("profiles").select("full_name,role").eq("id", userId).maybeSingle();
}

export function queryRecentReceivedMessages(supabase: SupabaseClient, userId: string) {
  return supabase.from("messages").select("id,property_id,sender_id,content,is_read,created_at").eq("receiver_id", userId).order("created_at", {ascending: false}).limit(50);
}

export function queryNotificationProperties(supabase: SupabaseClient, propertyIds: string[]) {
  return supabase.from("properties").select("id,title,monthly_price,short_term_price,property_images(storage_path,is_cover,sort_order)").in("id", propertyIds);
}

export function queryNotificationConversations(supabase: SupabaseClient, propertyIds: string[]) {
  return supabase.from("messages").select("id,property_id,sender_id,receiver_id,content,created_at").in("property_id", propertyIds).order("created_at", {ascending: true});
}
