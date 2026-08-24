"use client";

import {useActionState} from "react";
import {CalendarCheck} from "lucide-react";
import {requestBookingAction} from "@/queries/properties/property-actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function BookingRequestForm({propertyId, rentalMode, maxOccupants}: {propertyId: string; rentalMode: "SHORT_TERM" | "LONG_TERM" | "BOTH"; maxOccupants: number}) {
  const [state, action, pending] = useActionState(requestBookingAction, {});
  return (
    <form id="book-property" action={action} className="mt-6 scroll-mt-24 space-y-3 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
      <input type="hidden" name="propertyId" value={propertyId} />
      <h3 className="font-semibold text-slate-950">Request this property</h3>
      <div>
        <Label htmlFor="rental-mode">Rental option</Label>
        <select id="rental-mode" name="rentalMode" className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm" defaultValue={rentalMode === "LONG_TERM" ? "LONG_TERM" : "SHORT_TERM"}>
          {rentalMode !== "LONG_TERM" && <option value="SHORT_TERM">Temporary stay</option>}
          {rentalMode !== "SHORT_TERM" && <option value="LONG_TERM">Rent long term</option>}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="booking-from">From</Label>
          <Input id="booking-from" name="startDate" type="date" required />
        </div>
        <div>
          <Label htmlFor="booking-to">To</Label>
          <Input id="booking-to" name="endDate" type="date" required />
        </div>
      </div>
      <div>
        <Label htmlFor="occupants">Occupants</Label>
        <Input id="occupants" name="occupants" type="number" min={1} max={maxOccupants} defaultValue={1} required />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm text-emerald-700">
          {state.success}
        </p>
      )}
      <Button className="w-full" disabled={pending}>
        <CalendarCheck />
        {pending ? "Sending request..." : "Request booking"}
      </Button>
    </form>
  );
}
