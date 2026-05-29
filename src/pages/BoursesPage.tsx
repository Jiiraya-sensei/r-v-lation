import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Star, Heart, Sparkles, Tv } from "lucide-react";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";
import VideoBackground from "@/components/VideoBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

const content = {
  fr: {
    eyebrow: "Ce que vous pouvez gagner",
    title: "Les récompenses",
    sub: "Trois prix. Trois reconnaissances. Une nuit pour tout changer.",
    prizes: [
      {
        icon: Trophy,
        name: "Grand Prix",
        amount: "1 000 $",
        desc: "Décerné par le jury au talent ayant offert la performance la plus remarquable de la soirée — tous critères confondus.",
        highlight: true,
        color: "from-gold-royal/30 to-ruby-deep/20",
        border: "border-gold-royal/60",
        glow: "gold-glow",
      },
      {
        icon: Star,
        name: "Prix d'originalité",
        amount: "300 $",
        desc: "Remis au participant ayant démontré la créativité la plus audacieuse et la vision artistique la plus singulière.",
        highlight: false,
        color: "from-black-warm to-ruby-deep/15",
        border: "border-gold-royal/30",
        glow: "",
      },
      {
        icon: Heart,
        name: "Coup de cœur du public",
        amount: "300 $",
        desc: "Élu par les spectateurs présents dans la salle. Le seul prix où c'est le public qui décide.",
        highlight: false,
        color: "from-ruby-deep/25 to-black-warm",
        border: "border-ruby-light/40",
        glow: "ruby-glow",
      },
    ],
    beyond: {
      title: "Au-delà des bourses",
      subtitle: "Gagner RÉVÉLATION, c'est bien plus qu'un chèque.",
      items: [
        {
          icon: Tv,
          label: "Visibilité médiatique",
          desc: "Diffusion en direct sur Twitch lors de la grande finale. Vos performances restent en ligne après l'événement.",
        },
        {
          icon: Star,
          label: "Reconnaissance institutionnelle",
          desc: "Une mention officielle au sein du Cégep Limoilou et dans les communications de l'événement.",
        },
        {
          icon: Sparkles,
          label: "Réseau professionnel",
          desc: "Accès aux partenaires et commanditaires de RÉVÉLATION — des portes qui s'ouvrent rarement à ce stade d'une carrière.",
        },
      ],
    },
    jury: {
      title: "Un jury qui compte",
      desc: "Vos performances seront évaluées par trois personnalités reconnues du milieu artistique québécois. Une occasion rare d'être vu par ceux qui font l'industrie.",
      cta: "Découvrir le jury mystère",
    },
    cta: {
      audition: "Je veux auditionner",
      tickets: "Voir les billets",
    },
  },
  en: {
    eyebrow: "What you can win",
    title: "The prizes",
    sub: "Three prizes. Three recognitions. One night to change everything.",
    prizes: [
      {
        icon: Trophy,
        name: "Grand Prix",
        amount: "$1,000",
        desc: "Awarded by the jury to the talent who delivered the most remarkable performance of the evening — across all criteria.",
        highlight: true,
        color: "from-gold-royal/30 to-ruby-deep/20",
        border: "border-gold-royal/60",
        glow: "gold-glow",
      },
      {
        icon: Star,
        name: "Originality Award",
        amount: "$300",
        desc: "Given to the participant who demonstrated the most daring creativity and the most singular artistic vision.",
        highlight: false,
        color: "from-black-warm to-ruby-deep/15",
        border: "border-gold-royal/30",
        glow: "",
      },
      {
        icon: Heart,
        name: "People's Choice Award",
        amount: "$300",
        desc: "Chosen by the spectators in the room. The only prize where the audience decides.",
        highlight: false,
        color: "from-ruby-deep/25 to-black-warm",
        border: "border-ruby-light/40",
        glow: "ruby-glow",
      },
    ],
    beyond: {
      title: "Beyond the scholarships",
      subtitle: "Winning RÉVÉLATION is so much more than a cheque.",
      items: [
        {
          icon: Tv,
          label: "Media visibility",
          desc: "Live streamed on Twitch during the grand finale. Your performances stay online after the event.",
        },
        {
          icon: Star,
          label: "Institutional recognition",
          desc: "An official mention within Cégep Limoilou and in the event's communications.",
        },
        {
          icon: Sparkles,
          label: "Professional network",
          desc: "Access to RÉVÉLATION's partners and sponsors — doors that rarely open at this stage of a career.",
        },
      ],
    },
    jury: {
      title: "A jury that matters",
      desc: "Your performances will be evaluated by three recognized personalities from Quebec's artistic world. A rare chance to be seen by those who shape the industry.",
      cta: "Discover the mystery jury",
    },
    cta: {
      audition: "I want to audition",
      tickets: "View tickets",
    },
  },
};

