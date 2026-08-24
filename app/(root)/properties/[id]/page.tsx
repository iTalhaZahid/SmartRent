import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {PropertyDetailsView} from "@/components/properties/property-details-view";
import {createClient} from "@/lib/supabase/server";
import {queryPropertyConversation, queryPublicPropertyDetails, queryPublicPropertyMetadata} from "@/queries/properties/details";
import {getPropertyImageUrl} from "@/queries/properties/images";
import type {PropertyDetails} from "@/types/properties/property";
import {getDemoPropertyGallery} from "@/utils/properties/constants";

export async function generateMetadata({params}: {params: Promise<{id: string}>}): Promise<Metadata> {
  const {id} = await params;
  const supabase = await createClient();
  const {data} = await queryPublicPropertyMetadata(supabase, id);
  return data
    ? {
        title: data.title,
        description: `View ${data.title} in ${data.city} on SmartRent.`,
      }
    : {title: "Property not found"};
}

export default async function PropertyDetailsPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const supabase = await createClient();
  const {data, error} = await queryPublicPropertyDetails(supabase, id);

  if (error || !data) notFound();
  const property = data as PropertyDetails;
  const {data: claimsData} = await supabase.auth.getClaims();
  const currentUserId = claimsData?.claims?.sub;
  const {data: conversation} = currentUserId && currentUserId !== property.owner_id ? await queryPropertyConversation(supabase, property.id) : {data: []};
  const storedImages = [...property.property_images]
    .sort((a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order)
    .map((image) => ({
      src: getPropertyImageUrl(supabase, image.storage_path),
      alt: image.alt_text || `${property.title} property photo`,
    }));
  const demoImages = getDemoPropertyGallery(property.id);

  return <PropertyDetailsView property={property} images={demoImages.length ? demoImages : storedImages} currentUserId={currentUserId} conversation={conversation ?? []} />;
}
