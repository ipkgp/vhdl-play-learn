import { Button } from "@/components/ui/button";
import { Github, BookOpen, Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-tech-purple">VHDL Academy</h3>
            <p className="text-muted-foreground">
              Aprenda VHDL de forma intuitiva e prática. Do básico ao avançado, tudo que você precisa para dominar hardware design.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-tech-purple transition-colors">Tutoriais</a></li>
              <li><a href="#" className="hover:text-tech-purple transition-colors">Exercícios</a></li>
              <li><a href="#" className="hover:text-tech-purple transition-colors">Projetos</a></li>
              <li><a href="#" className="hover:text-tech-purple transition-colors">Documentação</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Comunidade</h4>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start p-0 h-auto text-muted-foreground hover:text-tech-purple">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-muted-foreground hover:text-tech-blue">
                <BookOpen className="w-4 h-4 mr-2" />
                Documentação
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto text-muted-foreground hover:text-tech-cyan">
                <Code2 className="w-4 h-4 mr-2" />
                Exemplos
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 VHDL Academy. Desenvolvido para ensinar VHDL de forma acessível.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;