"use server";

import {redirect} from "next/navigation";
import {z} from "zod";

import {createClient} from "@/lib/supabase/server";
import type {PropertyActionState} from "@/types/properties/forms";

const propertySchema = z
  .object({
    title: z.string().trim().min(5, "Use at least 5 characters.").max(120, "Keep the title under 120 characters."),
    description: z.string().trim().min(30, "Tell renters a little more (at least 30 characters).").max(3000, "Keep the description under 3,000 characters."),
    address: z.string().trim().min(5, "Enter the property address.").max(200, "Keep the address under 200 characters."),
    city: z.string().trim().min(2, "Enter the city.").max(80, "Keep the city under 80 characters."),
    propertyType: z.enum(["Apartment", "House", "Condo", "Studio", "Townhouse", "Room"], {message: "Choose a property type."}),
    rentalMode: z.enum(["SHORT_TERM", "LONG_TERM", "BOTH"], {
      message: "Choose a rental mode.",
    }),
    bedrooms: z.coerce.number().int().min(0, "Bedrooms cannot be negative.").max(50, "Enter 50 bedrooms or fewer."),
    bathrooms: z.coerce.number().min(0, "Bathrooms cannot be negative.").max(50, "Enter 50 bathrooms or fewer."),
    maxOccupants: z.coerce.number().int().min(1, "Allow at least one occupant.").max(100, "Enter 100 occupants or fewer."),
    shortTermPrice: z.union([z.literal(""), z.coerce.number().positive("Enter a nightly price greater than zero.")]),
    monthlyPrice: z.union([z.literal(""), z.coerce.number().positive("Enter a monthly price greater than zero.")]),
    availableFrom: z.union([z.literal(""), z.iso.date()]),
    availableTo: z.union([z.literal(""), z.iso.date()]),
  })
  .superRefine((data, context) => {
    if (data.rentalMode !== "LONG_TERM" && data.shortTermPrice === "") {
      context.addIssue({
        code: "custom",
        path: ["shortTermPrice"],
        message: "Enter a nightly price.",
      });
    }
    if (data.rentalMode !== "SHORT_TERM" && data.monthlyPrice === "") {
      context.addIssue({
        code: "custom",
        path: ["monthlyPrice"],
        message: "Enter a monthly price.",
      });
    }
    if (data.availableFrom && data.availableTo && data.availableTo <= data.availableFrom) {
      context.addIssue({
        code: "custom",
        path: ["availableTo"],
        message: "The end date must be after the start date.",
      });
    }
  });

export async function createPropertyAction(_previousState: PropertyActionState, formData: FormData): Promise<PropertyActionState> {
  const photos = formData.getAll("photos").filter((photo): photo is File => photo instanceof File && photo.size > 0);
  if (photos.length > 6) return {error: "Choose no more than 6 property photos."};
  if (photos.some((photo) => !["image/jpeg", "image/png", "image/webp"].includes(photo.type))) {
    return {error: "Photos must be JPG, PNG, or WebP files."};
  }
  if (photos.some((photo) => photo.size > 5 * 1024 * 1024)) {
    return {error: "Each photo must be 5 MB or smaller."};
  }

  const parsed = propertySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      error: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const supabase = await createClient();
  const {data: claimsData, error: authError} = await supabase.auth.getClaims();
  const ownerId = claimsData?.claims?.sub;

  if (authError || !ownerId) redirect("/login?next=/properties/new");

  const {data: profile} = await supabase.from("profiles").select("role,status").eq("id", ownerId).maybeSingle();
  if (!profile || profile.role !== "OWNER" || profile.status !== "ACTIVE") {
    return {
      error: "Only active, registered property-owner accounts can submit listings.",
    };
  }

  const values = parsed.data;
  const {data: property, error} = await supabase
    .from("properties")
    .insert({
      owner_id: ownerId,
      title: values.title,
      description: values.description,
      address: values.address,
      city: values.city,
      property_type: values.propertyType,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
      max_occupants: values.maxOccupants,
      rental_mode: values.rentalMode,
      short_term_price: values.rentalMode === "LONG_TERM" ? null : values.shortTermPrice,
      monthly_price: values.rentalMode === "SHORT_TERM" ? null : values.monthlyPrice,
      available_from: values.availableFrom || null,
      available_to: values.availableTo || null,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "42501") {
      return {
        error: "Only active property-owner accounts can submit listings.",
      };
    }
    return {error: "Your property could not be submitted. Please try again."};
  }

  const uploadedPaths: string[] = [];
  for (const [index, photo] of photos.entries()) {
    const extension = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }[photo.type];
    const path = `${property.id}/${crypto.randomUUID()}.${extension}`;
    const {error: uploadError} = await supabase.storage.from("property-images").upload(path, photo, {contentType: photo.type});
    if (uploadError) {
      if (uploadedPaths.length) await supabase.storage.from("property-images").remove(uploadedPaths);
      await supabase.from("properties").delete().eq("id", property.id);
      return {
        error: "Your photos could not be uploaded. The listing was not saved.",
      };
    }
    uploadedPaths.push(path);

    const {error: imageError} = await supabase.from("property_images").insert({
      property_id: property.id,
      storage_path: path,
      alt_text: `${values.title} photo ${index + 1}`,
      is_cover: index === 0,
      sort_order: index,
    });
    if (imageError) {
      await supabase.storage.from("property-images").remove(uploadedPaths);
      await supabase.from("properties").delete().eq("id", property.id);
      return {
        error: "Your photo details could not be saved. The listing was not created.",
      };
    }
  }

  redirect("/properties/new?submitted=1");
}
