import { Headphones, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  { icon: ShieldCheck, title: "Homes you can trust", text: "Every listing is reviewed, with clear pricing and verified property details." },
  { icon: Sparkles, title: "A smoother search", text: "Smart filters and honest information help you shortlist the right place faster." },
  { icon: Headphones, title: "Support that stays", text: "From your first viewing to move-in day, real help is always within reach." },
];

export function Benefits() {
  return (
    <section className="px-5 py-24 sm:px-8" id="homes">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Why SmartRent" title="Feel at home before you move in" description="We bring trust, clarity, and convenience to every part of your rental experience." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="group rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-teal-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon className="size-6" /></span>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent className="leading-7 text-slate-600">{text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
