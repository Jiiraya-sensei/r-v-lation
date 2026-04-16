import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBackground from "@/components/VideoBackground";
import performerPoster from "@/assets/performer.jpg";

const AuditionCallSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 gradient-royal-inverse relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,97,0.08)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold-royal mb-6">
              {t("auditionCall.title")}
            </h2>
            <p className="text-cream/70 mb-4 leading-relaxed">{t("auditionCall.description")}</p>
            <p className="text-gold-light/80 text-sm mb-6 font-medium border-l-2 border-gold-royal/40 pl-4">
              {t("auditionCall.inPersonInfo")}
            </p>
            <Link
              to="/auditionner"
              className="inline-block gradient-gold text-black-deep font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity gold-glow"
            >
              {t("auditionCall.cta")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <VideoBackground
              src="/videos/audition-bg.mp4"
              poster={performerPoster}
              alt="Artiste en performance"
              className="rounded-lg w-full h-[450px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditionCallSection;
