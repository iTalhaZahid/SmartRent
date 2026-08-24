import type {FormActionState} from "@/types/forms/action-state";
import type {RentalMode} from "@/types/properties/property";

export type PropertyActionState = Pick<FormActionState, "error" | "fieldErrors">;
export type ContactOwnerState = Pick<FormActionState, "error" | "success">;
export type BookingRequestState = Pick<FormActionState, "error" | "success">;

export type PropertyFormValues = {
  title: string;
  description: string;
  address: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  maxOccupants: number;
  rentalMode: RentalMode;
  shortTermPrice: number | null;
  monthlyPrice: number | null;
  availableFrom: string | null;
  availableTo: string | null;
};
