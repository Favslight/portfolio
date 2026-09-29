import Image from "next/image";
import { CTAButton } from "@/components/ui/cta-button";

export function HeroSection() {
  return (
    <section id="top" className="grid items-center gap-8 py-8 sm:py-14 lg:grid-cols-[320px_1fr]">
      <div className="mx-auto w-full max-w-[280px]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <Image
            src="/profile.jpg"
            alt="Profile portrait placeholder"
            width={560}
            height={680}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="animate-fade-up">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Portfolio</p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Samuel Ebiloma
        </h1>
        <p className="mt-4 text-lg font-semibold text-slate-700">Full Stack Developer</p>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          I build robust backend systems using Node.js, API-first architecture, and scalable service design while
          shipping thoughtful frontend experiences with Next.js. My journey from Graphics Design to UI/UX and then
          Software Engineering gives me a product mindset across the full development lifecycle. I am driven by
          building scalable systems, intelligent automation, and AI-powered platforms that solve real operational
          problems.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="#projects" label="View Projects" />
          <CTAButton href="#contact" label="Contact Me" variant="secondary" />
        </div>
      </div>
    </section>
  );
}

