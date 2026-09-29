import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export function ContactSection() {
  return (
    <Section id="contact" title="Contact" subtitle="Let's build something scalable.">
      <Card className="bg-gradient-to-br from-white to-brand-50">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Email</p>
            <a className="mt-2 block text-base font-semibold text-slate-900 hover:text-brand-600" href="mailto:samuelebiloma208@gmail.com">
              samuelebiloma208@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">LinkedIn</p>
            <a
              className="mt-2 block text-base font-semibold text-slate-900 hover:text-brand-600"
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/samuel-light-ebiloma-9702a41b4
            </a>
          </div>
        </div>
      </Card>
    </Section>
  );
}

