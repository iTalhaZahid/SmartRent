import Link from "next/link";
import {redirect} from "next/navigation";
import {blockPropertyDatesAction, removePropertyAction, replyToViewerAction, respondToBookingAction, setPropertyAvailabilityAction, unblockPropertyDatesAction} from "@/queries/properties/owner-actions";
import {ConfirmSubmitButton} from "@/components/properties/confirm-submit-button";
import {StatusBadge} from "@/components/shared/status-badge";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {createClient} from "@/lib/supabase/server";
import {queryOwnerDashboard, queryOwnerProfile, queryViewerNames} from "@/queries/properties/owner";
import {getPropertyImageUrl} from "@/queries/properties/images";
import {getDemoPropertyCover} from "@/utils/properties/constants";
import {formatAvailabilityWindow, formatDate} from "@/utils/properties/format";

export default async function Page() {
  const supabase = await createClient();
  const {data: claims} = await supabase.auth.getClaims();
  const ownerId = claims?.claims?.sub;
  if (!ownerId) redirect("/login?next=/owner/properties");

  const {data: profile} = await queryOwnerProfile(supabase, ownerId);
  if (!profile || profile.role !== "OWNER" || profile.status !== "ACTIVE") redirect("/properties");

  const [{data: properties}, {data: messages}, {data: bookings}] = await queryOwnerDashboard(supabase, ownerId);
  const viewerIds = [...new Set([...(messages ?? []).map((message) => (message.sender_id === ownerId ? message.receiver_id : message.sender_id)), ...(bookings ?? []).map((booking) => booking.renter_id)])];
  const {data: viewers} = viewerIds.length ? await queryViewerNames(supabase, viewerIds) : {data: []};
  const viewerNames = new Map((viewers ?? []).map((viewer) => [viewer.id, viewer.full_name]));

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between gap-4">
          <div>
            <p className="font-semibold text-teal-700">OWNER WORKSPACE</p>
            <h1 className="mt-2 text-3xl font-bold">Your properties</h1>
            <p className="mt-2 text-slate-600">Edit listings, manage availability, and review property-linked inquiries.</p>
          </div>
          <Button asChild>
            <Link href="/properties/new">List property</Link>
          </Button>
        </div>
        <div className="mt-8 space-y-5">
          {properties?.map((property) => {
            const inquiries = messages?.filter((message) => message.property_id === property.id) ?? [];
            const bookingRequests = bookings?.filter((booking) => booking.property_id === property.id) ?? [];
            const pendingBookings = bookingRequests.filter((booking) => booking.status === "PENDING");
            const conversations = [
              ...inquiries.reduce((groups, message) => {
                const viewerId = message.sender_id === ownerId ? message.receiver_id : message.sender_id;
                const thread = groups.get(viewerId) ?? [];
                thread.push(message);
                groups.set(viewerId, thread);
                return groups;
              }, new Map<string, typeof inquiries>()),
            ];
            const ranges = [...property.availability].sort((a, b) => a.start_date.localeCompare(b.start_date));
            const temporaryBookings = ranges.filter((range) => range.status === "BOOKED");
            const displayStatus = !property.is_available ? "RENTED" : property.status === "ACTIVE" ? (temporaryBookings.length ? "TEMPORARY_BOOKED" : "AVAILABLE") : property.status;
            const cover = [...property.property_images].sort((a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order)[0];
            const imageUrl = getDemoPropertyCover(property.id) ?? (cover ? getPropertyImageUrl(supabase, cover.storage_path) : null);
            return (
              <article key={property.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
                  <div
                    className="relative min-h-48 bg-linear-to-br from-teal-50 to-slate-200 bg-cover bg-center md:min-h-full"
                    style={
                      imageUrl
                        ? {
                            backgroundImage: `url(${JSON.stringify(imageUrl)})`,
                          }
                        : undefined
                    }
                    role="img"
                    aria-label={`${property.title} cover photo`}
                  >
                    {!property.is_available && (
                      <>
                        <div className="absolute inset-0 bg-slate-950/35" aria-hidden="true" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-md border-4 border-white px-5 py-2 text-xl font-black tracking-[0.2em] text-white shadow-lg">RENTED</span>
                      </>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge status={displayStatus} />
                        </div>
                        <h2 className="mt-3 truncate text-xl font-semibold">{property.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">
                          {property.city} · PKR {Number(property.monthly_price ?? property.short_term_price).toLocaleString("en-PK")}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">Available: {formatAvailabilityWindow(property.available_from, property.available_to)}</p>
                        {temporaryBookings.slice(0, 2).map((range) => (
                          <p key={range.id} className="mt-1 text-sm font-medium text-amber-700">
                            Temporary booking: {formatDate(range.start_date)} – {formatDate(range.end_date)}
                          </p>
                        ))}
                        {temporaryBookings.length > 2 && <p className="mt-1 text-xs text-slate-500">+{temporaryBookings.length - 2} more temporary bookings</p>}
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                      <Button variant="outline" asChild>
                        <Link href={`/owner/properties/${property.id}/edit`}>Edit</Link>
                      </Button>
                      <form action={setPropertyAvailabilityAction}>
                        <input type="hidden" name="propertyId" value={property.id} />
                        <input type="hidden" name="isAvailable" value={String(!property.is_available)} />
                        <ConfirmSubmitButton title={`Mark as ${property.is_available ? "rented" : "available"}?`} message={`“${property.title}” will be marked ${property.is_available ? "rented and hidden from the public listings" : "available and shown in the public listings"}.`}>
                          Mark {property.is_available ? "rented" : "available"}
                        </ConfirmSubmitButton>
                      </form>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Booking requests ({pendingBookings.length})</Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Booking requests</DialogTitle>
                            <DialogDescription>Accept or reject viewer offers for {property.title}.</DialogDescription>
                          </DialogHeader>
                          {bookingRequests.length ? (
                            <div className="space-y-3">
                              {bookingRequests.map((booking) => (
                                <div key={booking.id} className="rounded-xl border bg-slate-50 p-4">
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <p className="font-semibold">{viewerNames.get(booking.renter_id) || "Viewer"}</p>
                                      <p className="mt-1 text-sm text-slate-600">
                                        {booking.rental_mode === "LONG_TERM" ? "Long-term rent" : "Temporary stay"} · {booking.occupants} {booking.occupants === 1 ? "occupant" : "occupants"}
                                      </p>
                                      <p className="text-sm text-slate-600">
                                        {formatDate(booking.start_date)} – {formatDate(booking.end_date)} · PKR {Number(booking.estimated_cost).toLocaleString("en-PK")}
                                      </p>
                                    </div>
                                    <StatusBadge status={booking.status} />
                                  </div>
                                  {booking.status === "PENDING" && (
                                    <div className="mt-3 flex gap-2">
                                      <form action={respondToBookingAction}>
                                        <input type="hidden" name="bookingId" value={booking.id} />
                                        <input type="hidden" name="propertyId" value={property.id} />
                                        <input type="hidden" name="decision" value="APPROVED" />
                                        <ConfirmSubmitButton title="Accept booking request?" message={booking.rental_mode === "LONG_TERM" ? "Accepting will mark this property as rented and hide it from public listings." : "Accepting will temporarily book these dates while keeping the property listed."}>
                                          Accept
                                        </ConfirmSubmitButton>
                                      </form>
                                      <form action={respondToBookingAction}>
                                        <input type="hidden" name="bookingId" value={booking.id} />
                                        <input type="hidden" name="propertyId" value={property.id} />
                                        <input type="hidden" name="decision" value="REJECTED" />
                                        <ConfirmSubmitButton title="Reject booking request?" message="The viewer will be notified that this booking request was rejected." variant="destructive">
                                          Reject
                                        </ConfirmSubmitButton>
                                      </form>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">No booking requests yet.</p>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Booking dates ({ranges.length})</Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Booking dates</DialogTitle>
                            <DialogDescription>Review booked dates and temporarily book additional dates for {property.title}.</DialogDescription>
                          </DialogHeader>
                          {ranges.length ? (
                            <div className="space-y-2">
                              {ranges.map((range) => (
                                <div key={range.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 text-sm">
                                  <span>
                                    <strong>{range.status === "BLOCKED" ? "Temporary booking" : range.status === "RESERVED" ? "Pending request" : "Booked"}</strong> · {formatDate(range.start_date)} – {formatDate(range.end_date)}
                                  </span>
                                  {range.status === "BLOCKED" && (
                                    <form action={unblockPropertyDatesAction}>
                                      <input type="hidden" name="propertyId" value={property.id} />
                                      <input type="hidden" name="availabilityId" value={range.id} />
                                      <Button size="sm" variant="ghost">
                                        Remove booking
                                      </Button>
                                    </form>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">No booked dates.</p>
                          )}
                          <form action={blockPropertyDatesAction} className="grid gap-3 rounded-xl border p-4 sm:grid-cols-2">
                            <input type="hidden" name="propertyId" value={property.id} />
                            <div>
                              <Label htmlFor={`start-${property.id}`}>Book from</Label>
                              <Input id={`start-${property.id}`} name="startDate" type="date" required />
                            </div>
                            <div>
                              <Label htmlFor={`end-${property.id}`}>Book until</Label>
                              <Input id={`end-${property.id}`} name="endDate" type="date" required />
                            </div>
                            <Input name="reason" placeholder="Reason (optional)" className="sm:col-span-2" />
                            <Button className="sm:col-span-2">Book dates</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Queries ({conversations.length})</Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Property conversations</DialogTitle>
                            <DialogDescription>Viewer chats about {property.title}, grouped by person.</DialogDescription>
                          </DialogHeader>
                          {conversations.length ? (
                            <div className="space-y-5">
                              {conversations.map(([viewerId, thread]) => (
                                <section key={viewerId} className="rounded-xl border bg-slate-50 p-4">
                                  <div className="mb-3 flex items-center gap-3">
                                    <span className="grid size-9 place-items-center rounded-full bg-teal-700 text-sm font-bold text-white">{(viewerNames.get(viewerId) || "V").slice(0, 1).toUpperCase()}</span>
                                    <div>
                                      <h3 className="text-sm font-semibold text-slate-900">{viewerNames.get(viewerId) || "Viewer"}</h3>
                                      <p className="text-xs text-slate-500">
                                        {thread.length} {thread.length === 1 ? "message" : "messages"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="max-h-72 space-y-2 overflow-y-auto">
                                    {thread.map((message) => (
                                      <div key={message.id} className={`flex ${message.sender_id === ownerId ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm ${message.sender_id === ownerId ? "rounded-br-sm bg-teal-700 text-white" : "rounded-bl-sm border bg-white text-slate-700"}`}>
                                          <p className="whitespace-pre-wrap wrap-break-word">{message.content}</p>
                                          <p className={`mt-1 text-[10px] ${message.sender_id === ownerId ? "text-teal-100" : "text-slate-400"}`}>
                                            {new Date(message.created_at).toLocaleString("en-PK")}
                                            {!message.is_read && message.receiver_id === ownerId ? " · New" : ""}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <form action={replyToViewerAction} className="mt-3 flex gap-2">
                                    <input type="hidden" name="propertyId" value={property.id} />
                                    <input type="hidden" name="viewerId" value={viewerId} />
                                    <Textarea name="message" required maxLength={1000} rows={2} placeholder="Reply to viewer..." className="min-h-10 resize-none bg-white" />
                                    <Button type="submit" className="self-end">
                                      Reply
                                    </Button>
                                  </form>
                                </section>
                              ))}
                            </div>
                          ) : (
                            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">No queries for this property.</p>
                          )}
                        </DialogContent>
                      </Dialog>
                      <form action={removePropertyAction}>
                        <input type="hidden" name="propertyId" value={property.id} />
                        <ConfirmSubmitButton title="Remove listing?" message={`“${property.title}” will be hidden from renters and removed from your active dashboard.`} variant="destructive">
                          Remove listing
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
