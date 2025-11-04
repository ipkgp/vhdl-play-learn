import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  example?: string;
  color?: "purple" | "blue" | "cyan" | "green";
  pdfLink?: string;
}

export default function ConceptCard(props: ConceptCardProps) {
  const { title, description, icon, example, color, pdfLink } = props;

  const buttonColorClasses = {
    purple: "bg-tech-purple text-white hover:bg-tech-purple",
    blue:   "bg-tech-blue text-white hover:bg-tech-blue",
    cyan:   "bg-tech-cyan text-neutral hover:bg-tech-cyan",
    green:  "bg-tech-green text-white hover:bg-tech-green"
  };

  const colorClasses = {
    purple: "border-tech-purple/30 hover:border-tech-purple/60 hover:shadow-tech-purple/20",
    blue: "border-tech-blue/30 hover:border-tech-blue/60 hover:shadow-tech-blue/20",
    cyan: "border-tech-cyan/30 hover:border-tech-cyan/60 hover:shadow-tech-cyan/20",
    green: "border-tech-green/30 hover:border-tech-green/60 hover:shadow-tech-green/20"
  };

  const iconColors = {
    purple: "text-tech-purple",
    blue: "text-tech-blue", 
    cyan: "text-tech-cyan",
    green: "text-tech-green"
  };
  
  return (
    <div className="card">
        <Card className={`transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-card/50 backdrop-blur-sm border-2 ${colorClasses[color]} group`}>
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color === 'purple' ? 'tech-purple' : color === 'blue' ? 'tech-blue' : color === 'cyan' ? 'tech-cyan' : 'tech-green'}/20 to-${color === 'purple' ? 'tech-purple' : color === 'blue' ? 'tech-blue' : color === 'cyan' ? 'tech-cyan' : 'tech-green'}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <div className={iconColors[color]}>
              {icon}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          {example && (
            <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg p-4 border border-border/50">
              <code className="text-sm text-tech-cyan font-mono">{example}</code>
            </div>
          )}
          {pdfLink && (
            <div className="px-6 py-0 -mx-0 -mb-10 mt-0">
              <Button
                asChild
                className={`w-full font-semibold ${buttonColorClasses[color]}`}
              ><a href={pdfLink} target="_blank" rel="noopener noreferrer">
                  Saiba mais...
                </a></Button>
            </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}