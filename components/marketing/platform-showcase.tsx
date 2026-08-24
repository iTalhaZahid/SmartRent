import Link from "next/link";
import {ArrowRight, Bell, Building2, CalendarCheck, Check, Clock3, Eye, Filter, Home, ImageIcon, MessageCircle, Pencil, Search, ShieldCheck, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {SectionHeading} from "@/components/marketing/section-heading";
import {MARKETING_PROPERTY_IMAGES} from "@/utils/properties/constants";

const renterFeatures = [
  {
    icon: Search,
    title: "Find the right fit",
    text: "Search by city, property type, bedrooms, rental mode, maximum price, and available dates.",
  },
  {
    icon: CalendarCheck,
    title: "Request the dates you need",
    text: "Choose a temporary stay or long-term rental, select dates and occupants, then send the owner a booking request.",
  },
  {
    icon: MessageCircle,
    title: "Talk in context",
    text: "Every conversation stays connected to its property, so prices, photos, and replies are always easy to understand.",
  },
];

const ownerFeatures = [
  {
    icon: ImageIcon,
    title: "Publish complete listings",
    text: "Add property details, dual-mode pricing, availability windows, and a swipeable photo gallery.",
  },
  {
    icon: Pencil,
    title: "Manage every listing",
    text: "Edit details, book dates, mark homes available or rented, and softly remove listings without losing records.",
  },
  {
    icon: Bell,
    title: "Act on what matters",
    text: "Review booking offers, reply to grouped conversations, and see the latest unread activity from one dashboard.",
  },
];

export function PlatformShowcase() {
  return (
    <>
      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Everything connected" title="One rental journey, from search to approval" description="SmartRent brings listings, availability, booking requests, owner decisions, and property conversations into one clear workflow." />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <RolePanel eyebrow="For renters" title="Discover, ask, and book with confidence" features={renterFeatures} href="/properties" action="Browse available homes" image={MARKETING_PROPERTY_IMAGES.livingRoom} />
            <RolePanel eyebrow="For owners" title="Run your properties without the clutter" features={ownerFeatures} href="/register?role=OWNER" action="Start listing properties" image={MARKETING_PROPERTY_IMAGES.bedroom} reverse />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Built around availability</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Know what is available before you ask</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Public results only show available listings. Temporary bookings remain visible with their booked dates, while rented properties leave the marketplace but remain in the owner&apos;s dashboard.</p>
            <div className="mt-8 space-y-4">
              <FeatureLine icon={Filter} title="Useful filters" text="Maximum price, property type, rental mode, bedrooms, city, and availability dates." />
              <FeatureLine icon={Clock3} title="Clear date states" text="Available windows, pending requests, temporary bookings, and rented status stay distinct." />
              <FeatureLine icon={ShieldCheck} title="Owner-controlled approval" text="A request never rents a property automatically—the owner must accept it." />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Live availability</p>
                <h3 className="mt-1 text-xl font-semibold">Margalla View Apartment</h3>
              </div>
              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">AVAILABLE</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <StatusCard status="PENDING" label="Request received" text="Owner reviews the renter's dates and offer." />
              <StatusCard status="APPROVED" label="Dates accepted" text="Short stays become temporarily booked." />
              <StatusCard status="RENTED" label="Long-term accepted" text="The home leaves public search results." />
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Booked dates</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">12 Sep – 18 Sep · Temporary booked</span>
                <span className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">22 Sep – 24 Sep · Owner booked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-24 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-7">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <div
                className="size-20 rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${JSON.stringify(MARKETING_PROPERTY_IMAGES.balcony)})`,
                }}
              />
              <div>
                <p className="font-semibold">Margalla View Apartment</p>
                <p className="mt-1 text-sm text-slate-400">PKR 12,500 / night · Islamabad</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <Chat side="left" text="Is the apartment available from 12 to 18 September?" />
              <Chat side="right" text="Yes, those dates are available. You can send a booking request." />
              <Chat side="left" text="Great, I have submitted it for two occupants." />
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-400">
              <MessageCircle className="size-4" /> Write a reply…
              <span className="ml-auto rounded-lg bg-teal-600 px-3 py-1.5 font-semibold text-white">Send</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Property-linked communication</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Every question keeps its context</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">Messages are grouped by viewer and property. Notifications show the property, latest message, received time, read state, and direct actions to view or reply.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DarkFeature icon={Bell} title="Focused notifications" text="Only the latest message from each property conversation is shown." />
              <DarkFeature icon={MessageCircle} title="Fast replies" text="Optimistic chat adds sent messages immediately while delivery completes in the background." />
              <DarkFeature icon={Eye} title="Direct actions" text="Open the listing, reply in the full conversation modal, or mark activity as read." />
              <DarkFeature icon={Users} title="Grouped conversations" text="Owners can understand who is asking about which property at a glance." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Designed for trust" title="The right access for every role" description="Guests can explore, registered renters can contact and book, and owners receive a dedicated management workspace." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <AccessCard icon={Eye} title="Guest" items={["Browse available properties", "Open full listing details", "View photos, prices, and booked dates"]} />
            <AccessCard icon={Users} title="Registered renter" items={["Message property owners", "Request temporary or long-term bookings", "Follow replies and booking updates"]} featured />
            <AccessCard icon={Building2} title="Property owner" items={["Create and edit listings", "Accept or reject booking offers", "Manage status, dates, and conversations"]} />
          </div>
        </div>
      </section>
    </>
  );
}

