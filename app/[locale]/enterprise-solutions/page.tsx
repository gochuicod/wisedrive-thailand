
import TechStack from "@/components/b2bSections/techstack/TechStack";
import Contact from "@/components/b2bSections/contact/Contact";
import Hero from "@/components/b2bSections/hero/Hero";
import Infrastructure from "@/components/b2bSections/infrastructure/Infrastructure";
import Models from "@/components/b2bSections/models/Models";

export default function EnterpriseSolutions() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <TechStack />
      <Infrastructure />
      <Models />
      <Contact />
    </div>
  );
}
