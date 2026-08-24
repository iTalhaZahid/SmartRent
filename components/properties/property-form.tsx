"use client";

import {useActionState, useEffect, useState} from "react";
import Image from "next/image";
import {AlertCircle, ArrowRight, Building2, Check, ImagePlus, LoaderCircle} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {createPropertyAction} from "@/queries/properties/listing-actions";
import type {PropertyActionState, PropertyFormValues} from "@/types/properties/forms";
import {ConfirmSubmitButton} from "@/components/properties/confirm-submit-button";

const rentalModes = [
  {value: "SHORT_TERM", label: "Short term", detail: "Price per night"},
  {value: "LONG_TERM", label: "Long term", detail: "Price per month"},
  {value: "BOTH", label: "Both", detail: "Offer both options"},
] as const;

export function PropertyForm({initial, action = createPropertyAction}: {initial?: PropertyFormValues; action?: (state: PropertyActionState, formData: FormData) => Promise<PropertyActionState>}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [rentalMode, setRentalMode] = useState<(typeof rentalModes)[number]["value"]>(initial?.rentalMode ?? "LONG_TERM");
  const [photos, setPhotos] = useState<{name: string; url: string}[]>([]);
  const errorFor = (name: string) => state.fieldErrors?.[name]?.[0];

  useEffect(() => () => photos.forEach((photo) => URL.revokeObjectURL(photo.url)), [photos]);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.error && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{state.error}</span>
        </div>
      )}

      <FormSection number="01" title="Property details" description="Help renters quickly understand what makes your place a good fit.">
        <Field label="Listing title" name="title" error={errorFor("title")} className="sm:col-span-2">
          <Input id="title" name="title" defaultValue={initial?.title} placeholder="Modern two-bedroom apartment near the city centre" maxLength={120} />
        </Field>
        <Field label="Property type" name="propertyType" error={errorFor("propertyType")}>
          <select id="propertyType" name="propertyType" defaultValue={initial?.propertyType ?? ""} className={selectClass}>
            <option value="" disabled>
              Select a type
            </option>
            {["Apartment", "House", "Condo", "Studio", "Townhouse", "Room"].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="City" name="city" error={errorFor("city")}>
          <Input id="city" name="city" defaultValue={initial?.city} placeholder="Islamabad" />
        </Field>
        <Field label="Street address" name="address" error={errorFor("address")} className="sm:col-span-2">
          <Input id="address" name="address" defaultValue={initial?.address} autoComplete="street-address" placeholder="House 12, Street 8, F-8/2" />
        </Field>
        <Field label="Description" name="description" error={errorFor("description")} className="sm:col-span-2" hint="Include nearby landmarks, furnishings, and anything renters should know.">
          <Textarea id="description" name="description" defaultValue={initial?.description} rows={6} maxLength={3000} placeholder="Describe the space, neighbourhood, and what is included..." className="resize-y" />
        </Field>
      </FormSection>

      <FormSection number="02" title="Capacity" description="Set clear expectations about the size of your property.">
        <Field label="Bedrooms" name="bedrooms" error={errorFor("bedrooms")}>
          <Input id="bedrooms" name="bedrooms" type="number" inputMode="numeric" min="0" max="50" defaultValue={initial?.bedrooms ?? 1} />
        </Field>
        <Field label="Bathrooms" name="bathrooms" error={errorFor("bathrooms")}>
          <Input id="bathrooms" name="bathrooms" type="number" inputMode="decimal" min="0" max="50" step="0.5" defaultValue={initial?.bathrooms ?? 1} />
        </Field>
        <Field label="Maximum occupants" name="maxOccupants" error={errorFor("maxOccupants")} className="sm:col-span-2">
          <Input id="maxOccupants" name="maxOccupants" type="number" inputMode="numeric" min="1" max="100" defaultValue={initial?.maxOccupants ?? 2} />
        </Field>
      </FormSection>

      <FormSection number="03" title="Rental and pricing" description="Choose how renters can book your property.">
        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-sm font-medium text-slate-800">Rental mode</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {rentalModes.map((mode) => (
              <label key={mode.value} className={cn("relative cursor-pointer rounded-xl border p-4 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-primary", rentalMode === mode.value ? "border-teal-700 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300")}>
                <input className="sr-only" type="radio" name="rentalMode" value={mode.value} checked={rentalMode === mode.value} onChange={() => setRentalMode(mode.value)} />
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-900">{mode.label}</span>
                  {rentalMode === mode.value && <Check className="size-4 text-teal-700" />}
                </span>
                <span className="mt-1 block text-xs text-slate-500">{mode.detail}</span>
              </label>
            ))}
          </div>
          {errorFor("rentalMode") && <p className="mt-2 text-sm text-red-600">{errorFor("rentalMode")}</p>}
        </fieldset>
        {rentalMode !== "LONG_TERM" && (
          <Field label="Nightly price" name="shortTermPrice" error={errorFor("shortTermPrice")}>
            <PriceInput id="shortTermPrice" name="shortTermPrice" suffix="/ night" defaultValue={initial?.shortTermPrice} />
          </Field>
        )}
        {rentalMode !== "SHORT_TERM" && (
          <Field label="Monthly price" name="monthlyPrice" error={errorFor("monthlyPrice")}>
            <PriceInput id="monthlyPrice" name="monthlyPrice" suffix="/ month" defaultValue={initial?.monthlyPrice} />
          </Field>
        )}
      </FormSection>

      <FormSection number="04" title="Available dates" description="Optionally set the date window when renters can book this property.">
        <Field label="Available from" name="availableFrom" error={errorFor("availableFrom")}>
          <Input id="availableFrom" name="availableFrom" type="date" defaultValue={initial?.availableFrom ?? undefined} />
        </Field>
        <Field label="Available until" name="availableTo" error={errorFor("availableTo")}>
          <Input id="availableTo" name="availableTo" type="date" defaultValue={initial?.availableTo ?? undefined} />
        </Field>
      </FormSection>

      <FormSection number="05" title="Property photos" description={initial ? "Add new photos to the existing gallery." : "Add up to 6 clear photos. The first photo becomes the listing cover."}>
        <div className="sm:col-span-2">
          <label htmlFor="photos" className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center transition-colors hover:border-teal-600 hover:bg-teal-50/50 has-focus-visible:ring-2 has-focus-visible:ring-primary">
            <ImagePlus className="size-7 text-teal-700" />
            <span className="mt-3 text-sm font-semibold text-slate-900">Choose property photos</span>
            <span className="mt-1 text-xs text-slate-500">JPG, PNG, or WebP · 5 MB each</span>
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(event) => {
                photos.forEach((photo) => URL.revokeObjectURL(photo.url));
                setPhotos(
                  Array.from(event.target.files ?? []).map((file) => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                  })),
                );
              }}
            />
          </label>
          {photos.length > 6 && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              Choose no more than 6 photos.
            </p>
          )}
          {!!photos.length && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.slice(0, 6).map((photo, index) => (
                <div key={photo.url} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                  <Image src={photo.url} alt={`Preview of ${photo.name}`} fill unoptimized className="object-cover" />
                  {index === 0 && <span className="absolute left-2 top-2 rounded bg-slate-950/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Cover</span>}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-slate-950/65 px-2 py-1 text-[10px] text-white">{photo.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormSection>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-slate-500">{initial ? "Changes are saved to your listing. Availability is managed from the owner dashboard." : "Your listing and photos will be sent for review. You can manage availability from your owner dashboard."}</p>
        {initial ? (
          <ConfirmSubmitButton title="Update listing?" message="Your changes will replace the current property details shown to renters." disabled={pending} className="h-11 px-6">
            {pending ? <LoaderCircle className="animate-spin" /> : <Building2 />}
            {pending ? "Saving..." : "Save changes"}
            {!pending && <ArrowRight />}
          </ConfirmSubmitButton>
        ) : (
          <Button type="submit" disabled={pending} className="h-11 px-6">
            {pending ? <LoaderCircle className="animate-spin" /> : <Building2 />}
            {pending ? "Saving..." : "Submit property"}
            {!pending && <ArrowRight />}
          </Button>
        )}
      </div>
    </form>
  );
}

function FormSection({number, title, description, children}: {number: string; title: string; description: string; children: React.ReactNode}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex gap-4 border-b border-slate-100 pb-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-xs font-bold text-teal-700">{number}</span>
        <div>
          <h2 className="font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({label, name, error, hint, className, children}: {label: string; name: string; error?: string; hint?: string; className?: string; children: React.ReactNode}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <div aria-describedby={describedBy} aria-invalid={!!error}>
        {children}
      </div>
      {error ? (
        <p id={`${name}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function PriceInput({id, name, suffix, defaultValue}: {id: string; name: string; suffix: string; defaultValue?: number | null}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-slate-500">PKR</span>
      <Input
        id={id}
        name={name}
        type="number"
        inputMode="numeric"
        min="1"
        step="1"
        defaultValue={defaultValue ?? undefined}
        placeholder="0"
        onKeyDown={(event) => {
          if ([".", ",", "e", "E", "+", "-"].includes(event.key)) event.preventDefault();
        }}
        onInput={(event) => {
          event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
        }}
        className="pl-12 pr-20"
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-400">{suffix}</span>
    </div>
  );
}

const selectClass = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring";
