import Image from "next/image";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import type { Profile } from "@/lib/types";

type AboutSectionProps = {
  profile: Profile | null;
  projectCount: number;
  technologyCount: number;
};

export function AboutSection({ profile, projectCount, technologyCount }: AboutSectionProps) {
  const image = profile?.secondary_image_url || profile?.profile_image_url || "/profile-placeholder.svg";
  const bio = profile?.bio || "";
  const title = profile?.title || "Full Stack Developer";
  const years = profile?.years_experience ?? 0;

  const stats = [
    { label: "Projects Delivered", value: `${projectCount}+` },
    { label: "Years Experience", value: `${years}+` },
    { label: "Technologies", value: `${technologyCount}+` }
  ];

  return (
    <Section
      id="about"
      eyebrow="About Us"
      title={
        <>
          I am available for <span className="text-brand-400">{title}</span> work
        </>
      }
    >
      <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
        <div className="relative mx-auto w-full max-w-[260px]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-700 shadow-soft">
            <Image src={image} alt="About portrait" width={480} height={580} className="h-auto w-full object-cover" />
          </div>
        </div>

        <Card>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{bio}</p>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CTAButton href="#contact" label="Get in Touch" />
          </div>
        </Card>
      </div>
    </Section>
  );
}
