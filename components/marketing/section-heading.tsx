import {Badge} from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  inverse?: boolean;
};

export function SectionHeading({eyebrow, title, description, inverse = false}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge variant="secondary" className={inverse ? "mb-4 border border-teal-400/30 bg-teal-400/15 text-teal-200" : "mb-4 bg-teal-50 text-teal-800"}>
        {eyebrow}
      </Badge>
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${inverse ? "text-white" : "text-slate-950"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-8 ${inverse ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}
