import { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("animate-fade-up py-10 sm:py-14", className)}>
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Section</p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
