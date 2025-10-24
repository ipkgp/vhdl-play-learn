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
  expectedPattern: RegExp;
  successMessage: string;
  truthTable?: {
    inputs: string[];
    outputs: string[];
  };
}

const VHDLBasicExercises = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const exercises: Exercise[] = [
    {
      title: t('basicExercises.exercises.andGate.title'),
      description: t('basicExercises.exercises.andGate.description'),
      instructions: t('basicExercises.exercises.andGate.instructions', { returnObjects: true }) as string[],
      hint: t('basicExercises.exercises.andGate.hint'),
      initialCode: t('basicExercises.exercises.andGate.initialCode'),
      expectedPattern: /entity\s+porta_and.*Port.*a\s*:\s*in.*b\s*:\s*in.*y\s*:\s*out/s,
      successMessage: t('basicExercises.exercises.andGate.successMessage'),
      truthTable: {
        inputs: ["a=0 b=0", "a=0 b=1", "a=1 b=0", "a=1 b=1"],
        outputs: ["y=0", "y=0", "y=0", "y=1"],
      },
    },
    {
      title: t('basicExercises.exercises.orGate.title'),
      description: t('basicExercises.exercises.orGate.description'),
      instructions: t('basicExercises.exercises.orGate.instructions', { returnObjects: true }) as string[],
      hint: t('basicExercises.exercises.orGate.hint'),
      initialCode: t('basicExercises.exercises.orGate.initialCode'),
      expectedPattern: /y\s*<=\s*a\s+or\s+b/i,
      successMessage: t('basicExercises.exercises.orGate.successMessage'),
      truthTable: {
        inputs: ["a=0 b=0", "a=0 b=1", "a=1 b=0", "a=1 b=1"],
        outputs: ["y=0", "y=1", "y=1", "y=1"],
      },
    },
    {
      title: t('basicExercises.exercises.notGate.title'),
      description: t('basicExercises.exercises.notGate.description'),
      instructions: t('basicExercises.exercises.notGate.instructions', { returnObjects: true }) as string[],
      hint: t('basicExercises.exercises.notGate.hint'),
      initialCode: t('basicExercises.exercises.notGate.initialCode'),
      expectedPattern: /y\s*<=\s*not\s+a/i,
      successMessage: t('basicExercises.exercises.notGate.successMessage'),
      truthTable: {
        inputs: ["a=0", "a=1"],
        outputs: ["y=1", "y=0"],
      },
    },
    {
      title: t('basicExercises.exercises.mux.title'),
      description: t('basicExercises.exercises.mux.description'),
      instructions: t('basicExercises.exercises.mux.instructions', { returnObjects: true }) as string[],
      hint: t('basicExercises.exercises.mux.hint'),
      initialCode: t('basicExercises.exercises.mux.initialCode'),
      expectedPattern: /y\s*<=\s*a\s+when.*else\s+b/i,
      successMessage: t('basicExercises.exercises.mux.successMessage'),
      truthTable: {
        inputs: ["sel=0 a=0 b=0", "sel=0 a=1 b=0", "sel=1 a=0 b=1", "sel=1 a=1 b=1"],
        outputs: ["y=0", "y=1", "y=1", "y=1"],
      },
    },
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [userCode, setUserCode] = useState(exercises[0].initialCode);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(exercises.length).fill(false));

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
        title: t('quiz.feedback.correct'),
        description: exercise.successMessage,
      });
    } else {
      setFeedback({
        type: "error",
        message: t('basicExercises.feedback.error'),
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
          {t('basicExercises.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('basicExercises.subtitle')}
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{t('basicExercises.progress')}</span>
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
            <h3 className="text-2xl font-bold mb-2">{t('basicExercises.completed')}</h3>
            <p className="text-muted-foreground">
              {t('basicExercises.completedMessage')}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t('basicExercises.exerciseOf', { current: currentExercise + 1, total: exercises.length })}
            </span>
            {completedExercises[currentExercise] && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
          <CardTitle className="text-2xl">{exercise.title}</CardTitle>
          <CardDescription className="text-base">{exercise.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              📋 {t('basicExercises.instructions')}
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

          {exercise.truthTable && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">📊 {t('basicExercises.truthTable')}</h4>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <div className="font-semibold text-sm mb-2 text-muted-foreground">{t('basicExercises.inputs')}</div>
                  {exercise.truthTable.inputs.map((input, idx) => (
                    <div key={idx} className="font-mono text-sm py-1">{input}</div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2 text-muted-foreground">{t('basicExercises.outputs')}</div>
                  {exercise.truthTable.outputs.map((output, idx) => (
                    <div key={idx} className="font-mono text-sm py-1">{output}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">{t('basicExercises.yourCode')}</label>
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="font-mono text-sm min-h-[300px]"
              placeholder={t('basicExercises.placeholder')}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleVerify} className="flex-1 min-w-[200px]">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('basicExercises.verify')}
            </Button>
            <Button onClick={() => setShowHint(!showHint)} variant="outline" className="flex-1 min-w-[200px]">
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? t('basicExercises.hideHint') : t('basicExercises.showHint')}
            </Button>
          </div>

          {showHint && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">💡 {t('basicExercises.hint')}</h4>
                  <p className="text-sm">{exercise.hint}</p>
                </div>
              </div>
            </div>
          )}

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

          <div className="flex justify-between pt-4 border-t">
            <Button
              onClick={handlePrevious}
              disabled={currentExercise === 0}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('basicExercises.previous')}
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentExercise === exercises.length - 1}
            >
              {t('basicExercises.next')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLBasicExercises;