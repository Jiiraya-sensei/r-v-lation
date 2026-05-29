import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EVENT_DATES } from "@/config/eventDates";
import GoldParticles from "@/components/GoldParticles";
import VideoBackground from "@/components/VideoBackground";
import heroPoster from "@/assets/hero-stage.jpg";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";

  const milestones = [
    { label: t("hero.auditions"), date: EVENT_DATES.auditions.dayLabel[lang], time: EVENT_DATES.auditions.time[lang], venue: EVENT_DATES.auditions.shortVenue[lang] },
    { label: t("hero.semifinal"), date: EVENT_DATES.semifinal.dayLabel[lang], time: EVENT_DATES.semifinal.time[lang], venue: EVENT_DATES.semifinal.shortVenue[lang] },
    { label: t("hero.finale"), date: EVENT_DATES.finale.dayLabel[lang], time: EVENT_DATES.finale.time[lang], venue: EVENT_DATES.finale.shortVenue[lang] },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <VideoBackground
          src="/videos/hero-bg.mp4"
          poster={heroPoster}
          alt={t("alt.heroStage")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/70 via-black-deep/50 to-black-deep" />
      </div>

      <GoldParticles />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[96px] text-gold-gradient tracking-[0.05em] sm:tracking-[0.1em] mb-4 break-words leading-tight"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-accent italic text-xl md:text-2xl text-cream/90 mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Date milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10"
        >
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              {i > 0 && <div className="hidden md:block w-12 h-px bg-gold-royal/40" />}
              <div className="text-center">
                <div className="text-gold-royal font-semibold text-sm tracking-wider mb-1">◆ {m.label}</div>
                <div className="text-cream/70 text-xs">{m.date}</div>
                <div className="text-cream/50 text-xs">{m.time} · {m.venue}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/auditionner"
            className="gradient-gold text-black-deep font-bold px-8 py-3 rounded-md text-lg hover:opacity-90 transition-opacity gold-glow"
          >
            {t("hero.ctaAudition")}
          </Link>
          <Link
            to="/billetterie"
            className="border-2 border-gold-royal text-gold-royal font-semibold px-8 py-3 rounded-md text-lg hover:bg-gold-royal/10 transition-colors"
          >
            {t("hero.ctaTicket")}
          </Link>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <ChevronDown className="mx-auto text-gold-royal/60 animate-bounce-subtle" size={32} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
