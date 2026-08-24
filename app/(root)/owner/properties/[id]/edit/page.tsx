import Link from "next/link";
import {notFound, redirect} from "next/navigation";
import {updatePropertyAction} from "@/queries/properties/owner-actions";
import {PropertyForm} from "@/components/properties/property-form";
import {createClient} from "@/lib/supabase/server";
import {queryOwnerPropertyForEdit} from "@/queries/properties/owner";
export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params,
    s = await createClient(),
    {data: c} = await s.auth.getClaims(),
    ownerId = c?.claims?.sub;
  if (!ownerId) redirect(`/login?next=${encodeURIComponent(`/owner/properties/${id}/edit`)}`);
  const {data: p} = await queryOwnerPropertyForEdit(s, id, ownerId);
  if (!p) notFound();
  return (
    <main className="flex-1 bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/owner/properties">← Back to dashboard</Link>
        <h1 className="my-8 text-3xl font-bold">Edit property</h1>
        <PropertyForm
          action={updatePropertyAction.bind(null, id)}
          initial={{
            title: p.title,
            description: p.description,
            address: p.address,
            city: p.city,
            propertyType: p.property_type,
            bedrooms: p.bedrooms,
            bathrooms: Number(p.bathrooms),
            maxOccupants: p.max_occupants,
            rentalMode: p.rental_mode,
            shortTermPrice: p.short_term_price ? Number(p.short_term_price) : null,
            monthlyPrice: p.monthly_price ? Number(p.monthly_price) : null,
            availableFrom: p.available_from,
            availableTo: p.available_to,
          }}
        />
      </div>
    </main>
  );
}
