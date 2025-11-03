import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  category: "basic" | "advanced" | "operator" | "type";
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Entity (Entidade)",
    definition: "Declaração da interface externa de um circuito, especificando suas entradas e saídas (ports). É como a 'caixa preta' vista de fora.",
    example: "entity led_control is\n  Port ( button : in std_logic;\n         led : out std_logic );\nend led_control;",
    category: "basic",
  },
  {
    term: "Architecture (Arquitetura)",
    definition: "Descreve o comportamento interno ou estrutura do circuito definido pela entity. Uma entity pode ter múltiplas architectures.",
    example: "architecture behavioral of led_control is\nbegin\n  led <= button;\nend behavioral;",
    category: "basic",
  },
  {
    term: "Signal (Sinal)",
    definition: "Representa uma conexão física (fio) no circuito. Tem comportamento temporal e atualiza após delta time. Usado para comunicação entre processos.",
    example: "signal contador : integer := 0;",
    category: "basic",
  },
  {
    term: "Variable (Variável)",
    definition: "Armazena valores temporários dentro de processos. Atualiza imediatamente (sem delay). Não representa hardware real.",
    example: "variable temp : integer := 0;",
    category: "basic",
  },
  {
    term: "Process (Processo)",
    definition: "Bloco de código que executa sequencialmente quando sinais da sensitivity list mudam. Fundamental para lógica sequencial.",
    example: "process(clock, reset)\nbegin\n  if rising_edge(clock) then\n    -- código aqui\n  end if;\nend process;",
    category: "basic",
  },
  {
    term: "std_logic",
    definition: "Tipo de dado mais usado em VHDL. Representa um bit com 9 valores possíveis: '0', '1', 'Z' (alta impedância), 'U' (não inicializado), etc.",
    example: "signal led : std_logic;",
    category: "type",
  },
  {
    term: "std_logic_vector",
    definition: "Array de bits std_logic. Usado para barramentos e dados multi-bit.",
    example: "signal data_bus : std_logic_vector(7 downto 0);",
    category: "type",
  },
  {
    term: "Integer",
    definition: "Tipo numérico para representar números inteiros. Útil para contadores e índices.",
    example: "signal count : integer range 0 to 255;",
    category: "type",
  },
  {
    term: "rising_edge()",
    definition: "Detecta borda de subida de um sinal (transição de '0' para '1'). Usado em lógica síncrona com clock.",
    example: "if rising_edge(clock) then\n  count <= count + 1;\nend if;",
    category: "advanced",
  },
  {
    term: "falling_edge()",
    definition: "Detecta borda de descida de um sinal (transição de '1' para '0').",
    example: "if falling_edge(clock) then\n  -- ação na descida\nend if;",
    category: "advanced",
  },
  {
    term: "AND (e)",
    definition: "Operador lógico. Resultado é '1' apenas quando TODAS as entradas são '1'.",
    example: "y <= a and b;",
    category: "operator",
  },
  {
    term: "OR (ou)",
    definition: "Operador lógico. Resultado é '1' quando PELO MENOS UMA entrada é '1'.",
    example: "y <= a or b;",
    category: "operator",
  },
  {
    term: "NOT (não)",
    definition: "Operador lógico. Inverte o valor do bit.",
    example: "y <= not a;",
    category: "operator",
  },
  {
    term: "XOR (ou exclusivo)",
    definition: "Operador lógico. Resultado é '1' quando as entradas são DIFERENTES.",
    example: "y <= a xor b; -- usado em somadores",
    category: "operator",
  },
  {
    term: "NAND",
    definition: "Operador lógico. NOT AND - inverte o resultado de AND.",
    example: "y <= a nand b;",
    category: "operator",
  },
  {
    term: "NOR",
    definition: "Operador lógico. NOT OR - inverte o resultado de OR.",
    example: "y <= a nor b;",
    category: "operator",
  },
  {
    term: "Port",
    definition: "Ponto de conexão (entrada/saída) de uma entity. Pode ser: in (entrada), out (saída), inout (bidirecional).",
    example: "Port ( clk : in std_logic;\n       led : out std_logic );",
    category: "basic",
  },
  {
    term: "Component (Componente)",
    definition: "Permite reutilizar entidades dentro de outras, criando hierarquia. Como 'instanciar' um circuito dentro de outro.",
    example: "component contador\n  Port ( clk : in std_logic );\nend component;",
    category: "advanced",
  },
  {
    term: "Generic",
    definition: "Parâmetro configurável de uma entity, permitindo criar componentes parametrizáveis (ex: largura de barramento).",
    example: "generic ( WIDTH : integer := 8 );",
    category: "advanced",
  },
  {
    term: "Case-When",
    definition: "Estrutura condicional que testa uma expressão contra múltiplos valores. Ideal para decodificadores e FSMs.",
    example: "case estado is\n  when idle => ...\n  when running => ...\nend case;",
    category: "basic",
  },
  {
    term: "Library",
    definition: "Coleção de pacotes. IEEE.STD_LOGIC_1164 contém std_logic. IEEE.NUMERIC_STD contém operações aritméticas.",
    example: "library IEEE;\nuse IEEE.STD_LOGIC_1164.ALL;\nuse IEEE.NUMERIC_STD.ALL;",
    category: "basic",
  },
  {
    term: "Sensitivity List",
    definition: "Lista de sinais que, quando mudam, fazem o process executar. Fundamental para simulação correta.",
    example: "process(clock, reset) -- sensitivity list",
    category: "advanced",
  },
  {
    term: "Unsigned/Signed",
    definition: "Tipos da biblioteca NUMERIC_STD para operações aritméticas em vetores sem sinal e com sinal.",
    example: "signal count : unsigned(7 downto 0);",
    category: "type",
  },
  {
    term: "Concurrent Assignment",
    definition: "Atribuição que ocorre continuamente (fora de process). Todas executam em paralelo, representando conexões diretas.",
    example: "led <= button; -- sempre ativo",
    category: "advanced",
  },
  {
    term: "Sequential Assignment",
    definition: "Atribuição dentro de process. Executa na ordem escrita (sequencialmente).",
    example: "process\nbegin\n  temp := a + b; -- sequencial\n  result <= temp;\nend process;",
    category: "advanced",
  },
];

const VHDLGlossary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (category: string) => {
    return t(`glossary.categories.${category}`);
  };

  const categories = ["basic", "operator", "type", "advanced"];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('glossary.title')}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('glossary.subtitle')}
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder={t('glossary.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredTerms.length} {t('glossary.termsFound')}
          </p>
        </CardContent>
      </Card>

      {/* Glossary by Category */}
      {categories.map((category) => {
        const categoryTerms = filteredTerms.filter((t) => t.category === category);
        if (categoryTerms.length === 0) return null;

        return (
          <Card key={category} className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">{getCategoryName(category)}</CardTitle>
              <CardDescription>{categoryTerms.length} {t('glossary.categoryCount')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {categoryTerms.map((item, index) => (
                  <AccordionItem key={index} value={`item-${category}-${index}`}>
                    <AccordionTrigger className="text-left">
                      <span className="font-semibold text-primary">{item.term}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p className="text-base">{item.definition}</p>
                        {item.example && (
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm font-semibold text-muted-foreground mb-2">
                              {t('glossary.example')}:
                            </p>
                            <pre className="text-sm font-mono overflow-x-auto">
                              {item.example}
                            </pre>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            {t('glossary.noResults')}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VHDLGlossary;
