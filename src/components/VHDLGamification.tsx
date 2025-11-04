import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award, Zap, Target, BookOpen, Code, Cpu } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: string;
  points: number;
  color: string;
}

const badges: Badge[] = [
  {
    id: "first-steps",
    title: "Primeiros Passos",
    description: "Complete seu primeiro exercício básico",
    icon: <Star className="w-8 h-8" />,
    requirement: "Complete 1 exercício básico",
    points: 10,
    color: "text-yellow-500",
  },
  {
    id: "logic-master",
    title: "Mestre da Lógica",
    description: "Domine todas as portas lógicas básicas",
    icon: <Zap className="w-8 h-8" />,
    requirement: "Complete todos exercícios de portas lógicas",
    points: 25,
    color: "text-blue-500",
  },
  {
    id: "quiz-champion",
    title: "Campeão do Quiz",
    description: "Acerte 90% ou mais no quiz",
    icon: <Trophy className="w-8 h-8" />,
    requirement: "Acerte 9/10 questões do quiz",
    points: 50,
    color: "text-primary",
  },
  {
    id: "arithmetic-expert",
    title: "Expert em Aritmética",
    description: "Complete todos os exercícios de somadores",
    icon: <Target className="w-8 h-8" />,
    requirement: "Complete Half Adder e Full Adder",
    points: 40,
    color: "text-green-500",
  },
  {
    id: "sequential-wizard",
    title: "Mago Sequencial",
    description: "Domine lógica sequencial e contadores",
    icon: <Cpu className="w-8 h-8" />,
    requirement: "Complete o exercício do contador",
    points: 60,
    color: "text-purple-500",
  },
  {
    id: "display-decoder",
    title: "Decodificador de Display",
    description: "Crie o decodificador BCD para 7 segmentos",
    icon: <Code className="w-8 h-8" />,
    requirement: "Complete o tutorial de 7 segmentos",
    points: 75,
    color: "text-orange-500",
  },
  {
    id: "knowledge-seeker",
    title: "Buscador de Conhecimento",
    description: "Consulte o glossário 10 vezes",
    icon: <BookOpen className="w-8 h-8" />,
    requirement: "Explore 10 termos do glossário",
    points: 20,
    color: "text-cyan-500",
  },
  {
    id: "vhdl-master",
    title: "Mestre VHDL",
    description: "Complete TODOS os exercícios disponíveis",
    icon: <Award className="w-8 h-8" />,
    requirement: "100% de conclusão",
    points: 150,
    color: "text-amber-500",
  },
];

const VHDLGamification = () => {
  const { t } = useTranslation();
  
  // Em uma implementação real, esses valores viriam de um contexto/estado global
  const userProgress = {
    basicExercises: 2,
    intermediateExercises: 1,
    quizScore: 7,
    displayCompleted: false,
    glossaryVisits: 5,
    totalPoints: 95,
  };

  const totalPossiblePoints = badges.reduce((sum, badge) => sum + badge.points, 0);
  const progressPercentage = (userProgress.totalPoints / totalPossiblePoints) * 100;

  // Lógica para determinar quais badges foram conquistadas
  const isBadgeEarned = (badgeId: string): boolean => {
    switch (badgeId) {
      case "first-steps":
        return userProgress.basicExercises >= 1;
      case "logic-master":
        return userProgress.basicExercises >= 4;
      case "quiz-champion":
        return userProgress.quizScore >= 9;
      case "arithmetic-expert":
        return userProgress.intermediateExercises >= 2;
      case "sequential-wizard":
        return userProgress.intermediateExercises >= 4;
      case "display-decoder":
        return userProgress.displayCompleted;
      case "knowledge-seeker":
        return userProgress.glossaryVisits >= 10;
      case "vhdl-master":
        return (
          userProgress.basicExercises >= 4 &&
          userProgress.intermediateExercises >= 4 &&
          userProgress.quizScore >= 10 &&
          userProgress.displayCompleted
        );
      default:
        return false;
    }
  };

  const earnedBadges = badges.filter((badge) => isBadgeEarned(badge.id));
  const lockedBadges = badges.filter((badge) => !isBadgeEarned(badge.id));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('gamification.title')}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('gamification.subtitle')}
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">{t('gamification.overallProgress')}</CardTitle>
          <CardDescription>{t('gamification.continueMessage')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">{userProgress.totalPoints}</p>
              <p className="text-sm text-muted-foreground">{t('gamification.totalPoints', { total: totalPossiblePoints })}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{earnedBadges.length}</p>
              <p className="text-sm text-muted-foreground">{t('gamification.totalBadges', { total: badges.length })}</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-center text-sm text-muted-foreground">
            {progressPercentage.toFixed(0)}% {t('gamification.completed')}
          </p>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            {t('gamification.earnedBadges', { count: earnedBadges.length })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {earnedBadges.map((badge) => (
              <Card key={badge.id} className="border-primary/30 bg-primary/5 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={badge.color}>{badge.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{badge.title}</CardTitle>
                      <p className="text-sm text-primary font-semibold">+{badge.points} pts</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <Trophy className="w-3 h-3" />
                    {t('gamification.unlocked')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-muted-foreground" />
            {t('gamification.nextAchievements', { count: lockedBadges.length })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="border-muted opacity-60 relative flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground">{badge.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-muted-foreground">{badge.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">+{badge.points} pts</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <p className="font-semibold mb-1">{t('gamification.howToUnlock')}:</p>
                    <p>{badge.requirement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="pt-6 text-center">
          {earnedBadges.length === 0 && (
            <>
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('gamification.motivational.start.title')}</h3>
              <p className="text-muted-foreground">
                {t('gamification.motivational.start.message')}
              </p>
            </>
          )}
          {earnedBadges.length > 0 && earnedBadges.length < badges.length && (
            <>
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('gamification.motivational.progress.title')}</h3>
              <p className="text-muted-foreground">
                {t('gamification.motivational.progress.message', { total: badges.length })}
              </p>
            </>
          )}
          {earnedBadges.length === badges.length && (
            <>
              <Award className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">{t('gamification.motivational.master.title')}</h3>
              <p className="text-muted-foreground">
                {t('gamification.motivational.master.message')}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VHDLGamification;
