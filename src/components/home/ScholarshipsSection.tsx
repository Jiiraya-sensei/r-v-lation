import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Heart } from "lucide-react";

const ScholarshipsSection = () => {
  const { t } = useTranslation();

  const prizes = [
    {
      icon: Sparkles,
      title: t("scholarships.originality"),
      amount: t("scholarships.originalityAmount"),
      desc: t("scholarships.originalityDesc"),
      borderColor: "border-gold-royal",
    },
    {
      icon: Trophy,
      title: t("scholarships.grandPrix"),
      amount: t("scholarships.grandPrixAmount"),
      desc: t("scholarships.grandPrixDesc"),
      borderColor: "border-ruby-deep",
      featured: true,
    },
    {
      icon: Heart,
      title: t("scholarships.audience"),
      amount: t("scholarships.audienceAmount"),
      desc: t("scholarships.audienceDesc"),
      borderColor: "border-gold-royal",
    },
  ];

  return (
    <section className="py-24 gradient-royal relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-display text-3xl md:text-4xl text-gold-royal text-center mb-14"
        >
          {t("scholarships.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {prizes.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15 }}
              className={`bg-black-deep/80 backdrop-blur border ${prize.borderColor} rounded-lg p-6 text-center ${
                prize.featured ? "md:-mt-4 md:mb-0 ruby-glow" : ""
              }`}
            >
              <prize.icon className="mx-auto text-gold-royal mb-4" size={32} />
              <div className="font-display text-3xl font-bold text-gold-royal mb-2">{prize.amount}</div>
              <h3 className="font-display text-lg text-cream mb-3">{prize.title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{prize.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
