import Image from "next/image";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { technologies } from "@/data/portfolio";

export function TechStackSection() {
  return (
    <Section
      id="stack"
      title="Tech Stack & Frameworks"
      subtitle="Core technologies used to design, build, and scale reliable products across frontend and backend systems."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <Card key={tech.name} hover className="group">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 transition group-hover:border-brand-200">
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{tech.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{tech.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
