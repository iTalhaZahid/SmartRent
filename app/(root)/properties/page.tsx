import type {Metadata} from "next";
import {PropertyCatalogView} from "@/components/properties/property-catalog-view";
import {createClient} from "@/lib/supabase/server";
import {queryPropertyCatalog} from "@/queries/properties/catalog";
import {getPropertyImageUrl} from "@/queries/properties/images";
import {queryProfileStatus} from "@/queries/profiles/profile";
import type {PropertyCatalogItem, PropertySearchParams} from "@/types/properties/catalog";
import type {PropertyListItem} from "@/types/properties/property";
import {getDemoPropertyCover, PROPERTY_TYPES} from "@/utils/properties/constants";
import {displayPrice} from "@/utils/properties/format";
import {positiveSearchNumber, searchDate, searchValue} from "@/utils/properties/search";

export const metadata: Metadata = {
  title: "Browse properties",
  description: "Find verified short-term and long-term rental properties on SmartRent.",
};

export default async function PropertiesPage({searchParams}: {searchParams: Promise<PropertySearchParams>}) {
  const params = await searchParams;
  const city = searchValue(params.city);
  const type = searchValue(params.type);
  const mode = searchValue(params.mode);
  const bedrooms = searchValue(params.bedrooms);
  const maxPrice = positiveSearchNumber(params.maxPrice);
  const availableFrom = searchDate(params.availableFrom);
  const availableTo = searchDate(params.availableTo);
  const sort = searchValue(params.sort) || "newest";
  const supabase = await createClient();
  const {data: claimsData} = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  const {data: profile} = userId ? await queryProfileStatus(supabase, userId) : {data: null};

  const {data, error} = await queryPropertyCatalog(supabase, {city, type: PROPERTY_TYPES.includes(type as (typeof PROPERTY_TYPES)[number]) ? type : "", mode, bedrooms});
  const properties = ((data ?? []) as PropertyListItem[])
    .filter((property) => {
      const datesMatch = !availableFrom || !availableTo || availableTo <= availableFrom || ((!property.available_from || property.available_from <= availableFrom) && (!property.available_to || property.available_to >= availableTo) && !property.availability.some((range) => range.start_date < availableTo && range.end_date > availableFrom));
      return (!maxPrice || displayPrice(property) <= maxPrice) && datesMatch;
    })
    .sort((a, b) => (sort === "price-low" ? displayPrice(a) - displayPrice(b) : sort === "price-high" ? displayPrice(b) - displayPrice(a) : 0))
    .slice(0, 60);
  const catalogItems: PropertyCatalogItem[] = properties.map((property) => {
    const cover = [...property.property_images].sort((a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order)[0];
    const imageUrl = getDemoPropertyCover(property.id) ?? (cover ? getPropertyImageUrl(supabase, cover.storage_path) : null);
    return {...property, imageUrl};
  });

  return <PropertyCatalogView properties={catalogItems} params={params} sort={sort} isRegistered={profile?.status === "ACTIVE"} error={!!error} />;
}
