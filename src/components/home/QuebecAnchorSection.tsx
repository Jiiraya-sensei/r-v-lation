import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import chateauImg from "@/assets/chateau-frontenac.jpg";

const QuebecAnchorSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[420px] overflow-hidden">
      <img
        src={chateauImg}
        alt={t("alt.chateau")}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/60 to-black-deep/30" />
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-accent italic text-gold-light text-lg md:text-xl mb-2"
        >
          {t("quebecAnchor.tagline")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-5xl text-gold-gradient tracking-wider"
        >
          {t("quebecAnchor.title")}
        </motion.h2>
      </div>
    </section>
  );
};

export default QuebecAnchorSection;
