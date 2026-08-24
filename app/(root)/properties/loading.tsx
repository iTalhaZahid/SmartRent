import {Skeleton} from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-11 max-w-xl" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border bg-white">
            <Skeleton className="aspect-4/3 w-full" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
