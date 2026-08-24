"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";

import {createClient} from "@/lib/supabase/server";
import type {BookingRequestState, ContactOwnerState} from "@/types/properties/forms";

const messageSchema = z.object({
  propertyId: z.uuid(),
  message: z.string().trim().nonempty("Write a message.").max(1000, "Keep your message under 1,000 characters."),
});

export async function contactOwnerAction(_previousState: ContactOwnerState, formData: FormData): Promise<ContactOwnerState> {
  const parsed = messageSchema.safeParse({
    propertyId: formData.get("propertyId"),
    message: formData.get("message"),
  });
  if (!parsed.success) return {error: parsed.error.issues[0]?.message ?? "Check your message."};

  const supabase = await createClient();
  const {data: claimsData} = await supabase.auth.getClaims();
  const senderId = claimsData?.claims?.sub;
  if (!senderId) redirect(`/login?next=${encodeURIComponent(`/properties/${parsed.data.propertyId}#contact-owner`)}`);

  const [{data: profile}, {data: property}] = await Promise.all([supabase.from("profiles").select("status").eq("id", senderId).maybeSingle(), supabase.from("properties").select("owner_id").eq("id", parsed.data.propertyId).eq("status", "ACTIVE").maybeSingle()]);

  if (!profile || profile.status !== "ACTIVE")
    return {
      error: "Only active registered users can contact property owners.",
    };
  if (!property) return {error: "This property is no longer available."};
  if (property.owner_id === senderId) return {error: "You cannot contact yourself about your own listing."};

  const {error} = await supabase.from("messages").insert({
    sender_id: senderId,
    receiver_id: property.owner_id,
    property_id: parsed.data.propertyId,
    content: parsed.data.message,
  });

  revalidatePath(`/properties/${parsed.data.propertyId}`);
  revalidatePath("/owner/properties");
  return error ? {error: "Your message could not be sent. Please try again."} : {success: "Message sent to the property owner."};
}

const bookingSchema = z
  .object({
    propertyId: z.uuid(),
    rentalMode: z.enum(["SHORT_TERM", "LONG_TERM"]),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    occupants: z.coerce.number().int().min(1).max(100),
  })
  .refine((value) => value.endDate > value.startDate, {
    path: ["endDate"],
    message: "The end date must be after the start date.",
  });

export async function requestBookingAction(_state: BookingRequestState, formData: FormData): Promise<BookingRequestState> {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return {
      error: parsed.error.issues[0]?.message ?? "Check the booking details.",
    };
  const supabase = await createClient();
  const {data: claims} = await supabase.auth.getClaims();
  const renterId = claims?.claims?.sub;
  if (!renterId) redirect(`/login?next=${encodeURIComponent(`/properties/${parsed.data.propertyId}#book-property`)}`);

  const [{data: profile}, {data: property}] = await Promise.all([supabase.from("profiles").select("role,status").eq("id", renterId).maybeSingle(), supabase.from("properties").select("owner_id,rental_mode,max_occupants,available_from,available_to").eq("id", parsed.data.propertyId).eq("status", "ACTIVE").eq("is_available", true).is("deleted_at", null).maybeSingle()]);
  if (!profile || profile.role !== "RENTER" || profile.status !== "ACTIVE") return {error: "Only active viewer accounts can request a booking."};
  if (!property) return {error: "This property is no longer available."};
  if (property.owner_id === renterId) return {error: "You cannot book your own property."};
  if (parsed.data.occupants > property.max_occupants)
    return {
      error: `This property allows up to ${property.max_occupants} occupants.`,
    };
  if (property.rental_mode !== "BOTH" && property.rental_mode !== parsed.data.rentalMode) return {error: "This rental option is not offered for this property."};
  if (property.available_from && parsed.data.startDate < property.available_from)
    return {
      error: "The requested start date is before this property becomes available.",
    };
  if (property.available_to && parsed.data.endDate > property.available_to)
    return {
      error: "The requested end date is outside this property's availability.",
    };

  const {error} = await supabase.from("bookings").insert({
    property_id: parsed.data.propertyId,
    renter_id: renterId,
    owner_id: property.owner_id,
    rental_mode: parsed.data.rentalMode,
    start_date: parsed.data.startDate,
    end_date: parsed.data.endDate,
    occupants: parsed.data.occupants,
    estimated_cost: 0,
  });
  if (error)
    return {
      error: error.code === "23P01" ? "Those dates already have a booking request." : "Your booking request could not be sent.",
    };
  revalidatePath(`/properties/${parsed.data.propertyId}`);
  revalidatePath("/owner/properties");
  return {
    success: "Booking request sent. The owner can now accept or reject it.",
  };
}
