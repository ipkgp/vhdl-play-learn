import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LearningSection from "@/components/LearningSection";
import VHDLBasicExercises from "@/components/VHDLBasicExercises";
import VHDLQuizSystem from "@/components/VHDLQuizSystem";
import VHDLIntermediateExercises from "@/components/VHDLIntermediateExercises";
import VHDLStepByStepTutorial from "@/components/VHDLStepByStepTutorial";
import VHDLSevenSegmentLab from "@/components/VHDLSevenSegmentLab";
import VHDLGlossary from "@/components/VHDLGlossary";
import VHDLGamification from "@/components/VHDLGamification";
import Resources from "./Resources";
import About from "./About";
import Contact from "./Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="learning-section">
        <LearningSection />
      </div>
      
      <section id="code-examples" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background scroll-mt-16">
        <VHDLBasicExercises />
      </section>
      
      <section id="quiz" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 scroll-mt-16">
        <VHDLQuizSystem />
      </section>
      
      <section id="intermediate" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background scroll-mt-16">
        <VHDLIntermediateExercises />
      </section>
      
      <section id="tutorial" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 scroll-mt-16">
        <VHDLStepByStepTutorial />
      </section>
      
      <section id="lab" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background scroll-mt-16">
        <VHDLSevenSegmentLab />
      </section>
      
      <section id="glossary" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 scroll-mt-16">
        <VHDLGlossary />
      </section>
      
      <section id="achievements" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background scroll-mt-16">
        <VHDLGamification />
      </section>

      <Resources />
      <About />
      <Contact />
      
      
      <Toaster />
    </div>
  );
};

export default Index;