function RolePanel({eyebrow, title, features, href, action, image, reverse = false}: {eyebrow: string; title: string; features: typeof renterFeatures; href: string; action: string; image: string; reverse?: boolean}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      <div
        className={`h-56 bg-cover bg-center ${reverse ? "bg-bottom" : ""}`}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(15,23,42,.45), transparent 65%), url(${JSON.stringify(image)})`,
        }}
      />
      <div className="p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">{eyebrow}</p>
        <h3 className="mt-3 text-2xl font-bold text-slate-950">{title}</h3>
        <div className="mt-6 space-y-5">
          {features.map(({icon: Icon, title: itemTitle, text}) => (
            <div key={itemTitle} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-100 text-teal-800">
                <Icon className="size-5" />
              </span>
              <div>
                <h4 className="font-semibold text-slate-900">{itemTitle}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-8 w-full sm:w-auto" variant={reverse ? "outline" : "default"} asChild>
          <Link href={href}>
            {action} <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
function FeatureLine({icon: Icon, title, text}: {icon: typeof Home; title: string; text: string}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}
function StatusCard({status, label, text}: {status: string; label: string; text: string}) {
  const style = status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-100" : status === "APPROVED" ? "bg-green-50 text-green-700 border-green-100" : "bg-blue-50 text-blue-700 border-blue-100";
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${style}`}>{status}</span>
      <h4 className="mt-3 font-semibold text-slate-900">{label}</h4>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
function Chat({side, text}: {side: "left" | "right"; text: string}) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${side === "right" ? "rounded-br-sm bg-teal-600 text-white" : "rounded-bl-sm bg-white text-slate-800"}`}>{text}</div>
    </div>
  );
}
function DarkFeature({icon: Icon, title, text}: {icon: typeof Home; title: string; text: string}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <Icon className="size-5 text-teal-300" />
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
function AccessCard({icon: Icon, title, items, featured = false}: {icon: typeof Home; title: string; items: string[]; featured?: boolean}) {
  return (
    <article className={`rounded-2xl border p-6 ${featured ? "border-teal-200 bg-teal-50 shadow-lg shadow-teal-900/5" : "border-slate-200 bg-white"}`}>
      <span className={`grid size-12 place-items-center rounded-2xl ${featured ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700"}`}>
        <Icon />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
            <Check className="mt-1 size-4 shrink-0 text-teal-700" /> {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
