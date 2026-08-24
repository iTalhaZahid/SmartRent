import { CheckCircle2, Home, KeyRound, ShieldCheck } from "lucide-react";

type AuthShellProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

const assurances = [
  { icon: ShieldCheck, label: "Verified listings" },
  { icon: KeyRound, label: "Secure bookings" },
  { icon: CheckCircle2, label: "Simple rental management" },
];

export function AuthShell({ children, eyebrow, title, description }: AuthShellProps) {
  return (
    <main className="w-full max-w-full flex-1 overflow-x-hidden bg-white lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(520px,0.92fr)]">
      <section className="relative hidden min-h-[760px] overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col xl:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(15,118,110,0.2),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 my-auto max-w-xl py-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">A better way to rent</p>
          <h2 className="max-w-lg text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
            Your next place should feel like home.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 xl:text-lg">
            Discover trusted homes, connect directly, and manage every step of your rental in one clear space.
          </p>

          <div className="relative mt-12 h-64 max-w-[540px]" aria-hidden="true">
            <div className="absolute bottom-0 left-4 h-40 w-56 rounded-t-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-sm" />
            <div className="absolute bottom-0 left-48 h-56 w-72 rounded-t-[2.5rem] border border-white/10 bg-white/[0.09] backdrop-blur-sm" />
            <div className="absolute bottom-7 left-60 grid size-20 place-items-center rounded-2xl bg-teal-500 text-slate-950 shadow-2xl shadow-teal-950/50">
              <Home className="size-10" strokeWidth={1.7} />
            </div>
            <div className="absolute bottom-24 left-12 grid grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((window) => <span key={window} className="size-5 rounded-md bg-teal-300/50" />)}
            </div>
            <div className="absolute bottom-20 right-10 grid grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((window) => <span key={window} className="size-5 rounded-md bg-slate-400/30" />)}
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
            {assurances.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2"><Icon className="size-4 text-teal-400" />{label}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[680px] min-w-0 w-full flex-col bg-slate-50/70">
        <div className="flex min-w-0 flex-1 items-start justify-center px-5 py-12 sm:px-8 lg:items-center lg:px-12 lg:py-16">
          <div className="w-full min-w-0 max-w-[440px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-[2rem]">{title}</h1>
            <p className="mt-3 leading-6 text-slate-600">{description}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
