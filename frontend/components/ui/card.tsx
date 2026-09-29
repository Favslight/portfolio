import { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-white/10 bg-ink-700/60 p-5 shadow-soft backdrop-blur-sm transition-all duration-300",
        hover && "hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-glow",
        className
      )}
    >
      {children}
    </article>
  );
}
