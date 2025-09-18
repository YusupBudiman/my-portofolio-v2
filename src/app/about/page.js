import AboutCard from "@/components/AboutCard";

export default function AboutSection() {
  return (
    <section id="projects" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="mt-10">
        <AboutCard />
      </div>
    </section>
  );
}
