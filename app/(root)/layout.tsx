import {SiteFooter} from "@/components/marketing/site-footer";
import {SiteHeader} from "@/components/marketing/site-header";
import {createClient} from "@/lib/supabase/server";
import {queryNotificationConversations, queryNotificationProperties, queryRecentReceivedMessages, querySiteProfile} from "@/queries/layout/site";
import {getPropertyImageUrl} from "@/queries/properties/images";
import {getDemoPropertyCover} from "@/utils/properties/constants";

export default async function RootSiteLayout({children}: LayoutProps<"/">) {
  const supabase = await createClient();
  const {data: claimsData} = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  const {data: profile} = userId ? await querySiteProfile(supabase, userId) : {data: null};
  const {data: recentMessageRows} = userId ? await queryRecentReceivedMessages(supabase, userId) : {data: []};
  const seenConversations = new Set<string>();
  const recentMessages = (recentMessageRows ?? [])
    .filter((message) => {
      const key = `${message.property_id}:${message.sender_id}`;
      if (seenConversations.has(key)) return false;
      seenConversations.add(key);
      return true;
    })
    .slice(0, 5);
  const propertyIds = [...new Set((recentMessages ?? []).map((message) => message.property_id))];
  const [{data: properties}, {data: conversationMessages}] = await Promise.all([propertyIds.length ? queryNotificationProperties(supabase, propertyIds) : Promise.resolve({data: []}), propertyIds.length ? queryNotificationConversations(supabase, propertyIds) : Promise.resolve({data: []})]);
  const propertyMap = new Map((properties ?? []).map((property) => [property.id, property]));
  const notifications = (recentMessages ?? []).map((message) => {
    const property = propertyMap.get(message.property_id);
    const cover = property ? [...property.property_images].sort((a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order)[0] : null;
    const imageUrl = getDemoPropertyCover(message.property_id) ?? (cover ? getPropertyImageUrl(supabase, cover.storage_path) : null);
    return {
      ...message,
      otherUserId: message.sender_id,
      propertyTitle: property?.title || "Property listing",
      monthlyPrice: property?.monthly_price ?? null,
      nightlyPrice: property?.short_term_price ?? null,
      imageUrl,
      conversation: (conversationMessages ?? []).filter((item) => item.property_id === message.property_id && (item.sender_id === message.sender_id || item.receiver_id === message.sender_id)),
    };
  });

  return (
    <div className="flex min-h-svh flex-col bg-[#f8faf8]">
      <SiteHeader
        user={
          profile && userId
            ? {
                id: userId,
                name: profile.full_name || "SmartRent user",
                role: profile.role,
              }
            : null
        }
        notifications={notifications}
      />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
