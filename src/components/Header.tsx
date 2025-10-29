import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/aprendizado", label: t("nav.learning") }, // <-- MUDOU
    { path: "/exemplos", label: t("nav.examples") }, // <-- MUDOU
    { path: "/recursos", label: t("nav.resources") }, // <-- MUDOU
    { path: "/sobre", label: t("nav.about") }, // <-- MUDOU
    { path: "/contato", label: t("nav.contact") }, // <-- MUDOU
  ];

  return (
   <header
     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent" 
      }`}
   >
     <div className="container mx-auto px-4">
       <div className="flex items-center justify-between h-16">
         {/* Logo */}
           <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
           VHDL Learn
           </Link>

         {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6"> 
            {navItems.map((item) => (
             <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === item.path
                    ? "text-tech-blue"
                    : "text-foreground/80 hover:text-foreground"
               }`}
               >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tech-blue transition-all group-hover:w-full" /> 
            </Link> 
           ))}
           </nav>

          {/* Theme Toggle, Language Selector & Mobile Menu */}
          <div className="flex items-center gap-3">
              {mounted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="gap-2"
               >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline">
                {theme === "dark" ? t("theme.light") : t("theme.dark")}
                </span>
             </Button>
           )}

               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="sm" className="gap-2">
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden sm:inline">{currentLanguage.name}</span>
               </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
                {languages.map((lang) => (
                 <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className="gap-2 cursor-pointer"
                   >   
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                 ))}
               </DropdownMenuContent>
                 </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
             {isMobileMenuOpen ? <X /> : <Menu />}
           </Button>
         </div>
       </div>

      {/* Mobile Navigation */}
       {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">  
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 px-4 text-sm font-medium rounded transition-colors ${
                 location.pathname === item.path
                   ? "text-tech-blue"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                 }`}
               >
               {item.label}
         </Link>
            ))}
          </nav>
       )}
       </div>
    </header>
  );
};

export default Header;
