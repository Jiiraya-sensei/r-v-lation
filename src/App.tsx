import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/i18n";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AuditionPage from "@/pages/AuditionPage";
import TicketsPage from "@/pages/TicketsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AboutPage from "@/pages/AboutPage";
import JuryPage from "@/pages/JuryPage";
import FAQPage from "@/pages/FAQPage";
import BoursesPage from "@/pages/BoursesPage";
import LegalPage from "@/pages/LegalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auditionner" element={<AuditionPage />} />
          <Route path="/billetterie" element={<TicketsPage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/bourses" element={<BoursesPage />} />
          <Route path="/conditions-generales" element={<LegalPage type="terms" />} />
          <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
          <Route path="/utilisation-videos" element={<LegalPage type="video" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
