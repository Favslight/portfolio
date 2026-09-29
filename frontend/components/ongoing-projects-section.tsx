import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import type { OngoingProject } from "@/lib/types";

export function OngoingProjectsSection({ projects }: { projects: OngoingProject[] }) {
  if (projects.length === 0) {
    return (
      <Section id="ongoing" eyebrow="In Progress" title="Ongoing Projects" subtitle="Things I'm actively building right now.">
        <p className="text-sm text-slate-400">Nothing in progress right now — check back soon.</p>
      </Section>
    );
  }

  return (
    <Section id="ongoing" eyebrow="In Progress" title="Ongoing Projects" subtitle="Things I'm actively building right now.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} hover>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <span className="shrink-0 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-400">
                {project.status}
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">{project.description}</p>
            {project.stack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </Section>
  );
}
