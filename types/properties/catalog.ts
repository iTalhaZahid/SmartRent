export type PropertySearchParams = Record<string, string | string[] | undefined>;

export type PropertyCatalogItem = import("@/types/properties/property").PropertyListItem & {
  imageUrl: string | null;
};
