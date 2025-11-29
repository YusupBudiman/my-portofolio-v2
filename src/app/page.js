"use client";
import SkillsSection from "./skills/page";
import ExperienceSection from "./experience/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
