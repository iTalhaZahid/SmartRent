import { Benefits } from "@/components/marketing/benefits";
import { CallToAction } from "@/components/marketing/call-to-action";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustBar } from "@/components/marketing/trust-bar";

export default function Home() {
  return (
    <main className="overflow-hidden">
        <Hero />
        <TrustBar />
        <Benefits />
        <HowItWorks />
        <CallToAction />
    </main>
  );
}
