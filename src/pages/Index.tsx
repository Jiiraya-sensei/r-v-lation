import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection"; // eager for LCP

// Below-the-fold: code-split each section so initial JS stays minimal.
const ShowSection = lazy(() => import("@/components/home/ShowSection"));
const AuditionCallSection = lazy(() => import("@/components/home/AuditionCallSection"));
const TicketingSection = lazy(() => import("@/components/home/TicketingSection"));
const JurySection = lazy(() => import("@/components/home/JurySection"));
const ScholarshipsSection = lazy(() => import("@/components/home/ScholarshipsSection"));
const FinalCallSection = lazy(() => import("@/components/home/FinalCallSection"));
const QuebecAnchorSection = lazy(() => import("@/components/home/QuebecAnchorSection"));

const SectionFallback = () => <div className="min-h-[300px]" aria-hidden="true" />;

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <ShowSection />
        <AuditionCallSection />
        <TicketingSection />
        <JurySection />
        <QuebecAnchorSection />
        <ScholarshipsSection />
        <FinalCallSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
