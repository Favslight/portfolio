import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export function SystemThinkingSection() {
  return (
    <Section
      id="thinking"
      title="AI & System Thinking"
      subtitle="How I think as an engineer when designing platforms for scale, resilience, and intelligent automation."
    >
      <Card className="overflow-hidden">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Scalable Backend Systems</h3>
            <p className="mt-2 text-sm text-slate-600">
              Design modular services with clear boundaries, robust API contracts, and observability-first thinking.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Real-Time & IoT</h3>
            <p className="mt-2 text-sm text-slate-600">
              Build event-driven communication patterns using MQTT for low-latency, device-aware integrations.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Payment & Wallet Architecture</h3>
            <p className="mt-2 text-sm text-slate-600">
              Implement secure transaction flows, balance management logic, and audit-friendly ledger patterns.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">AI-Powered Platforms</h3>
            <p className="mt-2 text-sm text-slate-600">
              Interested in intelligent systems that combine backend automation, analytics, and adaptive user
              experiences.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
