import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBackground from "@/components/VideoBackground";
import audiencePoster from "@/assets/audience.jpg";

const TicketingSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-black-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,169,97,0.06)_0%,transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <VideoBackground
              src="/videos/ticket-bg.mp4"
              poster={audiencePoster}
              alt={t("alt.audience")}
              className="rounded-lg w-full h-[350px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold-royal mb-6">
              {t("ticketing.title")}
            </h2>
            <p className="text-cream/70 mb-6 leading-relaxed">{t("ticketing.description")}</p>

            <div className="gradient-gold rounded-lg p-6 mb-6">
              <div className="text-black-deep font-bold text-sm tracking-wider mb-1">{t("ticketing.presale")}</div>
              <div className="text-black-deep font-display text-4xl font-bold mb-1">{t("ticketing.price")}</div>
              <div className="text-black-deep/70 text-sm">{t("ticketing.limitedSeats")}</div>
            </div>

            <Link
              to="/billetterie"
              className="inline-block gradient-gold text-black-deep font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity gold-glow"
            >
              {t("ticketing.cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TicketingSection;
