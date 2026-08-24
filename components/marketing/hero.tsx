import { ArrowRight, CheckCircle2, KeyRound, MapPin, Search } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" id="browse">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(20,184,166,0.14),transparent_32%),radial-gradient(circle_at_10%_70%,rgba(14,116,144,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <div>
          <Badge variant="secondary" className="mb-6 gap-2 border border-teal-100 bg-teal-50 px-3 py-1.5 text-teal-800">
            <CheckCircle2 className="size-3.5" /> Verified homes. Clear terms.
          </Badge>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            Renting made <span className="text-primary">simple.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            Find a place you&apos;ll love, book with confidence, and manage your entire rental journey from one calm, secure space.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-xl px-6 text-base" asChild>
              <Link href="/register?role=RENTER">Find your next home <ArrowRight /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl bg-white px-6 text-base" asChild>
              <Link href="/register?role=OWNER"><KeyRound /> List your property</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> No hidden fees</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Secure booking</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> 24/7 support</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 -z-10 rounded-full bg-teal-200/30 blur-3xl" />
          <Card className="overflow-hidden rounded-[2rem] border-white/80 bg-white/90 p-3 shadow-[0_28px_80px_-24px_rgba(15,23,42,0.3)] backdrop-blur">
            <div className="relative h-72 overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-slate-800 via-teal-900 to-teal-700 p-6 sm:h-80">
              <div className="absolute -right-10 -top-14 size-52 rounded-full border-[32px] border-white/10" />
              <div className="absolute bottom-0 left-[12%] h-[68%] w-[30%] rounded-t-[4rem] bg-amber-50/95 shadow-2xl" />
              <div className="absolute bottom-0 left-[48%] h-[84%] w-[39%] rounded-t-[5rem] bg-white shadow-2xl" />
              <div className="absolute bottom-[18%] left-[21%] size-9 rounded-full bg-teal-700/80" />
              <div className="absolute bottom-[21%] left-[59%] h-16 w-20 rounded-t-full bg-slate-900/80" />
              <Badge className="relative z-10 bg-white text-slate-900 shadow-sm hover:bg-white">Featured home</Badge>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-950">Modern city apartment</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="size-4" /> Gulberg, Lahore</p>
                </div>
                <p className="text-right font-bold text-slate-950">PKR 85k<span className="block text-xs font-normal text-slate-500">per month</span></p>
              </div>
            </div>
          </Card>
          <Card className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border-white bg-white p-4 shadow-xl sm:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-primary"><Search className="size-5" /></span>
            <div><p className="text-sm font-semibold">Short or long term</p><p className="text-xs text-slate-500">One simple place to search</p></div>
          </Card>
        </div>
      </div>
    </section>
  );
}
