import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import GoldParticles from "@/components/GoldParticles";

const FinalCallSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate newsletter signup
    setEmail("");
  };

  return (
    <section className="py-24 bg-black-deep relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        aria-hidden="true"
      >
        <source src="/videos/final-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black-deep/80 via-black-deep/70 to-black-deep" />
      <GoldParticles />
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-accent italic text-2xl md:text-3xl text-cream/90 mb-10 leading-relaxed"
        >
          « {t("finalCall.quote")} »
        </motion.blockquote>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10"
        >
          <a
            href="https://www.instagram.com/revelationofficielle/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-royal hover:text-gold-light transition-colors"
          >
            <Instagram size={24} />
            <span className="font-semibold">@revelationofficielle</span>
          </a>
        </motion.div>

        {/* Newsletter */}
        <motion.form
          onSubmit={handleSubscribe}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("finalCall.emailPlaceholder")}
            required
            className="flex-1 bg-black-warm border border-gold-royal/30 text-cream px-4 py-3 rounded-md focus:outline-none focus:border-gold-royal placeholder:text-cream/30"
          />
          <button
            type="submit"
            className="gradient-gold text-black-deep font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            {t("finalCall.subscribe")}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default FinalCallSection;
