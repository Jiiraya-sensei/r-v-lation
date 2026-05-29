import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/i18n";

const META = {
  fr: {
    title: "RÉVÉLATION | Là où les talents prennent leur envol — Québec",
    description:
      "RÉVÉLATION, le premier gala de talents étudiant du Cégep Limoilou. Auditions, demi-finale et grande finale à Québec — Automne 2026.",
  },
  en: {
    title: "RÉVÉLATION | Where talent takes flight — Québec",
    description:
      "RÉVÉLATION, Cégep Limoilou's first student talent gala. Auditions, semifinal and grand finale in Québec City — Fall 2026.",
  },
} as const;

const DocumentLang = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = (i18n.language?.startsWith("en") ? "en" : "fr") as "fr" | "en";
    const meta = META[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    const setMeta = (selector: string, value: string) => {
      const el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.content = value;
    };
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
  }, [i18n.language]);
  return null;
};

import Index from "@/pages/Index"; // landing eager (LCP)

// Route-level code-splitting: every other page loads on demand.
const NotFound = lazy(() => import("@/pages/NotFound"));
const AuditionPage = lazy(() => import("@/pages/AuditionPage"));
const TicketsPage = lazy(() => import("@/pages/TicketsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const JuryPage = lazy(() => import("@/pages/JuryPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const BoursesPage = lazy(() => import("@/pages/BoursesPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000, refetchOnWindowFocus: false },
  },
});

const RouteFallback = () => (
  <div className="min-h-screen bg-black-deep" aria-hidden="true" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auditionner" element={<AuditionPage />} />
            <Route path="/billetterie" element={<TicketsPage />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/jury" element={<JuryPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/bourses" element={<BoursesPage />} />
            <Route path="/conditions-generales" element={<LegalPage type="terms" />} />
            <Route path="/confidentialite" element={<LegalPage type="privacy" />} />
            <Route path="/utilisation-videos" element={<LegalPage type="video" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
