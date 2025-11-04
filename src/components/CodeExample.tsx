/* eslint-disable no-irregular-whitespace */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Play } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  language?: string;
}

const CodeExample = ({ title, description, code, language = "vhdl" }: CodeExampleProps) => {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunning(true);
    
    // Simula execução do código VHDL
    setTimeout(() => {
      setRunning(false);
      toast({
        title: "Simulação Concluída ✅",
        description: `${title} foi executado com sucesso! Em um ambiente real, este código seria sintetizado para FPGA/ASIC.`,
        duration: 4000,
      });
    }, 2000);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-tech-purple/30 hover:border-tech-purple/60 transition-all duration-300 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground mb-2">{title}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="code"
              size="sm"
              onClick={handleCopy}
              className="shrink-0"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? "Copiado!" : "Copiar"}
            </Button>
            <Button 
              variant="code" 
              size="sm" 
              className="shrink-0"
              onClick={handleRun}
              disabled={running}
            >
              <Play className="w-4 h-4 mr-1" />
              {running ? "Executando..." : "Executar"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-gradient-to-br from-background/80 to-muted/20 rounded-lg p-6 border border-border/50 font-mono text-sm overflow-x-auto">
          <pre className="text-tech-cyan whitespace-pre-wrap break-all">
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeExample;