"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, Home, LogIn, Menu, Search, ShieldCheck, UserPlus } from "lucide-react";

import { BrandMark } from "@/components/marketing/brand-mark";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { label: "Browse homes", href: "/#browse", icon: Search },
  { label: "How it works", href: "/#how-it-works", icon: ShieldCheck },
  { label: "For owners", href: "/#landlords", icon: Building2 },
];

export function SiteHeader() {
  return (
    <header id="top" className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className=" mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.35rem] px-3 sm:px-4 lg:px-5">
        <BrandMark />

        <NavigationMenu className=" liquid-glass hidden md:flex" aria-label="Primary navigation">
          <NavigationMenuList className="liquid-glass-control rounded-xl p-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-9 rounded-lg bg-transparent px-4 text-slate-600 hover:bg-white/55 hover:text-primary hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-8px_rgba(15,118,110,0.6)] focus:bg-white/65 focus:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="ghost" className="liquid-glass-control rounded-xl text-slate-700 hover:bg-white/65" asChild>
            <Link href="/login"><LogIn aria-hidden="true" /> Sign in</Link>
          </Button>
          <Button className="liquid-glass-primary rounded-xl px-5 hover:brightness-95" asChild>
            <Link href="/register">Get started <ArrowUpRight aria-hidden="true" /></Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="liquid-glass-control rounded-xl hover:bg-white/70 sm:hidden" aria-label="Open navigation menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88%] border-l border-white/80 bg-white/80 p-0 shadow-2xl backdrop-blur-3xl sm:max-w-sm">
            <SheetHeader className="border-b border-white/80 bg-white/30 px-6 py-6 text-left">
              <SheetTitle className="sr-only">SmartRent navigation</SheetTitle>
              <SheetDescription className="sr-only">Browse SmartRent pages and account options.</SheetDescription>
              <BrandMark />
            </SheetHeader>

            <div className="flex h-[calc(100%-89px)] flex-col px-4 py-6">
              <nav className="space-y-1" aria-label="Mobile navigation">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-primary">
                    <Home className="size-5" aria-hidden="true" /> Home
                  </Link>
                </SheetClose>
                {links.map(({ label, href, icon: Icon }) => (
                  <SheetClose asChild key={label}>
                    <Link href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-teal-50 hover:text-primary">
                      <Icon className="size-5" aria-hidden="true" /> {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-slate-200 pt-6">
                <SheetClose asChild>
                  <Button variant="outline" className="h-11 w-full rounded-xl" asChild>
                    <Link href="/login"><LogIn /> Sign in</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="h-11 w-full rounded-xl shadow-md shadow-teal-900/15" asChild>
                    <Link href="/register"><UserPlus /> Create account</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
