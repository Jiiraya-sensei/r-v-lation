import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/i18n";
import { AuthProvider } from "@/hooks/useAuth";

const SITE_URL = "https://revelationspectacle.ca";

type Lang = "fr" | "en";
type RouteMeta = { title: string; description: string };

const SITE_META: Record<Lang, RouteMeta> = {
  fr: {
    title: "RÉVÉLATION | Gala de talents — Cégep Limoilou",
    description:
      "Gala de talents étudiant du Cégep Limoilou. Auditions, demi-finale et grande finale à Québec, automne 2026.",
  },
  en: {
    title: "RÉVÉLATION | Student Talent Gala — Québec",
    description:
      "Cégep Limoilou's student talent gala. Auditions, semifinal and grand finale in Québec City — Fall 2026.",
  },
};

const ROUTE_META: Record<string, Record<Lang, RouteMeta>> = {
  "/": {
    fr: SITE_META.fr,
    en: SITE_META.en,
  },
  "/auditionner": {
    fr: {
      title: "Auditionner — RÉVÉLATION",
      description: "Soumets ta pré-audition vidéo pour RÉVÉLATION, le gala de talents du Cégep Limoilou.",
    },
    en: {
      title: "Audition — RÉVÉLATION",
      description: "Submit your video pre-audition for RÉVÉLATION, Cégep Limoilou's student talent gala.",
    },
  },
  "/billetterie": {
    fr: {
      title: "Billetterie — RÉVÉLATION",
      description: "Réserve tes billets pour la demi-finale et la grande finale de RÉVÉLATION à Québec, automne 2026.",
    },
    en: {
      title: "Tickets — RÉVÉLATION",
      description: "Book your tickets for the RÉVÉLATION semifinal and grand finale in Québec City, Fall 2026.",
    },
  },
  "/a-propos": {
    fr: {
      title: "À propos — RÉVÉLATION",
      description: "Découvre la mission, l'équipe et la vision derrière RÉVÉLATION, le gala de talents du Cégep Limoilou.",
    },
    en: {
      title: "About — RÉVÉLATION",
      description: "Discover the mission, team and vision behind RÉVÉLATION, Cégep Limoilou's talent gala.",
    },
  },
  "/jury": {
    fr: {
      title: "Le jury — RÉVÉLATION",
      description: "Rencontre les professionnels qui composent le jury de RÉVÉLATION, automne 2026 à Québec.",
    },
    en: {
      title: "The Jury — RÉVÉLATION",
      description: "Meet the professionals on the RÉVÉLATION jury, Fall 2026 in Québec City.",
    },
  },
  "/faq": {
    fr: {
      title: "FAQ — RÉVÉLATION",
      description: "Questions fréquentes sur les auditions, billets, jury et règlements de RÉVÉLATION.",
    },
    en: {
      title: "FAQ — RÉVÉLATION",
      description: "Frequently asked questions about RÉVÉLATION auditions, tickets, jury and rules.",
    },
  },
  "/bourses": {
    fr: {
      title: "Bourses & prix — RÉVÉLATION",
      description: "Bourses et prix offerts aux finalistes et au grand gagnant de RÉVÉLATION, automne 2026.",
    },
    en: {
      title: "Scholarships & Prizes — RÉVÉLATION",
      description: "Scholarships and prizes awarded to RÉVÉLATION finalists and grand winner, Fall 2026.",
    },
  },
  "/connexion": {
    fr: {
      title: "Connexion — RÉVÉLATION",
      description: "Connecte-toi à ton compte RÉVÉLATION pour suivre ta candidature et tes billets.",
    },
    en: {
      title: "Log in — RÉVÉLATION",
      description: "Log in to your RÉVÉLATION account to track your application and tickets.",
    },
  },
  "/inscription": {
    fr: {
      title: "Inscription — RÉVÉLATION",
      description: "Crée ton compte RÉVÉLATION pour auditionner et accéder à ta billetterie.",
    },
    en: {
      title: "Sign up — RÉVÉLATION",
      description: "Create your RÉVÉLATION account to audition and manage your tickets.",
    },
  },
  "/conditions-generales": {
    fr: {
      title: "Conditions générales — RÉVÉLATION",
      description: "Conditions générales d'utilisation du site et de participation à RÉVÉLATION.",
    },
    en: {
      title: "Terms & Conditions — RÉVÉLATION",
      description: "Terms of use of the site and conditions of participation in RÉVÉLATION.",
    },
  },
  "/confidentialite": {
    fr: {
      title: "Politique de confidentialité — RÉVÉLATION",
      description: "Comment RÉVÉLATION collecte, utilise et protège tes renseignements personnels.",
    },
    en: {
      title: "Privacy Policy — RÉVÉLATION",
      description: "How RÉVÉLATION collects, uses and protects your personal information.",
    },
  },
  "/utilisation-videos": {
    fr: {
      title: "Utilisation des vidéos — RÉVÉLATION",
      description: "Politique sur l'utilisation, la diffusion et la conservation des vidéos d'audition.",
    },
    en: {
      title: "Video Use Policy — RÉVÉLATION",
      description: "Policy on the use, broadcast and retention of audition videos for RÉVÉLATION.",
    },
  },
};

const DocumentLang = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => {
    const lang: Lang = i18n.language?.startsWith("en") ? "en" : "fr";
    const routeMeta = ROUTE_META[pathname]?.[lang] ?? SITE_META[lang];
    document.documentElement.lang = lang;
    document.title = routeMeta.title;

    const setMeta = (selector: string, value: string) => {
      const el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.content = value;
    };
    setMeta('meta[name="description"]', routeMeta.description);
    setMeta('meta[property="og:title"]', routeMeta.title);
    setMeta('meta[property="og:description"]', routeMeta.description);
    setMeta('meta[name="twitter:title"]', routeMeta.title);
    setMeta('meta[name="twitter:description"]', routeMeta.description);

    const canonicalHref = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    let ogUrl = document.head.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalHref;
  }, [i18n.language, pathname]);
  return null;
};


import Index from "@/pages/Index"; // landing eager (LCP)
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Route-level code-splitting: every other page loads on demand.
const NotFound = lazy(() => import("@/pages/NotFound"));
const AuditionPage = lazy(() => import("@/pages/AuditionPage"));
const TicketsPage = lazy(() => import("@/pages/TicketsPage"));
const CheckoutReturn = lazy(() => import("@/pages/CheckoutReturn"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
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
        <AuthProvider>
          <DocumentLang />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auditionner" element={<AuditionPage />} />
              <Route path="/billetterie" element={<TicketsPage />} />
              <Route path="/billetterie/confirmation" element={<CheckoutReturn />} />
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
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
