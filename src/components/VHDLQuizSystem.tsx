import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Trophy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

const questions: Question[] = [
  {
    id: 1,
    question: "O que significa VHDL?",
    options: [
      "Very High-Speed Digital Logic",
      "VHSIC Hardware Description Language",
      "Virtual Hardware Design Language",
      "Variable Hardware Definition Language",
    ],
    correctAnswer: 1,
    explanation: "VHDL significa VHSIC Hardware Description Language, onde VHSIC é Very High Speed Integrated Circuit.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Qual operador lógico produz saída '1' apenas quando TODAS as entradas são '1'?",
    options: ["OR", "AND", "NOT", "XOR"],
    correctAnswer: 1,
    explanation: "O operador AND só produz saída '1' quando todas as entradas são '1'.",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "Em VHDL, qual é a diferença entre 'signal' e 'variable'?",
    options: [
      "Não há diferença, são sinônimos",
      "Signals são usadas apenas em testbenches",
      "Signals representam conexões físicas e têm comportamento temporal; variables são usadas apenas dentro de processos",
      "Variables são mais rápidas que signals",
    ],
    correctAnswer: 2,
    explanation: "Signals representam conexões físicas reais e têm comportamento temporal (atualizam após delta time). Variables são usadas localmente dentro de processos e atualizam imediatamente.",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "O que é um 'process' em VHDL?",
    options: [
      "Uma função matemática",
      "Um bloco de código que executa sequencialmente quando seus sinais da lista de sensibilidade mudam",
      "Uma declaração de variável",
      "Um tipo de dado",
    ],
    correctAnswer: 1,
    explanation: "Um process é um bloco de código que executa sequencialmente quando qualquer sinal em sua sensitivity list (lista de sensibilidade) muda de valor.",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "Qual é o tipo de dado mais comum para representar bits individuais em VHDL?",
    options: ["bit", "boolean", "std_logic", "integer"],
    correctAnswer: 2,
    explanation: "std_logic é o tipo mais comum pois permite 9 valores diferentes incluindo 'Z' (alta impedância), 'U' (não inicializado), além de '0' e '1'.",
    difficulty: "easy",
  },
  {
    id: 6,
    question: "Em um contador de 4 bits, quantos estados diferentes são possíveis?",
    options: ["4", "8", "16", "32"],
    correctAnswer: 2,
    explanation: "Com 4 bits podemos representar 2^4 = 16 estados diferentes (de 0000 a 1111, ou 0 a 15 em decimal).",
    difficulty: "medium",
  },
  {
    id: 7,
    question: "O que faz o evento 'rising_edge(clk)' em VHDL?",
    options: [
      "Detecta quando o clock muda de valor",
      "Detecta quando o clock vai de '0' para '1' (borda de subida)",
      "Detecta quando o clock vai de '1' para '0'",
      "Mantém o clock sempre em nível alto",
    ],
    correctAnswer: 1,
    explanation: "rising_edge(clk) detecta a borda de subida do clock, ou seja, a transição de '0' para '1'.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "Qual estrutura permite múltiplas condições em VHDL?",
    options: ["if-then", "loop", "case-when", "process"],
    correctAnswer: 2,
    explanation: "A estrutura case-when permite testar uma expressão contra múltiplos valores possíveis, sendo ideal para decodificadores e máquinas de estado.",
    difficulty: "easy",
  },
  {
    id: 9,
    question: "O que é um flip-flop?",
    options: [
      "Um tipo de sandália",
      "Um elemento de memória que armazena 1 bit sincronizado com clock",
      "Uma porta lógica combinacional",
      "Um tipo de contador",
    ],
    correctAnswer: 1,
    explanation: "Um flip-flop é um circuito sequencial básico que armazena 1 bit de informação e muda de estado sincronizado com o clock.",
    difficulty: "easy",
  },
  {
    id: 10,
    question: "Qual a diferença entre lógica combinacional e sequencial?",
    options: [
      "Não há diferença",
      "Combinacional depende apenas das entradas atuais; sequencial depende das entradas e do estado anterior",
      "Sequencial é mais rápida",
      "Combinacional usa clock, sequencial não",
    ],
    correctAnswer: 1,
    explanation: "Lógica combinacional: saída depende APENAS das entradas atuais. Lógica sequencial: saída depende das entradas atuais E do estado anterior (tem memória).",
    difficulty: "medium",
  },
];

const VHDLQuizSystem = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const question = questions[currentQuestion];

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Selecione uma resposta",
        description: "Por favor, escolha uma opção antes de verificar.",
        variant: "destructive",
      });
      return;
    }

    setShowResult(true);

    if (selectedAnswer === question.correctAnswer && !answeredQuestions[currentQuestion]) {
      setScore(score + 1);
      const newAnswered = [...answeredQuestions];
      newAnswered[currentQuestion] = true;
      setAnsweredQuestions(newAnswered);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setQuizCompleted(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "";
    }
  };

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-primary/20">
          <CardContent className="pt-6 text-center space-y-6">
            <Trophy className="w-20 h-20 text-primary mx-auto" />
            <div>
              <h3 className="text-3xl font-bold mb-2">Quiz Concluído! 🎉</h3>
              <p className="text-4xl font-bold text-primary my-4">
                {score} / {questions.length}
              </p>
              <p className="text-xl text-muted-foreground">
                Você acertou {percentage.toFixed(0)}% das questões!
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg max-w-md mx-auto">
              <p className="font-semibold mb-2">Avaliação:</p>
              {percentage >= 90 && <p className="text-green-500">Excelente! Você domina VHDL! 🌟</p>}
              {percentage >= 70 && percentage < 90 && <p className="text-blue-500">Muito bom! Continue praticando! 👍</p>}
              {percentage >= 50 && percentage < 70 && <p className="text-yellow-500">Bom começo! Revise os conceitos. 📚</p>}
              {percentage < 50 && <p className="text-orange-500">Continue estudando! Você vai conseguir! 💪</p>}
            </div>

            <Button onClick={handleReset} size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reiniciar Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Quiz Interativo de VHDL
        </h2>
        <p className="text-lg text-muted-foreground">
          Teste seus conhecimentos com feedback imediato!
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

        {/* Score */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">Pontuação: </span>
          <span className="text-lg font-bold text-primary">
            {score} / {questions.length}
          </span>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Questão {currentQuestion + 1} de {questions.length}
            </span>
            <span className={`text-sm font-semibold uppercase ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty === "easy" && "Fácil"}
              {question.difficulty === "medium" && "Médio"}
              {question.difficulty === "hard" && "Difícil"}
            </span>
          </div>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => {
              if (!showResult) {
                setSelectedAnswer(parseInt(value));
              }
            }}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                    showResult
                      ? index === question.correctAnswer
                        ? "border-green-500 bg-green-500/10"
                        : index === selectedAnswer
                        ? "border-red-500 bg-red-500/10"
                        : "border-muted"
                      : selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>

          {showResult && (
            <div
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-red-500/10 border border-red-500/20"
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold mb-1">
                    {isCorrect ? "Correto! 🎉" : "Incorreto"}
                  </h4>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
              Anterior
            </Button>

            {!showResult ? (
              <Button onClick={handleSubmit}>Verificar Resposta</Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Próxima"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLQuizSystem;
