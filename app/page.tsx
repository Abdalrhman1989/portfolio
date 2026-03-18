import Hero from "@/components/Hero";
import AboutGrid from "@/components/AboutGrid";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import TechShowcase from "@/components/TechShowcase";
import CodeSpotlight from "@/components/CodeSpotlight";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import SkillsMarquee from "@/components/SkillsMarquee";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Game from "@/components/Game";
import Game2 from "@/components/Game2";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background relative">
      <div className="relative z-10 w-full overflow-hidden">
        <Hero />
        <AboutGrid />
        <Stats />
        <Services />
        <TechShowcase />
        <CodeSpotlight />
        <Process />
        <SkillsMarquee />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Game />
        <Game2 />
        <FAQ />
        <CTA />
        <Contact />
      </div>
    </main>
  );
}
