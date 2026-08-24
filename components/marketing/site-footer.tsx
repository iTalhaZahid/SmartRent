import {BrandMark} from "@/components/marketing/brand-mark";
import Link from "next/link";
import {ArrowUpRight, Building2, Home, Search} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-5 text-slate-300 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="inline-flex rounded-xl bg-white px-3 py-2">
            <BrandMark />
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-400">A connected rental marketplace for discovering homes, requesting bookings, messaging owners, and managing properties with confidence.</p>
          <Link href="/properties" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-200">
            Explore available properties <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <FooterGroup
          title="Explore"
          links={[
            {label: "Home", href: "/", icon: Home},
            {label: "Browse properties", href: "/properties", icon: Search},
            {label: "How it works", href: "/#how-it-works"},
          ]}
        />
        <FooterGroup
          title="For owners"
          links={[
            {
              label: "List a property",
              href: "/properties/new",
              icon: Building2,
            },
            {label: "Owner dashboard", href: "/owner/properties"},
            {label: "Create owner account", href: "/register?role=OWNER"},
          ]}
        />
        <FooterGroup
          title="Account"
          links={[
            {label: "Sign in", href: "/login"},
            {label: "Create renter account", href: "/register?role=RENTER"},
            {label: "Create owner account", href: "/register?role=OWNER"},
          ]}
        />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SmartRent. All rights reserved.</p>
        <p>Short-term and long-term rentals in one place.</p>
      </div>
    </footer>
  );
}

function FooterGroup({title, links}: {title: string; links: {label: string; href: string; icon?: typeof Home}[]}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map(({label, href, icon: Icon}) => (
          <li key={label}>
            <Link href={href} className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-300">
              {Icon && <Icon className="size-4" />}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
