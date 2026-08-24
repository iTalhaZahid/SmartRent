const stats = [
  { value: "Short stays", label: "Flexible daily rentals" },
  { value: "Long term", label: "Homes built for living" },
  { value: "Direct", label: "Renter-owner messaging" },
  { value: "Secure", label: "Protected account access" },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white" aria-label="SmartRent in numbers">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-7 sm:px-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`px-4 py-3 text-center ${index % 2 ? "border-l border-slate-200" : ""} ${index > 1 ? "border-t border-slate-200 lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}>
            <p className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
