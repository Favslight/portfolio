import Image from "next/image";
import type { Technology } from "@/lib/types";

export function LogoStrip({ technologies }: { technologies: Technology[] }) {
  if (technologies.length === 0) return null;

  const items = [...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-800/60 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-12">
        {items.map((tech, index) => (
          <div key={`${tech.id}-${index}`} className="flex items-center gap-2 opacity-70 grayscale transition-opacity hover:opacity-100">
            {tech.logo_url ? (
              <Image src={tech.logo_url} alt={tech.name} width={24} height={24} className="h-6 w-6 object-contain" />
            ) : null}
            <span className="text-sm font-semibold text-slate-300">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
