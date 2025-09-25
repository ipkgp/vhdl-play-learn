import Hero from "@/components/Hero";
import LearningSection from "@/components/LearningSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <LearningSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
