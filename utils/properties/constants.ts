export const PROPERTY_TYPES = ["Apartment", "House", "Condo", "Studio", "Townhouse", "Room"] as const;

export const DEMO_PROPERTY_IDS = new Set(["00000000-0000-4000-8000-000000000101", "00000000-0000-4000-8000-000000000105", "00000000-0000-4000-8000-000000000106", "00000000-0000-4000-8000-000000000107"]);

export const DEMO_PROPERTY_GALLERY = [
  {
    src: "/properties/margalla/living-room.png",
    alt: "Warm modern living room with Margalla Hills views",
  },
  {
    src: "/properties/margalla/bedroom.png",
    alt: "Bright primary bedroom with natural wood furnishings",
  },
  {
    src: "/properties/margalla/balcony.png",
    alt: "Furnished balcony overlooking the Margalla Hills",
  },
];

export const MARKETING_PROPERTY_IMAGES = {
  livingRoom: DEMO_PROPERTY_GALLERY[0].src,
  bedroom: DEMO_PROPERTY_GALLERY[1].src,
  balcony: DEMO_PROPERTY_GALLERY[2].src,
} as const;

export function getDemoPropertyCover(propertyId: string) {
  return DEMO_PROPERTY_IDS.has(propertyId) ? DEMO_PROPERTY_GALLERY[0].src : null;
}

export function getDemoPropertyGallery(propertyId: string) {
  return DEMO_PROPERTY_IDS.has(propertyId) ? DEMO_PROPERTY_GALLERY : [];
}
