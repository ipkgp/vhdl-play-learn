import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle, ArrowRight, Lightbulb, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Step {
  id: number;
  title: string;
  description: string;
  instruction: string;
  hint: string;
  initialCode: string;
  expectedPattern: RegExp;
  successMessage: string;
}

const VHDLStepByStepTutorial = () => {
  const { t } = useTranslation();
  const stepsData = t('tutorial.steps', { returnObjects: true }) as any[];
  
  const steps: Step[] = stepsData.map((stepData, index) => ({
    id: index + 1,
    title: stepData.title,
    description: stepData.description,
    instruction: stepData.instruction,
    hint: stepData.hint,
    successMessage: stepData.successMessage,
    initialCode: getInitialCode(index),
    expectedPattern: getExpectedPattern(index)
  }));

  function getInitialCode(index: number): string {
    const codes = [
`-- Complete a declaração da entidade
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity bcd_7seg is
  Port (
    -- Declare aqui a entrada 'entrada' de 4 bits
    
    -- Declare aqui a saída 'segmentos' de 7 bits
    
  );
end bcd_7seg;`,
`-- Complete a declaração da architecture e do processo
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Declare a architecture behavioral aqui


  -- Declare o processo sensível a 'entrada' aqui
  
    -- Aqui virá a lógica case
    
  -- Finalize o processo aqui
  
-- Finalize a architecture aqui`,
`architecture behavioral of bcd_7seg is
begin
  process(entrada)
  begin
    -- Inicie a estrutura case aqui
    
      -- Complete o mapeamento para 0: "0000" => "1111110"
      
      -- Complete o mapeamento para 1: "0001" => "0110000"
      
      -- Complete o mapeamento para 2: "0010" => "1101101"
      
      when others => segmentos <= "0000000";
    end case;
  end process;
end behavioral;`,
`architecture behavioral of bcd_7seg is
begin
  process(entrada)
  begin
    case entrada is
      when "0000" => segmentos <= "1111110"; -- 0
      when "0001" => segmentos <= "0110000"; -- 1
      when "0010" => segmentos <= "1101101"; -- 2
      -- Complete o mapeamento para 3: "0011" => "1111001"
      
      -- Complete o mapeamento para 4: "0100" => "0110011"
      
      -- Complete o mapeamento para 5: "0101" => "1011011"
      
      -- Complete o mapeamento para 6: "0110" => "1011111"
      
      when others => segmentos <= "0000000";
    end case;
  end process;
end behavioral;`,
`architecture behavioral of bcd_7seg is
begin
  process(entrada)
  begin
    case entrada is
      when "0000" => segmentos <= "1111110"; -- 0
      when "0001" => segmentos <= "0110000"; -- 1
      when "0010" => segmentos <= "1101101"; -- 2
      when "0011" => segmentos <= "1111001"; -- 3
      when "0100" => segmentos <= "0110011"; -- 4
      when "0101" => segmentos <= "1011011"; -- 5
      when "0110" => segmentos <= "1011111"; -- 6
      -- Complete o mapeamento para 7: "0111" => "1110000"
      
      -- Complete o mapeamento para 8: "1000" => "1111111"
      
      -- Complete o mapeamento para 9: "1001" => "1111011"
      
      when others => segmentos <= "0000000";
    end case;
  end process;
end behavioral;`
    ];
    return codes[index] || codes[0];
  }

  function getExpectedPattern(index: number): RegExp {
    const patterns = [
      /entrada\s*:\s*in\s+std_logic_vector\s*\(\s*3\s+downto\s+0\s*\)/i,
      /architecture\s+behavioral\s+of\s+bcd_7seg\s+is.*begin.*process\s*\(\s*entrada\s*\)/is,
      /case\s+entrada\s+is.*when\s+"0000"\s*=>\s*segmentos\s*<=\s*"1111110".*when\s+"0001"\s*=>\s*segmentos\s*<=\s*"0110000".*when\s+"0010"\s*=>\s*segmentos\s*<=\s*"1101101"/is,
      /when\s+"0011"\s*=>\s*segmentos\s*<=\s*"1111001".*when\s+"0100"\s*=>\s*segmentos\s*<=\s*"0110011".*when\s+"0101"\s*=>\s*segmentos\s*<=\s*"1011011".*when\s+"0110"\s*=>\s*segmentos\s*<=\s*"1011111"/is,
      /when\s+"0111"\s*=>\s*segmentos\s*<=\s*"1110000".*when\s+"1000"\s*=>\s*segmentos\s*<=\s*"1111111".*when\s+"1001"\s*=>\s*segmentos\s*<=\s*"1111011"/is
    ];
    return patterns[index] || patterns[0];
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState(steps[0].initialCode);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleVerify = () => {
    const step = steps[currentStep];
    
    if (step.expectedPattern.test(userCode)) {
      setFeedback({
        type: "success",
        message: step.successMessage
      });
      
      if (!completedSteps.includes(step.id)) {
        setCompletedSteps([...completedSteps, step.id]);
      }
    } else {
      setFeedback({
        type: "error",
        message: t('tutorial.feedback.error')
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserCode(steps[currentStep + 1].initialCode);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserCode(steps[currentStep - 1].initialCode);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const progress = ((completedSteps.length) / steps.length) * 100;
  const isStepCompleted = completedSteps.includes(steps[currentStep].id);
  const isLastStep = currentStep === steps.length - 1;
  const allStepsCompleted = completedSteps.length === steps.length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-tech-cyan via-tech-purple to-tech-pink bg-clip-text text-transparent">
          {t('tutorial.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('tutorial.subtitle')}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{t('tutorial.progress')}: {completedSteps.length} {t('tutorial.stepsCompleted')}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {allStepsCompleted && (
          <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500/10 to-tech-cyan/10 rounded-lg border border-green-500/30">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              {t('tutorial.allCompleted')}
            </span>
          </div>
        )}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-tech-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-tech-cyan/20 text-tech-cyan font-bold">
                {currentStep + 1}
              </span>
              <span>{steps[currentStep].title}</span>
              {isStepCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="font-semibold mb-2">📋 {t('tutorial.instructions')}:</p>
              <p className="text-sm">{steps[currentStep].instruction}</p>
            </div>
          </div>

          <Textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="font-mono text-sm min-h-[350px] bg-background/80"
            placeholder={t('tutorial.placeholder')}
          />

          <div className="flex gap-2">
            <Button
              onClick={handleVerify}
              className="flex-1"
              variant="default"
            >
              {t('tutorial.verify')}
            </Button>
            
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? t('tutorial.hideHint') : t('tutorial.showHint')}
            </Button>
          </div>

          {showHint && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                💡 <span className="font-semibold">{t('tutorial.hint')}:</span> {steps[currentStep].hint}
              </p>
            </div>
          )}

          {feedback && (
            <div
              className={`flex items-start gap-2 p-4 rounded-lg border ${
                feedback.type === "success"
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              )}
              <p className={`text-sm ${
                feedback.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                {feedback.message}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 0}
            >
              ← {t('tutorial.previous')}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1 || !isStepCompleted}
              className="gap-2"
            >
              {isLastStep ? t('tutorial.finish') : t('tutorial.next')}
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLStepByStepTutorial;