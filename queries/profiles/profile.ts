import type {SupabaseClient} from "@supabase/supabase-js";

export function queryProfileStatus(supabase: SupabaseClient, userId: string) {
  return supabase.from("profiles").select("status").eq("id", userId).maybeSingle();
}
