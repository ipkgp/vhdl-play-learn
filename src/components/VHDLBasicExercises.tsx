import { useState } from "react";
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
  expectedPattern: RegExp;
  successMessage: string;
  truthTable?: {
    inputs: string[];
    outputs: string[];
  };
}

const exercises: Exercise[] = [
  {
    title: "Porta AND (E)",
    description: "Crie uma porta lógica AND de 2 entradas. A saída só é '1' quando AMBAS as entradas são '1'.",
    instructions: [
      "Crie uma entidade chamada 'porta_and' com 2 entradas (a, b) e 1 saída (y)",
      "Use o operador 'and' para combinar as entradas: y <= a and b;",
    ],
    hint: "A porta AND usa o operador 'and'. Lembre-se: entity nome is Port(...); end nome; depois architecture...",
    initialCode: `-- Complete o código da porta AND
entity porta_and is
  Port (
    -- Declare as entradas a, b
    -- Declare a saída y
  );
end porta_and;

architecture behavioral of porta_and is
begin
  -- Implemente: y <= a and b;
end behavioral;`,
    expectedPattern: /entity\s+porta_and.*Port.*a\s*:\s*in.*b\s*:\s*in.*y\s*:\s*out/s,
    successMessage: "Perfeito! Você criou sua primeira porta lógica em VHDL!",
    truthTable: {
      inputs: ["a=0 b=0", "a=0 b=1", "a=1 b=0", "a=1 b=1"],
      outputs: ["y=0", "y=0", "y=0", "y=1"],
    },
  },
  {
    title: "Porta OR (OU)",
    description: "Crie uma porta lógica OR de 2 entradas. A saída é '1' quando PELO MENOS UMA entrada é '1'.",
    instructions: [
      "Crie uma entidade chamada 'porta_or' com 2 entradas (a, b) e 1 saída (y)",
      "Use o operador 'or' para combinar as entradas",
    ],
    hint: "Similar à porta AND, mas use o operador 'or' ao invés de 'and'.",
    initialCode: `-- Complete o código da porta OR
entity porta_or is
  Port (
    a : in std_logic;
    b : in std_logic;
    -- Declare a saída y
  );
end porta_or;

architecture behavioral of porta_or is
begin
  -- Implemente usando o operador 'or'
end behavioral;`,
    expectedPattern: /y\s*<=\s*a\s+or\s+b/i,
    successMessage: "Excelente! A porta OR está funcionando corretamente!",
    truthTable: {
      inputs: ["a=0 b=0", "a=0 b=1", "a=1 b=0", "a=1 b=1"],
      outputs: ["y=0", "y=1", "y=1", "y=1"],
    },
  },
  {
    title: "Porta NOT (Inversor)",
    description: "Crie uma porta lógica NOT. A saída é sempre o INVERSO da entrada.",
    instructions: [
      "Crie uma entidade chamada 'porta_not' com 1 entrada (a) e 1 saída (y)",
      "Use o operador 'not' para inverter a entrada",
    ],
    hint: "O operador NOT é usado assim: y <= not a;",
    initialCode: `-- Complete o código da porta NOT
entity porta_not is
  Port (
    -- Declare a entrada e a saída
  );
end porta_not;

architecture behavioral of porta_not is
begin
  -- Inverta a entrada
end behavioral;`,
    expectedPattern: /y\s*<=\s*not\s+a/i,
    successMessage: "Ótimo trabalho! Você dominou o operador NOT!",
    truthTable: {
      inputs: ["a=0", "a=1"],
      outputs: ["y=1", "y=0"],
    },
  },
  {
    title: "Multiplexador 2:1",
    description: "Crie um multiplexador que seleciona entre 2 entradas baseado em um sinal de seleção.",
    instructions: [
      "Crie uma entidade com 2 entradas de dados (a, b), 1 seletor (sel) e 1 saída (y)",
      "Use uma expressão condicional: y <= a when sel='0' else b;",
      "Quando sel=0, a saída y recebe 'a'. Quando sel=1, y recebe 'b'",
    ],
    hint: "Use a estrutura: saida <= entrada1 when condicao else entrada2;",
    initialCode: `-- Complete o código do multiplexador 2:1
entity mux_2to1 is
  Port (
    a   : in std_logic;
    b   : in std_logic;
    sel : in std_logic;
    y   : out std_logic
  );
end mux_2to1;

architecture behavioral of mux_2to1 is
begin
  -- Implemente a lógica de seleção
  -- y <= a when sel='0' else b;
end behavioral;`,
    expectedPattern: /y\s*<=\s*a\s+when.*else\s+b/i,
    successMessage: "Fantástico! Você criou um multiplexador funcional!",
    truthTable: {
      inputs: ["sel=0 a=0 b=0", "sel=0 a=1 b=0", "sel=1 a=0 b=1", "sel=1 a=1 b=1"],
      outputs: ["y=0", "y=1", "y=1", "y=1"],
    },
  },
];

const VHDLBasicExercises = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userCode, setUserCode] = useState(exercises[0].initialCode);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const { toast } = useToast();

  const exercise = exercises[currentExercise];

  const handleVerify = () => {
    const isCorrect = exercise.expectedPattern.test(userCode);

    if (isCorrect) {
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
        message: "O código ainda não está correto. Revise as instruções e tente novamente.",
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
          Exercícios Básicos de VHDL
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comece do zero! Aprenda os componentes fundamentais da lógica digital.
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progresso</span>
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
            <h3 className="text-2xl font-bold mb-2">Parabéns! 🎉</h3>
            <p className="text-muted-foreground">
              Você completou todos os exercícios básicos! Agora está pronto para desafios mais avançados.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Exercício {currentExercise + 1} de {exercises.length}
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
              📋 Instruções
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

          {/* Truth Table */}
          {exercise.truthTable && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">📊 Tabela Verdade</h4>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <div className="font-semibold text-sm mb-2 text-muted-foreground">Entradas</div>
                  {exercise.truthTable.inputs.map((input, idx) => (
                    <div key={idx} className="font-mono text-sm py-1">{input}</div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2 text-muted-foreground">Saída</div>
                  {exercise.truthTable.outputs.map((output, idx) => (
                    <div key={idx} className="font-mono text-sm py-1">{output}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">Seu código VHDL:</label>
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="font-mono text-sm min-h-[300px]"
              placeholder="Digite seu código VHDL aqui..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleVerify} className="flex-1 min-w-[200px]">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verificar Código
            </Button>
            <Button onClick={() => setShowHint(!showHint)} variant="outline" className="flex-1 min-w-[200px]">
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? "Esconder Dica" : "Ver Dica"}
            </Button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">💡 Dica</h4>
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
            <Button
              onClick={handlePrevious}
              disabled={currentExercise === 0}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentExercise === exercises.length - 1}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLBasicExercises;
