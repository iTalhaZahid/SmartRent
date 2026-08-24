import type {SupabaseClient} from "@supabase/supabase-js";

export type CatalogQueryFilters = {city: string; type: string; mode: string; bedrooms: string};

export function queryPropertyCatalog(supabase: SupabaseClient, filters: CatalogQueryFilters) {
  let query = supabase.from("properties").select("id,title,city,property_type,bedrooms,bathrooms,max_occupants,rental_mode,short_term_price,monthly_price,created_at,available_from,available_to,availability(id,start_date,end_date,status),property_images(storage_path,alt_text,is_cover,sort_order)").eq("status", "ACTIVE").eq("is_available", true).is("deleted_at", null);
  if (filters.city) query = query.ilike("city", `%${filters.city.replaceAll("%", "\\%").replaceAll("_", "\\_")}%`);
  if (filters.type) query = query.eq("property_type", filters.type);
  if (["SHORT_TERM", "LONG_TERM", "BOTH"].includes(filters.mode)) query = query.eq("rental_mode", filters.mode);
  if (/^\d+$/.test(filters.bedrooms)) query = query.gte("bedrooms", Number(filters.bedrooms));
  return query.order("created_at", {ascending: false}).limit(200);
}