const BoursesPage = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("fr") ? "fr" : "en") as "fr" | "en";
  const c = content[lang];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black-deep">
        <VideoBackground
          src="/videos/celebration.mp4"
          poster="/videos/celebration-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/70 via-black-deep/50 to-black-deep" />
        <GoldParticles className="opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold-royal font-display text-sm tracking-[0.3em] uppercase mb-4"
          >
            {c.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-cream mb-6"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {c.sub}
          </motion.p>
        </div>
      </section>

      {/* CARDS PRIX */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.prizes.map((prize, i) => {
              const Icon = prize.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative bg-gradient-to-b ${prize.color} border ${prize.border} rounded-2xl p-8 text-center hover:border-gold-royal/60 transition-colors ${prize.highlight ? "md:-mt-4 md:mb-4" : ""}`}
                >
                  {/* Badge Grand Prix */}
                  {prize.highlight && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-royal text-black-deep text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {lang === "fr" ? "Prix principal" : "Main Prize"}
                    </motion.div>
                  )}

                  {/* Icône */}
                  <div className={`w-14 h-14 rounded-xl bg-gold-royal/10 flex items-center justify-center mx-auto mb-5 ${prize.highlight ? "bg-gold-royal/20" : ""}`}>
                    <Icon size={28} className="text-gold-royal" />
                  </div>

                  {/* Montant */}
                  <div className="font-display text-3xl md:text-4xl text-cream mb-2">
                    {prize.amount}
                  </div>

                  {/* Nom */}
                  <h3 className="font-display text-gold-royal text-lg mb-3">{prize.name}</h3>

                  {/* Séparateur */}
                  <div className="w-12 h-px bg-gold-royal/30 mx-auto mb-4" />

                  {/* Description */}
                  <p className="text-cream/60 text-sm leading-relaxed">{prize.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AU-DELÀ DES BOURSES */}
      <section className="py-20 bg-black-deep border-y border-gold-royal/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl text-gold-royal mb-4">
              {c.beyond.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-cream/60 text-lg">
              {c.beyond.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {c.beyond.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-black-deep/50 border border-gold-royal/10 rounded-xl p-6 text-center hover:border-gold-royal/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-royal/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-gold-royal" />
                  </div>
                  <h3 className="font-display text-cream text-base mb-2">{item.label}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ENCART JURY */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="bg-gradient-to-b from-gold-royal/5 to-transparent border border-gold-royal/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-full bg-gold-royal/10 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles size={28} className="text-gold-royal" />
            </motion.div>

            <motion.h3 variants={fadeUp} className="font-display text-2xl text-gold-royal mb-4">
              {c.jury.title}
            </motion.h3>

            <motion.p variants={fadeUp} className="text-cream/60 leading-relaxed mb-6">
              {c.jury.desc}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                to="/jury"
                className="inline-flex items-center justify-center border border-gold-royal/30 text-gold-royal font-semibold px-6 py-2.5 rounded-lg hover:bg-gold-royal/10 transition-colors text-sm"
              >
                {c.jury.cta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-black-deep border-t border-gold-royal/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/auditionner"
              className="inline-flex items-center justify-center bg-gold-royal text-black-deep font-semibold px-8 py-3 rounded-lg hover:bg-gold-royal/90 transition-colors"
            >
              {c.cta.audition}
            </Link>
            <Link
              to="/billetterie"
              className="inline-flex items-center justify-center border border-gold-royal/30 text-gold-royal font-semibold px-8 py-3 rounded-lg hover:bg-gold-royal/10 transition-colors"
            >
              {c.cta.tickets}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BoursesPage;
