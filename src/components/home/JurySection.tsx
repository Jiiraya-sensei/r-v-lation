import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const JurySection = () => {
  const { t } = useTranslation();

  const jurors = [
    { name: t("jury.comingSoon"), role: "" },
    { name: t("jury.comingSoon"), role: "" },
    { name: t("jury.comingSoon"), role: "" },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-display text-3xl md:text-4xl text-black-deep mb-12"
        >
          {t("jury.title")}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-12">
          {jurors.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-28 h-28 rounded-full bg-black-deep/10 flex items-center justify-center mx-auto mb-4 border-2 border-gold-royal/30">
                <User className="text-gold-royal/50" size={40} />
              </div>
              <p className="text-black-deep font-semibold">{j.name}</p>
              {j.role && <p className="text-black-deep/60 text-sm">{j.role}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;
