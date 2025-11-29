import { projects } from "@/data/Projects";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center justify-center"
    >
      <ProjectCarousel projects={projects} />
    </section>
  );
}
