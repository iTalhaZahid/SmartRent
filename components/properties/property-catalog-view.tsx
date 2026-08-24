import Link from "next/link";
import {Bath, BedDouble, Building2, ChevronDown, House, MapPin, Search, SlidersHorizontal, Users} from "lucide-react";
import {PropertyActions} from "@/components/properties/property-actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import type {PropertyCatalogItem, PropertySearchParams} from "@/types/properties/catalog";
import {PROPERTY_TYPES} from "@/utils/properties/constants";
import {formatDate, formatRentalMode} from "@/utils/properties/format";
import {searchDate, searchValue} from "@/utils/properties/search";

type Props = {
  properties: PropertyCatalogItem[];
  params: PropertySearchParams;
  sort: string;
  isRegistered: boolean;
  error: boolean;
};

export function PropertyCatalogView({properties, params, sort, isRegistered, error}: Props) {
  return (
    <main className="flex-1 bg-[#f8faf8]">
      <CatalogHeader city={searchValue(params.city)} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <details className="group mb-5 rounded-xl border border-slate-200 bg-white lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4" /> Filters
            </span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-slate-100 p-4">
            <PropertyFilters params={params} />
          </div>
        </details>
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-teal-700" />
                <h2 className="font-semibold text-slate-950">Filters</h2>
              </div>
              <PropertyFilters params={params} />
            </div>
          </aside>
          <section aria-labelledby="results-title">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 id="results-title" className="text-xl font-semibold text-slate-950">
                  Available properties
                </h2>
                <p className="mt-1 text-sm text-slate-500">{error ? "Results unavailable" : `${properties.length} ${properties.length === 1 ? "property" : "properties"} found`}</p>
              </div>
              <SortForm params={params} sort={sort} />
            </div>
            {error ? (
              <EmptyState title="Properties could not be loaded" description="Please refresh the page and try again." />
            ) : properties.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} isRegistered={isRegistered} />
                ))}
              </div>
            ) : (
              <EmptyState title="No properties match your search" description="Try changing or clearing your filters to see more homes." clearFilters />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function CatalogHeader({city}: {city: string}) {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Find your next home</p>
        <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Browse properties</h1>
            <p className="mt-2 max-w-xl text-slate-600">Explore approved rentals from trusted property owners.</p>
          </div>
          <form className="flex w-full max-w-xl gap-2" action="/properties">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Label htmlFor="city-search" className="sr-only">
                Search by city
              </Label>
              <Input id="city-search" name="city" defaultValue={city} placeholder="Search by city" className="h-11 pl-10" />
            </div>
            <Button type="submit" className="h-11 px-5">
              <Search /> Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
function PropertyFilters({params}: {params: PropertySearchParams}) {
  return (
    <form action="/properties" className="space-y-5">
      <PreservedFilters params={params} exclude="type,mode,bedrooms,maxPrice,availableFrom,availableTo,sort" />
      <FilterSelect label="Property type" name="type" defaultValue={searchValue(params.type)}>
        <option value="">Any type</option>
        {PROPERTY_TYPES.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </FilterSelect>
      <FilterSelect label="Rental mode" name="mode" defaultValue={searchValue(params.mode)}>
        <option value="">Any mode</option>
        <option value="SHORT_TERM">Short term</option>
        <option value="LONG_TERM">Long term</option>
        <option value="BOTH">Both</option>
      </FilterSelect>
      <FilterSelect label="Bedrooms" name="bedrooms" defaultValue={searchValue(params.bedrooms)}>
        <option value="">Any</option>
        {[1, 2, 3, 4].map((count) => (
          <option key={count} value={count}>
            {count}+
          </option>
        ))}
      </FilterSelect>
      <div className="space-y-2">
        <Label htmlFor="filter-max-price">Maximum price (PKR)</Label>
        <Input id="filter-max-price" name="maxPrice" type="number" inputMode="numeric" min="0" defaultValue={searchValue(params.maxPrice)} placeholder="Any price" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-available-from">Available from</Label>
        <Input id="filter-available-from" name="availableFrom" type="date" defaultValue={searchDate(params.availableFrom)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-available-to">Available until</Label>
        <Input id="filter-available-to" name="availableTo" type="date" min={searchDate(params.availableFrom) || undefined} defaultValue={searchDate(params.availableTo)} />
      </div>
      <Button type="submit" className="w-full">
        Show results
      </Button>
      <Button variant="ghost" className="w-full text-slate-600" asChild>
        <Link href="/properties">Clear filters</Link>
      </Button>
    </form>
  );
}
function FilterSelect({label, name, defaultValue, children}: {label: string; name: string; defaultValue: string; children: React.ReactNode}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`filter-${name}`}>{label}</Label>
      <select id={`filter-${name}`} name={name} defaultValue={defaultValue} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
        {children}
      </select>
    </div>
  );
}
function SortForm({params, sort}: {params: PropertySearchParams; sort: string}) {
  return (
    <form>
      <PreservedFilters params={params} exclude="sort" />
      <Label htmlFor="sort" className="sr-only">
        Sort properties
      </Label>
      <select id="sort" name="sort" defaultValue={sort} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm" aria-label="Sort properties">
        <option value="newest">Newest first</option>
        <option value="price-low">Price: low to high</option>
        <option value="price-high">Price: high to low</option>
      </select>
      <Button type="submit" variant="outline" className="ml-2 h-10">
        Apply
      </Button>
    </form>
  );
}
function PreservedFilters({params, exclude}: {params: PropertySearchParams; exclude: string}) {
  const excluded = new Set(exclude.split(","));
  return <>{Object.entries(params).map(([name, raw]) => (!excluded.has(name) && typeof raw === "string" ? <input key={name} type="hidden" name={name} value={raw} /> : null))}</>;
}
function PropertyCard({property, isRegistered}: {property: PropertyCatalogItem; isRegistered: boolean}) {
  const prices = [property.short_term_price ? {value: property.short_term_price, period: "night"} : null, property.monthly_price ? {value: property.monthly_price, period: "month"} : null].filter((price): price is {value: number; period: string} => price !== null);
  const bookedRanges = [...property.availability].sort((a, b) => a.start_date.localeCompare(b.start_date));
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2">
      <Link href={`/properties/${property.id}`} className="absolute inset-0 z-[1] rounded-2xl" aria-label={`View ${property.title}`} />
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-50 via-slate-100 to-teal-100" role="img" aria-label={`${property.title} property photo`}>
        {property.imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url(${JSON.stringify(property.imageUrl)})`,
            }}
          />
        ) : (
          <House className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-teal-700/30" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-teal-800 shadow-sm backdrop-blur-sm">{formatRentalMode(property.rental_mode)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-teal-700">{property.property_type}</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="size-3.5" /> {property.city}
          </span>
        </div>
        <h3 className="line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-slate-950">{property.title}</h3>
        <div className="flex min-h-11 flex-wrap content-center gap-3 border-y border-slate-100 py-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="size-4 text-slate-400" /> {property.bedrooms} beds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="size-4 text-slate-400" /> {property.bathrooms} baths
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-slate-400" /> {property.max_occupants}
          </span>
        </div>
        <div className={`mt-3 grid min-h-11 gap-3 ${prices.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {prices.map((price) => (
            <p key={price.period} className="min-w-0">
              <span className="block truncate text-lg font-bold text-slate-950">PKR {Number(price.value).toLocaleString("en-PK")}</span>
              <span className="text-xs text-slate-500">per {price.period}</span>
            </p>
          ))}
        </div>
        {(property.available_from || property.available_to) && (
          <p className="mt-2 text-xs text-slate-500">
            Available {property.available_from ? `from ${formatDate(property.available_from)}` : "now"}
            {property.available_to ? ` until ${formatDate(property.available_to)}` : ""}
          </p>
        )}
        {bookedRanges.slice(0, 2).map((range) => (
          <p key={range.id} className="mt-1 text-xs font-medium text-amber-700">
            Booked from {formatDate(range.start_date)} to {formatDate(range.end_date)}
            {range.status !== "BOOKED" ? " · Temporary hold" : ""}
          </p>
        ))}
        <PropertyActions propertyId={property.id} isRegistered={isRegistered} />
      </div>
    </article>
  );
}
function EmptyState({title, description, clearFilters = false}: {title: string; description: string; clearFilters?: boolean}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-teal-50 text-teal-700">
        <Building2 />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {clearFilters && (
        <Button className="mt-5" asChild>
          <Link href="/properties">Clear filters</Link>
        </Button>
      )}
    </div>
  );
}
