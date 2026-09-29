import Link from "next/link";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected products and platforms spanning full stack delivery and backend architecture ownership."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const content = (
            <Card hover className="h-full">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.role === "Full Stack" ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {project.role}
                </span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-600">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-700">
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs font-medium text-slate-500">
                {project.isPrivate ? "Private Project" : "View live project"}
              </p>
            </Card>
          );

          if (project.isPrivate || !project.link) {
            return <div key={project.name}>{content}</div>;
          }

          return (
            <Link key={project.name} href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
              {content}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
