import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Lightbulb, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  title: string;
  description: string;
  instructions: string[];
  hint: string;
  initialCode: string;
  expectedPatterns: RegExp[];
  successMessage: string;
  diagram?: string;
  concepts: string[];
}

const exercises: Exercise[] = [
  {
    title: "Half Adder (Meio Somador)",
    description: "Circuito que soma dois bits, gerando a soma (S) e o vai-um (carry out - C).",
    instructions: [
      "Crie uma entidade 'half_adder' com entradas 'a' e 'b', saídas 's' (soma) e 'c' (carry)",
      "A soma é: s <= a xor b;",
      "O carry é: c <= a and b;",
    ],
    hint: "Use operador XOR para a soma e AND para o carry. Lembre: 1+1 = 10 em binário (soma=0, carry=1).",
    initialCode: `-- Complete o Half Adder
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity half_adder is
  Port (
    a : in std_logic;
    b : in std_logic;
    -- Declare as saídas s e c
  );
end half_adder;

architecture behavioral of half_adder is
begin
  -- s <= a xor b;
  -- c <= a and b;
end behavioral;`,
    expectedPatterns: [/s\s*<=\s*a\s+xor\s+b/i, /c\s*<=\s*a\s+and\s+b/i],
    successMessage: "Excelente! O Half Adder é a base para somadores mais complexos!",
    diagram: "a ⊕ b = S\na ∧ b = C",
    concepts: ["Aritmética binária", "Operador XOR", "Carry bit"],
  },
  {
    title: "Full Adder (Somador Completo)",
    description: "Soma três bits: a, b e carry_in, produzindo soma e carry_out. Base dos somadores de múltiplos bits.",
    instructions: [
      "Crie uma entidade 'full_adder' com entradas a, b, carry_in e saídas s, carry_out",
      "Soma: s <= a xor b xor carry_in;",
      "Carry out: carry_out <= (a and b) or (carry_in and (a xor b));",
    ],
    hint: "O Full Adder pode ser construído com dois Half Adders. A fórmula do carry_out combina múltiplas condições com OR.",
    initialCode: `-- Complete o Full Adder
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity full_adder is
  Port (
    a        : in std_logic;
    b        : in std_logic;
    carry_in : in std_logic;
    s        : out std_logic;
    carry_out: out std_logic
  );
end full_adder;

architecture behavioral of full_adder is
begin
  -- Implemente a soma e o carry_out
end behavioral;`,
    expectedPatterns: [
      /s\s*<=\s*a\s+xor\s+b\s+xor\s+carry_in/i,
      /carry_out\s*<=.*and.*or/i,
    ],
    successMessage: "Perfeito! Full Adders são encadeados para criar somadores de 8, 16, 32 bits!",
    concepts: ["Somadores cascateados", "Propagação de carry", "Circuitos aritméticos"],
  },
  {
    title: "Decodificador 2-para-4",
    description: "Converte 2 bits de entrada em 4 saídas, onde apenas uma saída é '1' por vez.",
    instructions: [
      "Crie uma entidade 'decoder_2to4' com entrada de 2 bits (sel) e saída de 4 bits (y)",
      "Use um process com case-when para mapear cada combinação de entrada",
      "Quando sel='00', y='0001'; sel='01', y='0010'; sel='10', y='0100'; sel='11', y='1000'",
    ],
    hint: "Use case sel is ... when '00' => y <= '0001'; ... end case; dentro de um process.",
    initialCode: `-- Complete o Decodificador 2-para-4
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity decoder_2to4 is
  Port (
    sel : in std_logic_vector(1 downto 0);
    y   : out std_logic_vector(3 downto 0)
  );
end decoder_2to4;

architecture behavioral of decoder_2to4 is
begin
  process(sel)
  begin
    case sel is
      -- Complete os casos
      when others => y <= "0000";
    end case;
  end process;
end behavioral;`,
    expectedPatterns: [/case\s+sel\s+is/i, /when\s+"00"\s*=>\s*y\s*<=\s*"0001"/i],
    successMessage: "Ótimo! Decodificadores são essenciais em seleção de memória e multiplexação!",
    concepts: ["Decodificação", "Case statement", "One-hot encoding"],
  },
  {
    title: "Contador 0-3 com Enable",
    description: "Contador de 2 bits (0→1→2→3→0) que só conta quando enable='1'.",
    instructions: [
      "Crie uma entidade 'counter_0to3' com clock, reset, enable e saída count (2 bits)",
      "Use process com rising_edge(clock) para lógica síncrona",
      "Se reset='1': count <= '00'",
      "Se enable='1': incrementa count (use numeric_std para conversão)",
    ],
    hint: "Use library IEEE.NUMERIC_STD.ALL; e converta: count <= std_logic_vector(unsigned(count) + 1);",
    initialCode: `-- Complete o Contador 0-3
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity counter_0to3 is
  Port (
    clock  : in std_logic;
    reset  : in std_logic;
    enable : in std_logic;
    count  : out std_logic_vector(1 downto 0)
  );
end counter_0to3;

architecture behavioral of counter_0to3 is
  signal count_internal : std_logic_vector(1 downto 0) := "00";
begin
  process(clock, reset)
  begin
    if reset = '1' then
      count_internal <= "00";
    elsif rising_edge(clock) then
      -- Implemente a lógica de enable e incremento
    end if;
  end process;
  
  count <= count_internal;
end behavioral;`,
    expectedPatterns: [
      /rising_edge\(clock\)/i,
      /enable\s*=\s*'1'/i,
      /unsigned/i,
    ],
    successMessage: "Excelente! Você dominou lógica sequencial com enable!",
    concepts: ["Lógica sequencial", "Clock edge", "Enable signal", "Numeric conversions"],
  },
];

