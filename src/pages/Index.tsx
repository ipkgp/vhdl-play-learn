import Hero from "@/components/Hero";
import LearningSection from "@/components/LearningSection";
import VHDLStepByStepTutorial from "@/components/VHDLStepByStepTutorial";
import VHDLSevenSegmentLab from "@/components/VHDLSevenSegmentLab";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <LearningSection />
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <VHDLStepByStepTutorial />
      </section>
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <VHDLSevenSegmentLab />
      </section>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
