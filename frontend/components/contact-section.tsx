import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import type { Profile } from "@/lib/types";

export function ContactSection({ profile }: { profile: Profile | null }) {
  const email = profile?.email || "hello@example.com";
  const linkedin = profile?.linkedin_url;

  return (
    <Section id="contact" eyebrow="Get in Touch" title="Contact" subtitle="Let's build something scalable.">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card>
          <ContactForm />
        </Card>

        <Card className="bg-gradient-to-br from-brand-500/10 to-accent-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Email</p>
          <a className="mt-2 block break-all text-base font-semibold text-white hover:text-brand-300" href={`mailto:${email}`}>
            {email}
          </a>

          {linkedin ? (
            <>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">LinkedIn</p>
              <a
                className="mt-2 block break-all text-base font-semibold text-white hover:text-brand-300"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkedin.replace(/^https?:\/\//, "")}
              </a>
            </>
          ) : null}
        </Card>
      </div>
    </Section>
  );
}
