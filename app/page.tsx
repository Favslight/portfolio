import { HeroSection } from "@/components/hero-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProjectsSection } from "@/components/projects-section";
import { DatabaseSection } from "@/components/database-section";
import { SystemThinkingSection } from "@/components/system-thinking-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <DatabaseSection />
      <SystemThinkingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
