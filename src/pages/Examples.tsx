import { useTranslation } from "react-i18next";
import CodeExample from "../components/CodeExample";
import CircuitVisualization from "../components/CircuitVisualization";

const codeExamples = [
  {
    title: "Contador Simples",
    description: "Um contador binário de 4 bits com reset assíncrono",
    code: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity contador is
    Port ( clk : in STD_LOGIC;
           reset : in STD_LOGIC;
           count : out STD_LOGIC_VECTOR(3 downto 0));
end contador;

architecture Behavioral of contador is
    signal counter : unsigned(3 downto 0) := "0000";
begin
    process(clk, reset)
    begin
        if reset = '1' then
            counter <= "0000";
        elsif rising_edge(clk) then
            counter <= counter + 1;
        end if;
    end process;
    
    count <= std_logic_vector(counter);
end Behavioral;`
  },
  {
    title: "Flip-Flop D com Enable",
    description: "Implementação de um flip-flop tipo D com sinal de enable",
    code: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity flipflop_d is
    Port ( clk : in STD_LOGIC;
           reset : in STD_LOGIC;
           enable : in STD_LOGIC;
           d : in STD_LOGIC;
           q : out STD_LOGIC);
end flipflop_d;

architecture Behavioral of flipflop_d is
begin
    process(clk, reset)
    begin
        if reset = '1' then
            q <= '0';
        elsif rising_edge(clk) then
            if enable = '1' then
                q <= d;
            end if;
        end if;
    end process;
end Behavioral;`
  }
];

const Examples = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="pt-24 pb-12 px-6 text-center bg-muted/20">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tech-cyan to-tech-green bg-clip-text text-transparent">
          {t('nav.examples')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Analise exemplos de código VHDL e veja simulações de circuitos interativos.
        </p>
      </div>

      <section id="code-examples-page" className="py-20 px-6">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-tech-cyan to-tech-green bg-clip-text text-transparent">
              {t('learning.examples.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('learning.examples.subtitle')}
            </p>
          </div>

          <div className="space-y-16">
            {codeExamples.map((example, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* ✅ Agora ficam sempre lado a lado */}
                <div className="grid grid-cols-2 gap-8 items-start">
                  <CodeExample {...example} />
                  <CircuitVisualization
                    type={index === 0 ? "counter" : "flipflop"}
                    title={example.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Examples;