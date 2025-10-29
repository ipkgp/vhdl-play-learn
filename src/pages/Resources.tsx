import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Wrench, Users, ExternalLink } from "lucide-react";
import VHDLGlossary from "@/components/VHDLGlossary";
const Resources = () => {
  const { t } = useTranslation();

  const resourceCategories = [
    {
      icon: Book,
      title: t("resources.documentation.title"),
      color: "text-tech-blue",
      items: [
        { name: t("resources.documentation.items.ieee"), url: "https://edg.uchicago.edu/~tang/VHDLref.pdf" },
        { name: t("resources.documentation.items.tutorials"), url: "https://www2.pcs.usp.br/~labdig/material/VHDL-Quartus-Prime-16.1-v1.pdf" },
        { name: t("resources.documentation.items.examples"), url: "https://nandland.com/introduction-to-vhdl-for-beginners-with-code-examples/" },
      ],
    },
    {
      icon: Wrench,
      title: t("resources.tools.title"),
      color: "text-tech-purple",
      items: [
        { name: t("resources.tools.items.simulators"), url: "https://www.edaplayground.com/x/QDJp" },
        { name: t("resources.tools.items.ides"), url: "https://www.gnu.org/software/emacs/manual/html_mono/vhdl-mode.html" },
        { name: t("resources.tools.items.fpga"), url: "https://labsland.com/pt_BR/labs/fpga-llstd1" },
      ],
    },
    {
      icon: Users,
      title: t("resources.community.title"),
      color: "text-tech-cyan",
      items: [
        { name: t("resources.community.items.forums"), url: "https://www.edaboard.com/forums/vhdl.104/" },
        { name: t("resources.community.items.discord"), url: "#" },
        { name: t("resources.community.items.github"), url: "https://github.com/ipkgp/vhdl-play-learn.git" },
      ],
    },
  ];

  return (        
      <section id="resources" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {t("resources.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("resources.subtitle")}
          </p>
        </div>
        <section id="glossary" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 scroll-mt-16">
        <VHDLGlossary />
      </section>

        <div className="grid md:grid-cols-3 gap-6">
          {resourceCategories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
