import Image from "next/image";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import type { Technology } from "@/lib/types";

export function TechStackSection({ technologies }: { technologies: Technology[] }) {
  if (technologies.length === 0) {
    return (
      <Section id="stack" eyebrow="My Stack" title="Tech Stack & Frameworks">
        <p className="text-sm text-slate-400">Tech stack coming soon.</p>
      </Section>
    );
  }

  return (
    <Section
      id="stack"
      eyebrow="My Stack"
      title="Tech Stack & Frameworks"
      subtitle="Core technologies used to design, build, and scale reliable products across frontend and backend systems."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <Card key={tech.id} hover className="group">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-1 transition group-hover:border-brand-400/50">
                {tech.logo_url ? (
                  <Image src={tech.logo_url} alt={`${tech.name} logo`} width={36} height={36} className="h-9 w-9 object-contain" />
                ) : null}
              </div>
              <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{tech.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
