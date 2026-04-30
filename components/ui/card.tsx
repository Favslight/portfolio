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
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-300",
        hover && "hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {children}
    </article>
  );
}
