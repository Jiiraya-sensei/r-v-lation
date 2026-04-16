import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBackground from "@/components/VideoBackground";
import showPoster from "@/assets/show-stage.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ShowSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-black-deep">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <VideoBackground
              heavy
              src="/videos/show-1.mp4"
              poster={showPoster}
              alt="Scène en action"
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold-royal mb-6">
              {t("show.title")}
            </h2>
            <p className="text-cream/70 mb-4 leading-relaxed">{t("show.p1")}</p>
            <p className="text-cream/70 mb-4 leading-relaxed">{t("show.p2")}</p>
            <p className="text-cream/70 mb-6 leading-relaxed">{t("show.p3")}</p>
            <Link
              to="/a-propos"
              className="inline-block border border-gold-royal text-gold-royal font-semibold px-6 py-2.5 rounded-md hover:bg-gold-royal/10 transition-colors"
            >
              {t("show.cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowSection;
