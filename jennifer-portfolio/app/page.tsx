"use client";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CaseStudy } from "./components/CaseStudy";

type View = "home" | "case-study";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [currentSection, setCurrentSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleNavigate = (section: string) => {
    if (section === "home") {
      setCurrentView("home");
      setCurrentSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentView("home");
    setCurrentSection(section);

    // Wait for view to update, then scroll
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleViewCaseStudy = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentView("case-study");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Header onNavigate={handleNavigate} currentSection={currentSection} />

      {currentView === "home" ? (
        <>
          <Hero onNavigate={handleNavigate} />
          <Services />
          <Projects onViewCaseStudy={handleViewCaseStudy} />
          <About />
          <TechStack />
          <Contact />
          <Footer />
        </>
      ) : currentView === "case-study" && selectedProject ? (
        <CaseStudy
          projectId={selectedProject}
          onBack={handleBackToHome}
          onNavigate={handleNavigate}
        />
      ) : null}
    </div>
  );
}
