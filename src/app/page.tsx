import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SchematicAnimation from "@/components/SchematicAnimation";
import SolutionSection from "@/components/SolutionSection";
import SynthesisAnimation from "@/components/SynthesisAnimation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SchematicAnimation />
        <SolutionSection />
        <SynthesisAnimation />
        {/* Page content will go here */}
        <div className="min-h-screen"></div>
        <Footer />
      </main>
    </>
  );
}
