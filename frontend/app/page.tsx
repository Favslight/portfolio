import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LogoStrip } from "@/components/logo-strip";
import { AboutSection } from "@/components/about-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProjectsSection } from "@/components/projects-section";
import { OngoingProjectsSection } from "@/components/ongoing-projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { getOngoingProjects, getProfile, getProjects, getTechnologies } from "@/lib/api";

export default async function HomePage() {
  const [profile, technologies, projects, ongoingProjects] = await Promise.all([
    getProfile(),
    getTechnologies(),
    getProjects(),
    getOngoingProjects()
  ]);

  return (
    <>
      <div className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Navbar />
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <HeroSection profile={profile} />
      </main>

      <LogoStrip technologies={technologies} />

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <AboutSection profile={profile} projectCount={projects.length} technologyCount={technologies.length} />
        <ProjectsSection projects={projects} />
        <OngoingProjectsSection projects={ongoingProjects} />
        <TechStackSection technologies={technologies} />
        <ContactSection profile={profile} />
        <Footer profile={profile} />
      </main>
    </>
  );
}
