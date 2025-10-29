import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {t("about.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-tech-blue/10">
                  <Target className="h-6 w-6 text-tech-blue" />
                </div>
                <CardTitle>{t("about.mission.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("about.mission.text")}</p>
            </CardContent>
          </Card>

          
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-tech-purple/10">
                  <Eye className="h-6 w-6 text-tech-purple" />
                </div>
                <CardTitle>{t("about.vision.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("about.vision.text")}</p>
            </CardContent>
          </Card>
        </div>

        
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-tech-cyan/10">
                <Heart className="h-6 w-6 text-tech-cyan" />
              </div>
              <CardTitle>{t("about.values.title")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.values(t("about.values.items", { returnObjects: true }) as Record<string, string>).map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-tech-green mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
