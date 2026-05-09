import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Achievements } from "@/components/portfolio/Achievements";
import { Languages } from "@/components/portfolio/Languages";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ParticlesBg } from "@/components/portfolio/ParticlesBg";
import { BackToTop } from "@/components/portfolio/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siliveru Vamshi — Web Developer | AI & Data Science Student" },
      {
        name: "description",
        content:
          "Portfolio of Siliveru Vamshi, a 3rd year B.Tech AI & Data Science student building modern web, AI-powered, and creative projects.",
      },
      { property: "og:title", content: "Siliveru Vamshi — Developer Portfolio" },
      {
        property: "og:description",
        content: "Premium portfolio showcasing projects, skills, and journey in AI, web, and design.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen text-foreground">
      <ScrollProgress />
      <CursorGlow />
      <ParticlesBg />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Languages />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}

