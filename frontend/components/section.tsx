import { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow = "Section", title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("animate-fade-up py-10 sm:py-14", className)}>
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{eyebrow}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm text-slate-400 sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
