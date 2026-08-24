import type {SupabaseClient} from "@supabase/supabase-js";

export function getPropertyImageUrl(supabase: SupabaseClient, storagePath: string) {
  return supabase.storage.from("property-images").getPublicUrl(storagePath).data.publicUrl;
}
