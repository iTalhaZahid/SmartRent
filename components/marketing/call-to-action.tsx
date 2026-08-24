import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="px-5 py-24 sm:px-8" id="landlords">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-white shadow-2xl sm:px-12">
        <div className="absolute -left-20 -top-20 size-64 rounded-full border-[40px] border-white/10" />
        <div className="absolute -bottom-28 -right-16 size-72 rounded-full border-[48px] border-white/10" />
        <div className="relative mx-auto max-w-2xl" id="get-started">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-100">Your next chapter starts here</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Ready to find a place that feels like yours?</h2>
          <p className="mt-5 text-lg leading-8 text-teal-50">Create your free account and make your next rental feel refreshingly straightforward.</p>
          <Button size="lg" variant="secondary" className="mt-8 h-12 rounded-xl bg-white px-6 text-primary hover:bg-teal-50" asChild>
            <Link href="/register?role=RENTER">Create your account <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
