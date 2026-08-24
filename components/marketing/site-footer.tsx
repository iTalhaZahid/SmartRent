import { BrandMark } from "@/components/marketing/brand-mark";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <BrandMark />
        <p className="text-sm text-slate-500">Copyright {new Date().getFullYear()} SmartRent. A simpler way to rent.</p>
        <div className="flex gap-5 text-sm text-slate-500">
          <a href="#how-it-works" className="hover:text-primary">How it works</a>
          <Link href="/login" className="hover:text-primary">Sign in</Link>
          <Link href="/register" className="hover:text-primary">Join</Link>
        </div>
      </div>
    </footer>
  );
}
