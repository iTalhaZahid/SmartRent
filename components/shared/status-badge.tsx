import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  ACTIVE: "border-green-200 bg-green-50 text-green-700",
  AVAILABLE: "border-green-200 bg-green-50 text-green-700",
  APPROVED: "border-green-200 bg-green-50 text-green-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  RESERVED: "border-amber-200 bg-amber-50 text-amber-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
  SUSPENDED: "border-red-200 bg-red-50 text-red-700",
  BOOKED: "border-blue-200 bg-blue-50 text-blue-700",
  BLOCKED: "border-slate-300 bg-slate-100 text-slate-700",
  INACTIVE: "border-slate-300 bg-slate-100 text-slate-700",
  RENTED: "border-blue-200 bg-blue-50 text-blue-700",
  COMPLETED: "border-slate-300 bg-slate-100 text-slate-700",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[status], className)}
    >
      {status.replaceAll("_", " ")}
    </Badge>
  );
}
