import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export function DatabaseSection() {
  return (
    <Section
      id="database"
      title="Database Expertise"
      subtitle="Deep hands-on experience designing and optimizing data layers for performance, consistency, and long-term maintainability."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Card hover>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Relational</p>
          <h3 className="text-xl font-semibold text-slate-900">PostgreSQL</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Strong at schema design, indexing strategy, query optimization, and transactional workflows for
            high-integrity systems. Comfortable modeling complex business domains with predictable performance.
          </p>
          <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
            Also leverage Supabase for managed PostgreSQL workflows with integrated authentication and rapid delivery.
          </p>
        </Card>

        <Card hover>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Non-Relational</p>
          <h3 className="text-xl font-semibold text-slate-900">MongoDB</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Experienced with document-driven architectures, flexible schema evolution, and modeling rapidly changing
            product data without sacrificing developer velocity or system stability.
          </p>
        </Card>
      </div>
    </Section>
  );
}
