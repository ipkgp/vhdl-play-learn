import { Button } from "@/components/ui/button";
import heroImage from "@/assets/vhdl-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="VHDL Programming Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-tech-purple to-tech-blue bg-clip-text text-transparent animate-fade-in">
          Aprenda VHDL
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in delay-200">
          Domine a linguagem de descrição de hardware de forma intuitiva e prática
        </p>
        <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto animate-fade-in delay-300">
          Do básico aos conceitos avançados, aprenda VHDL com exemplos reais e explicações claras que tornam o hardware design acessível para todos.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Começar Agora
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-tech-purple/30 hover:border-tech-purple">
            Ver Exemplos
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-tech-purple/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-tech-purple rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;