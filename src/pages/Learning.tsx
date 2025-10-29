/* eslint-disable no-irregular-whitespace */
import { useTranslation } from "react-i18next";
// 1. Importamos os componentes e ícones necessários
import ConceptCard from "../components/ConceptCard";
import { Cpu, Zap, Clock, Database, Workflow, Layers, BookOpen, History, Settings } from "lucide-react";

// 2. Copiamos os arrays de conceitos de 'LearningSection.tsx'
const basicConcepts = [
  {
    title: "O que é VHDL?",
    description: "VHDL (VHSIC Hardware Description Language) é uma linguagem de descrição de hardware usada para modelar sistemas eletrônicos digitais. Permite descrever tanto o comportamento quanto a estrutura de circuitos digitais.",
    icon: <BookOpen className="w-6 h-6" />,
    example: "-- VHDL descreve hardware de forma textual",
    color: "blue" as const
  },
  {
    title: "História",
    description: "Desenvolvida pelo Departamento de Defesa dos EUA nos anos 1980, VHDL tornou-se padrão IEEE 1076 em 1987. Foi criada para documentar e simular circuitos digitais complexos de forma padronizada.",
    icon: <History className="w-6 h-6" />,
    example: "IEEE Standard 1076-1987 (primeira versão)",
    color: "purple" as const
  },
  {
    title: "Características",
    description: "Linguagem fortemente tipada, suporta paralelismo, hierarquia, simulação temporal e síntese. Ideal para FPGAs e ASICs, com recursos para teste e verificação de hardware.",
    icon: <Settings className="w-6 h-6" />,
    example: "Concorrência, tipos definidos pelo usuário, generics",
    color: "cyan" as const
  }
];

const concepts = [
  {
    title: "Entidades e Arquiteturas",
    description: "As estruturas fundamentais do VHDL. A entidade define as interfaces (portas) e a arquitetura descreve o comportamento interno.",
    icon: <Cpu className="w-6 h-6" />,
    example: "entity porta_and is port(a, b: in bit; y: out bit); end;",
    color: "purple" as const
  },
  {
    title: "Sinais e Variáveis", 
    description: "Aprenda as diferenças entre sinais (conectam componentes) e variáveis (armazenam valores temporários).",
    icon: <Zap className="w-6 h-6" />,
    example: "signal clk : std_logic; variable temp : integer;",
    color: "blue" as const
  },
  {
    title: "Processos e Clock",
    description: "Processos definem comportamentos sequenciais e são fundamentais para circuitos síncronos.",
    icon: <Clock className="w-6 h-6" />,
    example: "process(clk) begin if rising_edge(clk) then...",
    color: "cyan" as const
  },
  {
    title: "Tipos de Dados",
    description: "VHDL oferece diversos tipos: bit, std_logic, integer, arrays e tipos personalizados.",
    icon: <Database className="w-6 h-6" />,
    example: "type estado is (idle, active, done);",
    color: "green" as const
  },
  {
    title: "Máquinas de Estado",
    description: "Implemente controle complexo usando máquinas de estado finito (FSM).",
    icon: <Workflow className="w-6 h-6" />,
    example: "case estado_atual is when idle => ...",
    color: "purple" as const
  },
  {
    title: "Hierarquia e Componentes",
    description: "Crie designs modulares instanciando componentes e criando hierarquias.",
    icon: <Layers className="w-6 h-6" />,
    example: "component contador port(clk: in std_logic; ...);",
    color: "blue" as const
  }
];

const Learning = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* 3. Mantemos o seu cabeçalho da página */}
      <div className="pt-24 pb-12 px-6 text-center bg-muted/20">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {t("nav.learning")} {/* Usando o i18n para o título */}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Aqui você encontrará tutoriais e materiais passo a passo para aprender VHDL,
          desde o básico até conceitos avançados.
        </p>
      </div>

      {/* 4. Copiamos o JSX das secções de 'LearningSection.tsx' */}
      <section id="learning-content" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Basic Concepts Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              {t('learning.intro.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('learning.intro.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {basicConcepts.map((concept, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <ConceptCard {...concept} />
              </div>
            ))}
          </div>

          {/* Advanced Concepts Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-tech-purple to-tech-blue bg-clip-text text-transparent">
              {t('learning.fundamentals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('learning.fundamentals.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {concepts.map((concept, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ConceptCard {...concept} />
              </div>
            ))}
          </div>

          

        </div>
      </section>
    </>
  );
};

export default Learning;