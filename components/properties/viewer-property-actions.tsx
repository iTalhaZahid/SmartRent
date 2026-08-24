"use client";

import Link from "next/link";
import {CalendarCheck, LogIn, MessageCircle} from "lucide-react";
import {BookingRequestForm} from "@/components/properties/booking-request-form";
import {ContactOwnerForm} from "@/components/properties/contact-owner-form";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

type Props = {
  property: {
    id: string;
    title: string;
    rentalMode: "SHORT_TERM" | "LONG_TERM" | "BOTH";
    maxOccupants: number;
    monthlyPrice: number | null;
    nightlyPrice: number | null;
    imageUrl: string | null;
  };
  currentUserId?: string;
  ownerId: string;
  messages: {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
  }[];
};

export function ViewerPropertyActions({property, currentUserId, ownerId, messages}: Props) {
  const canAct = !!currentUserId && currentUserId !== ownerId;
  return (
    <div className="mt-6 grid gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <CalendarCheck /> Book now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Request {property.title}</DialogTitle>
            <DialogDescription>Choose the rental option and dates you want the owner to review.</DialogDescription>
          </DialogHeader>
          {canAct ? (
            <div className="[&>form]:mt-0">
              <BookingRequestForm propertyId={property.id} rentalMode={property.rentalMode} maxOccupants={property.maxOccupants} />
            </div>
          ) : (
            <LoginRequired propertyId={property.id} owner={currentUserId === ownerId} action="book this property" />
          )}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <MessageCircle /> Message owner
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{property.title}</DialogTitle>
            <DialogDescription>Property conversation</DialogDescription>
          </DialogHeader>
          <PropertySummary property={property} />
          {canAct ? (
            <div className="p-5 [&>form]:mt-0">
              <ContactOwnerForm propertyId={property.id} propertyTitle={property.title} currentUserId={currentUserId} messages={messages} />
            </div>
          ) : (
            <div className="p-5">
              <LoginRequired propertyId={property.id} owner={currentUserId === ownerId} action="message the owner" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PropertySummary({property}: {property: Props["property"]}) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b p-5">
      <div className="min-h-24 rounded-xl bg-slate-100 bg-cover bg-center" style={property.imageUrl ? {backgroundImage: `url(${JSON.stringify(property.imageUrl)})`} : undefined} role="img" aria-label={`${property.title} cover`} />
      <div className="min-w-0 self-center">
        <h2 className="truncate text-xl font-semibold text-slate-950">{property.title}</h2>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {property.nightlyPrice && (
            <span>
              <strong>PKR {Number(property.nightlyPrice).toLocaleString("en-PK")}</strong> / night
            </span>
          )}
          {property.monthlyPrice && (
            <span>
              <strong>PKR {Number(property.monthlyPrice).toLocaleString("en-PK")}</strong> / month
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginRequired({propertyId, owner, action}: {propertyId: string; owner: boolean; action: string}) {
  return owner ? (
    <p className="rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-600">This is your property listing.</p>
  ) : (
    <div className="space-y-4 text-center">
      <p className="text-sm text-slate-600">You need to log in or create an account to {action}.</p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" asChild>
          <Link href={`/register?next=${encodeURIComponent(`/properties/${propertyId}`)}`}>Create account</Link>
        </Button>
        <Button asChild>
          <Link href={`/login?next=${encodeURIComponent(`/properties/${propertyId}`)}`}>
            <LogIn /> Log in
          </Link>
        </Button>
      </div>
    </div>
  );
}
