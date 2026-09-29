import Image from "next/image";
import { CTAButton } from "@/components/ui/cta-button";
import type { Profile } from "@/lib/types";

export function HeroSection({ profile }: { profile: Profile | null }) {
  const name = profile?.name || "Your Name";
  const title = profile?.title || "Full Stack Developer";
  const tagline = profile?.tagline || "";
  const bio = profile?.bio || "";
  const image = profile?.profile_image_url || "/profile-placeholder.svg";
  const linkedin = profile?.linkedin_url;

  return (
    <section id="top" className="relative grid items-center gap-10 overflow-hidden py-10 sm:py-16 lg:grid-cols-[1fr_420px]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative animate-fade-up">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">Portfolio</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
          Hey! I&apos;m <span className="bg-gradient-to-r from-brand-300 to-accent-400 bg-clip-text text-transparent">{name}</span>.
        </h1>
        <p className="mt-2 text-2xl font-semibold text-brand-300 sm:text-3xl">I&apos;m a {title}</p>
        {tagline ? <p className="mt-4 text-base font-medium text-slate-300">{tagline}</p> : null}
        {bio ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{bio}</p> : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTAButton href="#projects" label="View Projects" />
          <CTAButton href="#contact" label="Contact Me" variant="secondary" />
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-brand-400/50 hover:text-brand-300"
              aria-label="LinkedIn"
            >
              in
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[320px] animate-fade-up">
        <div className="absolute inset-0 -z-10 scale-110 rounded-full border border-dashed border-white/10" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-700 shadow-glow">
          <Image
            src={image}
            alt={`${name} portrait`}
            width={560}
            height={680}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
