import { CalendarCheck, Home, Search } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";

const steps = [
  { icon: Search, number: "01", title: "Discover", text: "Search verified homes that match your budget, location, and lifestyle." },
  { icon: CalendarCheck, number: "02", title: "Visit & decide", text: "Schedule a viewing, ask questions, and compare your favourites." },
  { icon: Home, number: "03", title: "Move in", text: "Complete your booking securely and manage everything in one place." },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-950 px-5 py-24 text-white sm:px-8" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="How it works" title="Your next home in three simple steps" description="No confusing paperwork or endless back-and-forth—just a clear path home." />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, text }) => (
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
