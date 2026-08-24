export type RentalMode = "SHORT_TERM" | "LONG_TERM" | "BOTH";
export type AvailabilityStatus = "RESERVED" | "BOOKED" | "BLOCKED";

export type PropertyImage = {
  storage_path: string;
  alt_text: string | null;
  is_cover: boolean;
  sort_order: number;
};

export type AvailabilityRange = {
  id: string;
  start_date: string;
  end_date: string;
  status: AvailabilityStatus;
  reason?: string | null;
};

export type PropertyListItem = {
  id: string;
  title: string;
  city: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  max_occupants: number;
  rental_mode: RentalMode;
  short_term_price: number | null;
  monthly_price: number | null;
  created_at: string;
  available_from: string | null;
  available_to: string | null;
  availability: AvailabilityRange[];
  property_images: PropertyImage[];
};

export type PropertyDetails = PropertyListItem & {
  owner_id: string;
  description: string;
  address: string;
};
