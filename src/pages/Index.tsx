import Hero from "@/components/Hero";
import LearningSection from "@/components/LearningSection";
import VHDLBasicExercises from "@/components/VHDLBasicExercises";
import VHDLQuizSystem from "@/components/VHDLQuizSystem";
import VHDLIntermediateExercises from "@/components/VHDLIntermediateExercises";
import VHDLStepByStepTutorial from "@/components/VHDLStepByStepTutorial";
import VHDLSevenSegmentLab from "@/components/VHDLSevenSegmentLab";
import VHDLGlossary from "@/components/VHDLGlossary";
import VHDLGamification from "@/components/VHDLGamification";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <LearningSection />
      
      {/* Fase 1: Exercícios Básicos */}
      <section id="exercicios-basicos" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <VHDLBasicExercises />
      </section>
      
      {/* Fase 2: Quiz Interativo */}
      <section id="quiz" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <VHDLQuizSystem />
      </section>
      
      {/* Fase 3: Exercícios Intermediários */}
      <section id="exercicios-intermediarios" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <VHDLIntermediateExercises />
      </section>
      
      {/* Tutorial Passo-a-Passo (Display 7 Segmentos) */}
      <section id="tutorial-display" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <VHDLStepByStepTutorial />
      </section>
      
      {/* Laboratório Interativo */}
      <section id="laboratorio" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <VHDLSevenSegmentLab />
      </section>
      
      {/* Fase 4: Glossário Interativo */}
      <section id="glossario" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <VHDLGlossary />
      </section>
      
      {/* Fase 4: Sistema de Gamificação */}
      <section id="conquistas" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <VHDLGamification />
      </section>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
