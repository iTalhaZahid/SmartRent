import { Building2 } from "lucide-react";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="SmartRent home">
      <span className="liquid-glass-primary grid size-9 place-items-center rounded-xl text-primary-foreground">
        <Building2 className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-950">SmartRent</span>
    </Link>
  );
}
