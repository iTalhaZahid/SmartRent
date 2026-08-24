import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = { eyebrow: string; title: string; description: string };

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge variant="secondary" className="mb-4 bg-teal-50 text-teal-800">{eyebrow}</Badge>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}
