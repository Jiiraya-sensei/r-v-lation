import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ShowSection from "@/components/home/ShowSection";
import AuditionCallSection from "@/components/home/AuditionCallSection";
import TicketingSection from "@/components/home/TicketingSection";
import JurySection from "@/components/home/JurySection";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";
import FinalCallSection from "@/components/home/FinalCallSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ShowSection />
      <AuditionCallSection />
      <TicketingSection />
      <JurySection />
      <ScholarshipsSection />
      <FinalCallSection />
    </Layout>
  );
};

export default Index;
