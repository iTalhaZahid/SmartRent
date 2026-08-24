import {Bath, BedDouble, Building2, CalendarCheck, CheckCircle2, House, MapPin, ShieldCheck, Users} from "lucide-react";
import {PropertyGallery} from "@/components/properties/property-gallery";
import {ViewerPropertyActions} from "@/components/properties/viewer-property-actions";
import type {PropertyMessage} from "@/types/messages/message";
import type {PropertyDetails} from "@/types/properties/property";
import {formatDate, formatRentalMode} from "@/utils/properties/format";

type Props = {
  property: PropertyDetails;
  images: {src: string; alt: string}[];
  currentUserId?: string;
  conversation: PropertyMessage[];
};

export function PropertyDetailsView({property, images, currentUserId, conversation}: Props) {
  return (
    <main className="flex-1 bg-[#f8faf8] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {images.length ? (
          <PropertyGallery images={images} title={property.title} />
        ) : (
          <div className="grid aspect-[16/7] place-items-center rounded-2xl bg-gradient-to-br from-teal-50 via-slate-100 to-teal-100" role="img" aria-label={`${property.title} photo placeholder`}>
            <House className="size-20 text-teal-700/25" />
          </div>
        )}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <span>{formatRentalMode(property.rental_mode)}</span>
              <span className="text-slate-300">·</span>
              <span>{property.property_type}</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{property.title}</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-slate-600">
              <MapPin className="size-4 text-teal-700" /> {property.address}, {property.city}
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:max-w-xl sm:p-5">
              <Fact icon={BedDouble} value={property.bedrooms} label="Bedrooms" />
              <Fact icon={Bath} value={property.bathrooms} label="Bathrooms" />
              <Fact icon={Users} value={property.max_occupants} label="Guests" />
            </div>
            <Section title="About this property">
              <p className="max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600">{property.description}</p>
            </Section>
            <Section title="What this home offers">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Verified property listing", "Secure booking requests", `${property.max_occupants} guest capacity`, `${property.property_type} in ${property.city}`].map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="size-5 shrink-0 text-teal-700" /> {item}
                  </p>
                ))}
              </div>
            </Section>
            <Section title="Availability">
              <p className="text-sm text-slate-600">
                Available {property.available_from ? `from ${formatDate(property.available_from)}` : "now"}
                {property.available_to ? ` until ${formatDate(property.available_to)}` : " with no fixed end date"}.
              </p>
              {property.availability.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.availability.map((range) => (
                    <span key={range.id} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700">
                      {range.status === "BLOCKED" ? "Unavailable" : "Booked"}: {formatDate(range.start_date)} – {formatDate(range.end_date)}
                    </span>
                  ))}
                </div>
              )}
            </Section>
          </div>
          <aside>
            <div id="contact-owner" className="sticky top-24 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Rental price</p>
              {property.monthly_price && <Price amount={property.monthly_price} period="month" />}
              {property.short_term_price && <Price amount={property.short_term_price} period="night" secondary={!!property.monthly_price} />}
              <div className="my-5 border-t border-slate-100" />
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarCheck className="size-4 text-teal-700" /> Availability confirmed when requested
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-teal-700" /> Your payment details stay protected
                </p>
              </div>
              <ViewerPropertyActions
                property={{
                  id: property.id,
                  title: property.title,
                  rentalMode: property.rental_mode,
                  maxOccupants: property.max_occupants,
                  monthlyPrice: property.monthly_price,
                  nightlyPrice: property.short_term_price,
                  imageUrl: images[0]?.src ?? null,
                }}
                currentUserId={currentUserId}
                ownerId={property.owner_id}
                messages={conversation}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="mt-9 border-t border-slate-200 pt-8">
      <h2 className="mb-4 text-2xl font-semibold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}
function Fact({icon: Icon, value, label}: {icon: typeof Building2; value: number; label: string}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto size-5 text-teal-700" />
      <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
function Price({amount, period, secondary = false}: {amount: number; period: string; secondary?: boolean}) {
  return (
    <p className={secondary ? "mt-1 text-sm text-slate-600" : "mt-1"}>
      <span className={secondary ? "font-semibold" : "text-2xl font-bold text-slate-950"}>PKR {Number(amount).toLocaleString("en-PK")}</span>
      <span className="text-sm text-slate-500"> / {period}</span>
    </p>
  );
}
