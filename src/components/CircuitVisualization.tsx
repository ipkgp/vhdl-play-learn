import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface CircuitVisualizationProps {
  type: "counter" | "flipflop";
  title: string;
}

const CircuitVisualization = ({ type, title }: CircuitVisualizationProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [clockState, setClockState] = useState(false);
  const [dInput, setDInput] = useState(false);
  const [qOutput, setQOutput] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setClockState(prev => !prev);
      
      if (type === "counter" && clockState) {
        setCount(prev => (prev + 1) % 16); // 4-bit counter (0-15)
      } else if (type === "flipflop" && clockState) {
        setQOutput(dInput);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, clockState, dInput, type]);

  const reset = () => {
    setIsRunning(false);
    setCount(0);
    setClockState(false);
    setQOutput(false);
  };

  const renderCounter = () => (
    <div className="space-y-6">
      {/* Clock Signal */}
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm font-mono">CLK</div>
        <div className="flex-1 h-8 bg-muted rounded flex items-center px-2">
          <div 
            className={`w-6 h-6 rounded transition-all duration-300 ${
              clockState ? 'bg-tech-green translate-x-full' : 'bg-tech-red'
            }`}
          />
        </div>
        <div className="w-8 text-sm font-mono">{clockState ? '1' : '0'}</div>
      </div>

      {/* Counter Block */}
      <div className="bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 rounded-lg p-6 border-2 border-tech-blue/30">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-tech-blue">Contador 4-bit</h4>
        </div>
        
        {/* Binary Display */}
        <div className="flex justify-center gap-2 mb-4">
          {[3, 2, 1, 0].map(bit => (
            <div 
              key={bit}
              className={`w-12 h-12 rounded border-2 flex items-center justify-center font-mono text-lg transition-all duration-300 ${
                (count >> bit) & 1 
                  ? 'bg-tech-green border-tech-green text-white' 
                  : 'bg-background border-muted-foreground text-muted-foreground'
              }`}
            >
              {(count >> bit) & 1}
            </div>
          ))}
        </div>
        
        {/* Decimal Display */}
        <div className="text-center">
          <div className="text-2xl font-bold text-tech-cyan">{count}</div>
          <div className="text-sm text-muted-foreground">Valor Decimal</div>
        </div>
      </div>

      {/* Output */}
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm font-mono">COUNT</div>
        <div className="flex-1 flex gap-1">
          {[3, 2, 1, 0].map(bit => (
            <div 
              key={bit}
              className={`flex-1 h-8 rounded flex items-center justify-center font-mono transition-all duration-300 ${
                (count >> bit) & 1 
                  ? 'bg-tech-green text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {(count >> bit) & 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFlipFlop = () => (
    <div className="space-y-6">
      {/* Clock Signal */}
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm font-mono">CLK</div>
        <div className="flex-1 h-8 bg-muted rounded flex items-center px-2">
          <div 
            className={`w-6 h-6 rounded transition-all duration-300 ${
              clockState ? 'bg-tech-green translate-x-full' : 'bg-tech-red'
            }`}
          />
        </div>
        <div className="w-8 text-sm font-mono">{clockState ? '1' : '0'}</div>
      </div>

      {/* D Input Control */}
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm font-mono">D</div>
        <div className="flex-1">
          <Button
            variant={dInput ? "default" : "outline"}
            size="sm"
            onClick={() => setDInput(!dInput)}
            className="w-full"
          >
            {dInput ? '1' : '0'} (Clique para alterar)
          </Button>
        </div>
      </div>

      {/* Flip-Flop Block */}
      <div className="bg-gradient-to-br from-tech-cyan/20 to-tech-blue/20 rounded-lg p-6 border-2 border-tech-cyan/30">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-tech-cyan">Flip-Flop D</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-mono text-xl mx-auto transition-all duration-300 ${
              dInput 
                ? 'bg-tech-green border-tech-green text-white' 
                : 'bg-background border-muted-foreground text-muted-foreground'
            }`}>
              D
            </div>
            <div className="text-sm mt-2">Entrada</div>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-mono text-xl mx-auto transition-all duration-300 ${
              qOutput 
                ? 'bg-tech-green border-tech-green text-white' 
                : 'bg-background border-muted-foreground text-muted-foreground'
            }`}>
              Q
            </div>
            <div className="text-sm mt-2">Saída</div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm font-mono">Q</div>
        <div className={`flex-1 h-8 rounded flex items-center justify-center font-mono transition-all duration-300 ${
          qOutput 
            ? 'bg-tech-green text-white' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {qOutput ? '1' : '0'}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-tech-cyan/30">
      <CardHeader>
        <CardTitle className="text-lg text-tech-cyan flex items-center justify-between">
          <span>Visualização: {title}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? "Pausar" : "Iniciar"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === "counter" ? renderCounter() : renderFlipFlop()}
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            {type === "counter" 
              ? "Este contador incrementa a cada borda de subida do clock. O valor é mostrado em binário (bits individuais) e decimal."
              : "O Flip-Flop D captura o valor da entrada D na borda de subida do clock e o mantém na saída Q."
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircuitVisualization;