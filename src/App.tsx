import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom"; // <-- BrowserRouter foi removido daqui
import { ThemeProvider } from "next-themes";

// Importar páginas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learning from "./pages/Learning";
import Examples from "./pages/Examples";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";


import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       <TooltipProvider>
        <Toaster />
        <Sonner />

        
        <Header />

        
        <main>
          
          <Routes>
            <Route path="/" element={<Index />} />
            
            
            <Route path="/aprendizado" element={<Learning />} />
            <Route path="/exemplos" element={<Examples />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        
        <Footer />

     </TooltipProvider> 
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;