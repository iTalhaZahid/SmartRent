"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import type {PropertyActionState} from "@/types/properties/forms";
import {createClient} from "@/lib/supabase/server";

const schema = z
  .object({
    title: z.string().trim().min(5).max(120),
    description: z.string().trim().min(30).max(3000),
    address: z.string().trim().min(5).max(200),
    city: z.string().trim().min(2).max(80),
    propertyType: z.enum(["Apartment", "House", "Condo", "Studio", "Townhouse", "Room"]),
    rentalMode: z.enum(["SHORT_TERM", "LONG_TERM", "BOTH"]),
    bedrooms: z.coerce.number().int().min(0).max(50),
    bathrooms: z.coerce.number().min(0).max(50),
    maxOccupants: z.coerce.number().int().min(1).max(100),
    shortTermPrice: z.union([z.literal(""), z.coerce.number().positive()]),
    monthlyPrice: z.union([z.literal(""), z.coerce.number().positive()]),
    availableFrom: z.union([z.literal(""), z.iso.date()]),
    availableTo: z.union([z.literal(""), z.iso.date()]),
  })
  .superRefine((d, c) => {
    if (d.rentalMode !== "LONG_TERM" && d.shortTermPrice === "")
      c.addIssue({
        code: "custom",
        path: ["shortTermPrice"],
        message: "Enter a nightly price.",
      });
    if (d.rentalMode !== "SHORT_TERM" && d.monthlyPrice === "")
      c.addIssue({
        code: "custom",
        path: ["monthlyPrice"],
        message: "Enter a monthly price.",
      });
    if (d.availableFrom && d.availableTo && d.availableTo <= d.availableFrom)
      c.addIssue({
        code: "custom",
        path: ["availableTo"],
        message: "The end date must be after the start date.",
      });
  });

async function activeOwner() {
  const supabase = await createClient();
  const {data} = await supabase.auth.getClaims();
  const ownerId = data?.claims?.sub;
  if (!ownerId) redirect("/login?next=/owner/properties");
  const {data: profile} = await supabase.from("profiles").select("role,status").eq("id", ownerId).maybeSingle();
  if (!profile || profile.role !== "OWNER" || profile.status !== "ACTIVE") throw new Error("Owner account required.");
  return {supabase, ownerId};
}

export async function setPropertyAvailabilityAction(formData: FormData) {
  const parsed = z.object({propertyId: z.uuid(), isAvailable: z.enum(["true", "false"])}).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const {supabase, ownerId} = await activeOwner();
  await supabase
    .from("properties")
    .update({is_available: parsed.data.isAvailable === "true"})
    .eq("id", parsed.data.propertyId)
    .eq("owner_id", ownerId);
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
}

