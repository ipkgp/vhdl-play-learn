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
    <Card className="bg-card/50 backdrop-blur-sm border-tech-purple/30 hover:border-tech-purple/60 transition-all duration-300">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="code"
            size="sm"
            onClick={handleCopy}
            className="shrink-0"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copiado!" : "Copiar"}
          </Button>
          <Button 
            variant="code" 
            size="sm" 
            className="shrink-0"
            onClick={handleRun}
            disabled={running}
          >
            <Play className="w-4 h-4" />
            {running ? "Executando..." : "Executar"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-background/80 to-muted/20 rounded-lg p-6 border border-border/50 font-mono text-sm overflow-x-auto">
          
          {/* ⬇️ ESTA É A MUDANÇA QUE IMPORTA ⬇️ */}
          <pre className="text-tech-cyan whitespace-pre-wrap break-all">
            {/* 'whitespace-pre-wrap' (para as letras voltarem) + 'break-all' (para o layout não quebrar) */}
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeExample;