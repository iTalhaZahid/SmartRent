import {CalendarCheck, Home, Search} from "lucide-react";

import {SectionHeading} from "@/components/marketing/section-heading";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    text: "Filter available homes by city, price, type, rental mode, bedrooms, and dates.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Request",
    text: "Choose temporary or long-term rent, select dates and occupants, then send your request.",
  },
  {
    icon: Home,
    number: "03",
    title: "Get approved",
    text: "The owner accepts or rejects the offer, and SmartRent updates availability automatically.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-950 px-5 py-24 text-white sm:px-8" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <SectionHeading inverse eyebrow="How it works" title="Your next home in three simple steps" description="Search, request, and stay informed through one clear property-linked workflow." />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map(({icon: Icon, number, title, text}) => (
            <div key={number} className="relative border-l border-white/15 pl-6">
              <span className="text-sm font-bold text-teal-400">{number}</span>
              <Icon className="mt-8 size-8 text-teal-300" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