export async function removePropertyAction(formData: FormData) {
  const parsed = z.uuid().safeParse(formData.get("propertyId"));
  if (!parsed.success) return;
  const {supabase, ownerId} = await activeOwner();
  await supabase.from("properties").update({deleted_at: new Date().toISOString(), is_available: false}).eq("id", parsed.data).eq("owner_id", ownerId).is("deleted_at", null);
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${parsed.data}`);
}

export async function replyToViewerAction(formData: FormData) {
  const parsed = z
    .object({
      propertyId: z.uuid(),
      viewerId: z.uuid(),
      message: z.string().trim().nonempty().max(1000),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const {supabase, ownerId} = await activeOwner();
  const [{data: property}, {data: thread}] = await Promise.all([supabase.from("properties").select("id").eq("id", parsed.data.propertyId).eq("owner_id", ownerId).is("deleted_at", null).maybeSingle(), supabase.from("messages").select("id").eq("property_id", parsed.data.propertyId).or(`sender_id.eq.${parsed.data.viewerId},receiver_id.eq.${parsed.data.viewerId}`).limit(1)]);
  if (!property || !thread?.length) return;
  await supabase.from("messages").insert({
    sender_id: ownerId,
    receiver_id: parsed.data.viewerId,
    property_id: parsed.data.propertyId,
    content: parsed.data.message,
  });
  revalidatePath("/owner/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
}

export async function blockPropertyDatesAction(formData: FormData) {
  const parsed = z
    .object({
      propertyId: z.uuid(),
      startDate: z.iso.date(),
      endDate: z.iso.date(),
      reason: z.string().trim().max(200).optional(),
    })
    .refine((d) => d.endDate > d.startDate, {path: ["endDate"]})
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const {supabase, ownerId} = await activeOwner();
  await supabase.from("availability").insert({
    property_id: parsed.data.propertyId,
    start_date: parsed.data.startDate,
    end_date: parsed.data.endDate,
    status: "BLOCKED",
    reason: parsed.data.reason || "Owner blocked dates",
    created_by: ownerId,
  });
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
}

export async function unblockPropertyDatesAction(formData: FormData) {
  const parsed = z.object({propertyId: z.uuid(), availabilityId: z.uuid()}).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const {supabase} = await activeOwner();
  await supabase.from("availability").delete().eq("id", parsed.data.availabilityId).eq("property_id", parsed.data.propertyId).eq("status", "BLOCKED");
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
}

export async function respondToBookingAction(formData: FormData) {
  const parsed = z
    .object({
      bookingId: z.uuid(),
      propertyId: z.uuid(),
      decision: z.enum(["APPROVED", "REJECTED"]),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const {supabase, ownerId} = await activeOwner();
  const {data, error} = await supabase.from("bookings").update({status: parsed.data.decision}).eq("id", parsed.data.bookingId).eq("property_id", parsed.data.propertyId).eq("owner_id", ownerId).eq("status", "PENDING").select("id,rental_mode").maybeSingle();
  if (error || !data) return;
  if (parsed.data.decision === "APPROVED" && data.rental_mode === "LONG_TERM") await supabase.from("properties").update({is_available: false}).eq("id", parsed.data.propertyId).eq("owner_id", ownerId);
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${parsed.data.propertyId}`);
}

export async function updatePropertyAction(propertyId: string, _state: PropertyActionState, formData: FormData): Promise<PropertyActionState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return {
      error: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  const photos = formData.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);
  if (photos.length > 6 || photos.some((p) => p.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(p.type))) return {error: "Choose up to 6 valid photos, no larger than 5 MB each."};
  const {supabase, ownerId} = await activeOwner();
  const v = parsed.data;
  const {data: property, error} = await supabase
    .from("properties")
    .update({
      title: v.title,
      description: v.description,
      address: v.address,
      city: v.city,
      property_type: v.propertyType,
      bedrooms: v.bedrooms,
      bathrooms: v.bathrooms,
      max_occupants: v.maxOccupants,
      rental_mode: v.rentalMode,
      short_term_price: v.rentalMode === "LONG_TERM" ? null : v.shortTermPrice,
      monthly_price: v.rentalMode === "SHORT_TERM" ? null : v.monthlyPrice,
      available_from: v.availableFrom || null,
      available_to: v.availableTo || null,
    })
    .eq("id", propertyId)
    .eq("owner_id", ownerId)
    .is("deleted_at", null)
    .select("id,title")
    .maybeSingle();
  if (error || !property) return {error: "This listing could not be updated."};
  const {count} = await supabase.from("property_images").select("id", {count: "exact", head: true}).eq("property_id", propertyId);
  for (const [index, photo] of photos.entries()) {
    const extension = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }[photo.type];
    const path = `${propertyId}/${crypto.randomUUID()}.${extension}`;
    const {error: uploadError} = await supabase.storage.from("property-images").upload(path, photo, {contentType: photo.type});
    if (uploadError)
      return {
        error: "The listing was updated, but a new photo could not be uploaded.",
      };
    await supabase.from("property_images").insert({
      property_id: propertyId,
      storage_path: path,
      alt_text: `${property.title} photo ${(count ?? 0) + index + 1}`,
      is_cover: (count ?? 0) === 0 && index === 0,
      sort_order: (count ?? 0) + index,
    });
  }
  revalidatePath("/owner/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${propertyId}`);
  redirect("/owner/properties?updated=1");
}
