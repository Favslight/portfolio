import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { PieChart } from "@/components/ui/pie-chart";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <Section id="projects" eyebrow="My Work" title="Recent Projects">
        <p className="text-sm text-slate-400">Projects coming soon.</p>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      eyebrow="My Work"
      title="Recent Projects"
      subtitle="Selected products and platforms spanning full stack delivery and backend architecture ownership."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} hover className="flex h-full flex-col">
            <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-ink-800">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={`${project.name} screenshot`}
                  width={480}
                  height={300}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center text-xs uppercase tracking-wide text-slate-500">
                  No preview yet
                </div>
              )}
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  project.role === "Full Stack" ? "bg-brand-500/15 text-brand-300" : "bg-white/10 text-slate-300"
                }`}
              >
                {project.role}
              </span>
            </div>

            <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>

            <div className="mb-4 border-t border-white/10 pt-4">
              <PieChart backendPercent={project.backend_percent} frontendPercent={project.frontend_percent} />
            </div>

            {project.is_private || !project.link ? (
              <p className="text-xs font-medium text-slate-500">Private Project</p>
            ) : (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-300 hover:text-brand-200"
              >
                View live project →
              </Link>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