const VHDLIntermediateExercises = () => {
  const { t } = useTranslation();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userCode, setUserCode] = useState(exercises[0].initialCode);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const { toast } = useToast();

  const exercise = exercises[currentExercise];

  const handleVerify = () => {
    const allPatternsMatch = exercise.expectedPatterns.every((pattern) => pattern.test(userCode));

    if (allPatternsMatch) {
      setFeedback({
        type: "success",
        message: exercise.successMessage,
      });
      const newCompleted = [...completedExercises];
      newCompleted[currentExercise] = true;
      setCompletedExercises(newCompleted);
      toast({
        title: "Correto! 🎉",
        description: exercise.successMessage,
      });
    } else {
      setFeedback({
        type: "error",
        message: t('intermediateExercises.feedback.error'),
      });
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserCode(exercises[currentExercise + 1].initialCode);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserCode(exercises[currentExercise - 1].initialCode);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const allCompleted = completedExercises.every((completed) => completed);
  const progress = (completedExercises.filter(Boolean).length / exercises.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {t('intermediateExercises.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('intermediateExercises.subtitle')}
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{t('intermediateExercises.progress')}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {allCompleted && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6 text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('intermediateExercises.completed')}</h3>
            <p className="text-muted-foreground">
              {t('intermediateExercises.completedMessage')}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t('intermediateExercises.exerciseOf', { current: currentExercise + 1, total: exercises.length })}
            </span>
            {completedExercises[currentExercise] && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
          <CardTitle className="text-2xl">{exercise.title}</CardTitle>
          <CardDescription className="text-base">{exercise.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              📋 {t('intermediateExercises.instructions')}
            </h4>
            <ul className="space-y-2">
              {exercise.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concepts */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 {t('intermediateExercises.conceptsApplied')}</h4>
            <div className="flex flex-wrap gap-2">
              {exercise.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('intermediateExercises.yourCode')}</label>
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="font-mono text-sm min-h-[400px]"
              placeholder={t('intermediateExercises.placeholder')}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleVerify} className="flex-1 min-w-[200px]">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('intermediateExercises.verify')}
            </Button>
            <Button onClick={() => setShowHint(!showHint)} variant="outline" className="flex-1 min-w-[200px]">
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? t('intermediateExercises.hideHint') : t('intermediateExercises.showHint')}
            </Button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">💡 {t('intermediateExercises.hint')}</h4>
                  <p className="text-sm">{exercise.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                feedback.type === "success"
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-destructive/10 border border-destructive/20"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{feedback.message}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button onClick={handlePrevious} disabled={currentExercise === 0} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('intermediateExercises.previous')}
            </Button>
            <Button onClick={handleNext} disabled={currentExercise === exercises.length - 1}>
              {t('intermediateExercises.next')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLIntermediateExercises;
