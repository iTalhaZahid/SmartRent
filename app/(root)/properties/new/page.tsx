import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ArrowLeft, CheckCircle2, Clock3, ShieldCheck} from "lucide-react";

import {PropertyForm} from "@/components/properties/property-form";
import {Button} from "@/components/ui/button";
import {createClient} from "@/lib/supabase/server";
import {queryOwnerProfile} from "@/queries/properties/owner";

export const metadata: Metadata = {
  title: "List your property",
  description: "Create a new rental property listing on SmartRent.",
};

export default async function NewPropertyPage({searchParams}: PageProps<"/properties/new">) {
  const supabase = await createClient();
  const {data: claimsData} = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login?next=/properties/new");

  const {data: profile} = await queryOwnerProfile(supabase, userId);
  if (!profile || profile.status !== "ACTIVE" || profile.role !== "OWNER") {
    return (
      <main className="grid flex-1 place-items-center px-4 py-16">
        <section className="max-w-lg rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto size-10 text-amber-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-950">Owner account required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Only active, registered property-owner accounts can create listings.</p>
          <Button className="mt-6" asChild>
            <Link href="/properties">Browse properties</Link>
          </Button>
        </section>
      </main>
    );
  }

  const params = await searchParams;
  const submitted = params.submitted === "1";

  return (
    <main className="relative flex-1 overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.13),transparent_48%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.06),transparent_42%)]" />
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700">
          <ArrowLeft className="size-4" /> Back to home
        </Link>

        {submitted ? (
          <section className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-7" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-slate-950">Property submitted</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Your listing is now pending review. We’ll notify you when it is approved and ready for renters.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/properties/new">List another property</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return home</Link>
              </Button>
            </div>
          </section>
        ) : (
          <>
            <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">For property owners</p>
                <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">List your property</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Share the essentials now. Your property will be reviewed before it appears in search.</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4 text-teal-700" /> About 5 minutes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-teal-700" /> Secure submission
                </span>
              </div>
            </div>
            <PropertyForm />
          </>
        )}
      </div>
    </main>
  );
}
