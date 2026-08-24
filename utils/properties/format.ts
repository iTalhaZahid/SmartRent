import type {PropertyListItem, RentalMode} from "@/types/properties/property";

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function formatAvailabilityWindow(from: string | null, to: string | null) {
  if (!from && !to) return "Any date";
  return `${from ? formatDate(from) : "Now"} – ${to ? formatDate(to) : "No end date"}`;
}

export function formatRentalMode(mode: RentalMode) {
  return mode === "BOTH" ? "SHORT + LONG TERM" : mode.replace("_", " ");
}

export function displayPrice(property: Pick<PropertyListItem, "monthly_price" | "short_term_price">) {
  return Number(property.monthly_price ?? property.short_term_price ?? 0);
}
