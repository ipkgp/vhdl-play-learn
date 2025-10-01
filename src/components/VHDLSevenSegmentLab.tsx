import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Play, AlertCircle, CheckCircle } from "lucide-react";

const VHDLSevenSegmentLab = () => {
  const initialCode = `-- Decodificador BCD para Display de 7 Segmentos
-- Complete o mapeamento abaixo para os números 0-9
-- Formato: entrada => "abcdefg" (1=aceso, 0=apagado)

architecture behavioral of bcd_7seg is
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
      when "0111" => segmentos <= "1110000"; -- 7
      when "1000" => segmentos <= "1111111"; -- 8
      when "1001" => segmentos <= "1111011"; -- 9
      when others => segmentos <= "0000000"; -- apagado
    end case;
  end process;
end behavioral;`;

  const [code, setCode] = useState(initialCode);
  const [inputNumber, setInputNumber] = useState(0);
  const [segments, setSegments] = useState<string>("1111110");
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [mappingTable, setMappingTable] = useState<Record<string, string>>({});

  const parseVHDLCode = (vhdlCode: string): boolean => {
    try {
      const mapping: Record<string, string> = {};
      
      // Regex para capturar padrões: when "XXXX" => segmentos <= "YYYYYYY"
      const regex = /when\s+"(\d{4})"\s*=>\s*segmentos\s*<=\s*"(\d{7})"/gi;
      let match;
      
      while ((match = regex.exec(vhdlCode)) !== null) {
        const binaryInput = match[1];
        const segmentPattern = match[2];
        
        // Converte entrada binária para decimal
        const decimalValue = parseInt(binaryInput, 2);
        
        if (decimalValue >= 0 && decimalValue <= 9) {
          mapping[decimalValue.toString()] = segmentPattern;
        }
      }
      
      // Verifica se temos mapeamento para 0-9
      const hasAllNumbers = Array.from({ length: 10 }, (_, i) => i.toString())
        .every(num => mapping[num]);
      
      if (!hasAllNumbers) {
        setFeedback({
          type: "error",
          message: "Erro: Mapeamento incompleto. Certifique-se de definir os padrões para todos os números de 0 a 9."
        });
        return false;
      }
      
      setMappingTable(mapping);
      setFeedback({
        type: "success",
        message: "✅ Código analisado com sucesso! Mapeamento extraído. Teste diferentes números no controle de entrada."
      });
      
      // Atualiza o display com o número atual
      setSegments(mapping[inputNumber.toString()] || "0000000");
      
      return true;
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erro ao analisar o código VHDL. Verifique a sintaxe do seu mapeamento."
      });
      return false;
    }
  };

  const handleSimulate = () => {
    parseVHDLCode(code);
  };

  const handleInputChange = (value: number) => {
    if (value >= 0 && value <= 9) {
      setInputNumber(value);
      
      // Atualiza o display se já temos o mapeamento
      if (mappingTable[value.toString()]) {
        setSegments(mappingTable[value.toString()]);
      }
    }
  };

  const renderSevenSegment = () => {
    const segmentArray = segments.split('').map(s => s === '1');
    
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative w-48 h-64">
          {/* Segment a (top) */}
          <div
            className={`absolute top-2 left-12 w-24 h-4 transition-all duration-300 ${
              segmentArray[0] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
          />
          
          {/* Segment b (top right) */}
          <div
            className={`absolute top-6 right-8 w-4 h-24 transition-all duration-300 ${
              segmentArray[1] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)' }}
          />
          
          {/* Segment c (bottom right) */}
          <div
            className={`absolute bottom-6 right-8 w-4 h-24 transition-all duration-300 ${
              segmentArray[2] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)' }}
          />
          
          {/* Segment d (bottom) */}
          <div
            className={`absolute bottom-2 left-12 w-24 h-4 transition-all duration-300 ${
              segmentArray[3] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}
          />
          
          {/* Segment e (bottom left) */}
          <div
            className={`absolute bottom-6 left-8 w-4 h-24 transition-all duration-300 ${
              segmentArray[4] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)' }}
          />
          
          {/* Segment f (top left) */}
          <div
            className={`absolute top-6 left-8 w-4 h-24 transition-all duration-300 ${
              segmentArray[5] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)' }}
          />
          
          {/* Segment g (middle) */}
          <div
            className={`absolute top-1/2 left-12 -translate-y-1/2 w-24 h-4 transition-all duration-300 ${
              segmentArray[6] ? 'bg-tech-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]' : 'bg-muted/20'
            }`}
            style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)' }}
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Entrada Decimal</p>
          <div className="flex items-center gap-4 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInputChange(Math.max(0, inputNumber - 1))}
              disabled={inputNumber === 0}
            >
              -
            </Button>
            <Input
              type="number"
              min="0"
              max="9"
              value={inputNumber}
              onChange={(e) => handleInputChange(parseInt(e.target.value) || 0)}
              className="w-20 text-center text-2xl font-bold"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInputChange(Math.min(9, inputNumber + 1))}
              disabled={inputNumber === 9}
            >
              +
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Binário: {inputNumber.toString(2).padStart(4, '0')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-tech-cyan via-tech-purple to-tech-pink bg-clip-text text-transparent">
          Laboratório Interativo VHDL
        </h2>
        <p className="text-muted-foreground">
          Aprenda a programar um decodificador BCD para display de 7 segmentos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Seção de Edição de Código */}
        <Card className="bg-card/50 backdrop-blur-sm border-tech-purple/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-tech-cyan">📝</span>
              Editor de Código VHDL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm min-h-[400px] bg-background/80"
              placeholder="Digite seu código VHDL aqui..."
            />
            
            <Button
              onClick={handleSimulate}
              className="w-full"
              variant="default"
            >
              <Play className="w-4 h-4 mr-2" />
              Simular Código
            </Button>
            
            {feedback && (
              <div
                className={`flex items-start gap-2 p-4 rounded-lg border ${
                  feedback.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                    : feedback.type === "error"
                    ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <p className="text-sm">{feedback.message}</p>
              </div>
            )}
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">💡 Instruções:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Complete o código VHDL acima com os padrões de segmentos</li>
                <li>Cada padrão é uma string de 7 bits: "abcdefg"</li>
                <li>1 = segmento aceso, 0 = segmento apagado</li>
                <li>Clique em "Simular Código" para testar sua implementação</li>
                <li>Use o controle à direita para ver os números no display</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Simulação Visual */}
        <Card className="bg-card/50 backdrop-blur-sm border-tech-cyan/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-tech-purple">🔢</span>
              Display de 7 Segmentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderSevenSegment()}
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
              <p className="font-semibold text-foreground">Mapeamento de Segmentos:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>a = segmento superior</div>
                <div>b = superior direito</div>
                <div>c = inferior direito</div>
                <div>d = segmento inferior</div>
                <div>e = inferior esquerdo</div>
                <div>f = superior esquerdo</div>
                <div>g = segmento central</div>
              </div>
              <div className="mt-3 p-2 bg-background/80 rounded font-mono text-xs">
                Padrão Atual: {segments}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VHDLSevenSegmentLab;