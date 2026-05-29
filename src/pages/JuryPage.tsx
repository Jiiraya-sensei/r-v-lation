import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";
import VideoBackground from "@/components/VideoBackground";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const content = {
  fr: {
    eyebrow: "Les juges de RÉVÉLATION",
    title: "Ils vous évalueront.",
    titleItalic: "Vous ne les connaissez pas encore.",
    intro:
      "Trois personnalités du monde artistique, culturel et créatif québécois. Trois regards exigeants, bienveillants et professionnels. Leurs identités seront révélées le soir de la grande finale.",
    mysteryLabel: "Identité secrète",
    hoverHint: "Identité gardée secrète jusqu'au 22 octobre",
    profiles: [
      {
        title: "L'œil de l'industrie",
        desc: "Un professionnel établi du spectacle au Québec. Il ou elle sait exactement ce que ça prend pour percer.",
      },
      {
        title: "L'artiste accompli·e",
        desc: "Quelqu'un qui a foulé ces mêmes scènes, ressenti ce même trac, et transformé tout ça en carrière.",
      },
      {
        title: "La voix du public",
        desc: "Une personnalité qui incarne ce que le grand public ressent face à la performance. Authentique, direct·e, émotif·ve.",
      },
    ],
    criteria: {
      title: "Les critères d'évaluation",
      items: [
        { label: "Prestation scénique", pct: 30 },
        { label: "Technique artistique", pct: 25 },
        { label: "Originalité & créativité", pct: 25 },
        { label: "Impact émotionnel", pct: 20 },
      ],
    },
    reveal: {
      title: "La révélation, le 22 octobre.",
      desc: "Ce soir-là, tout sera dévoilé. Les jurés. Le Grand Prix. Les lauréats.",
      cta: "Réserver ma place",
    },
  },
  en: {
    eyebrow: "RÉVÉLATION's judges",
    title: "They will judge you.",
    titleItalic: "You don't know them yet.",
    intro:
      "Three personalities from Quebec's artistic, cultural and creative world. Three demanding, caring, professional eyes. Their identities will be revealed on the night of the grand finale.",
    mysteryLabel: "Secret identity",
    hoverHint: "Identity kept secret until October 22",
    profiles: [
      {
        title: "The industry eye",
        desc: "An established professional in Quebec's entertainment industry. They know exactly what it takes to break through.",
      },
      {
        title: "The accomplished artist",
        desc: "Someone who has walked these same stages, felt that same stage fright, and turned it all into a career.",
      },
      {
        title: "The voice of the public",
        desc: "A personality who embodies what the general public feels facing a live performance. Authentic, direct, emotional.",
      },
    ],
    criteria: {
      title: "Evaluation criteria",
      items: [
        { label: "Stage performance", pct: 30 },
        { label: "Artistic technique", pct: 25 },
        { label: "Originality & creativity", pct: 25 },
        { label: "Emotional impact", pct: 20 },
      ],
    },
    reveal: {
      title: "The revelation on October 22.",
      desc: "That night, everything will be unveiled. The judges. The Grand Prize. The winners.",
      cta: "Reserve my seat",
    },
  },
};

// Silhouette masquée interactive
const MaskedSilhouette = ({
  index,
  hoverHint,
}: {
  index: number;
  hoverHint: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const tints = [
    "from-ruby-deep/40 to-black-deep",
    "from-black-warm to-ruby-deep/30",
    "from-ruby-deep/30 to-black-warm",
  ];

  return (
    <motion.div
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-b border border-gold-royal/20"
      style={{ backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-stops))` }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${tints[index]} opacity-60`} />

      {/* SVG silhouette floue */}
      <svg
        viewBox="0 0 200 280"
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id={`blur${index}`}>
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {/* Tête floutée */}
        <circle cx="100" cy="50" r="35" fill="currentColor" filter={`url(#blur${index})`} className="text-cream/20" />
        {/* Corps flouté */}
        <path
          d="M60 95 Q100 80 140 95 L150 270 Q100 275 50 270 Z"
          fill="currentColor"
          filter={`url(#blur${index})`}
          className="text-cream/15"
        />
        {/* Vignette */}
        <rect width="200" height="280" fill="url(#vignette)" />
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="40%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>

      {/* Icône masque vénitien centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lock size={40} className="text-gold-royal/60" />
        </motion.div>
      </div>

      {/* Overlay au hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black-deep/70 flex items-center justify-center px-4"
          >
            <p className="text-gold-royal font-display text-sm text-center">
              {hoverHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const JuryPage = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("fr") ? "fr" : "en") as "fr" | "en";
  const c = content[lang];

  return (
    <Layout>
      {/* HERO VIDÉO PLEIN ÉCRAN */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-black-deep">
        <VideoBackground
          src="/videos/jury-stage.mp4"
          poster="/videos/jury-stage-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Voile pour lisibilité + transition vers la section suivante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/40 via-transparent to-black-deep" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black-deep to-transparent" />

        {/* Indicateur de défilement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-gold-royal/80 font-display text-xs tracking-[0.3em] uppercase">
            {lang === "fr" ? "Découvrir" : "Discover"}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-gold-royal to-transparent"
          />
        </motion.div>
      </section>

      {/* HERO THÉÂTRAL */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black-deep">

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black-deep">
        <VideoBackground
          src="/videos/jury-stage.mp4"
          poster="/videos/jury-stage-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/70 via-black-deep/60 to-black-deep" />
        <GoldParticles className="opacity-30" />

        {/* Rideaux latéraux */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-ruby-deep/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-ruby-deep/30 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Sparkles size={18} className="text-gold-royal" />
              <span className="text-gold-royal font-display text-sm tracking-[0.3em] uppercase">
                {c.eyebrow}
              </span>
              <Sparkles size={18} className="text-gold-royal" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl text-cream mb-4"
            >
              {c.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-display text-2xl md:text-3xl text-gold-royal italic mb-8"
            >
              {c.titleItalic}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {c.intro}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SILHOUETTES MYSTÈRE */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {c.profiles.map((profile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <MaskedSilhouette
                  index={i}
                  hoverHint={c.hoverHint}
                />
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1.5 text-gold-royal/70 text-xs uppercase tracking-wider mb-2">
                    <Lock size={12} />
                    <span>{c.mysteryLabel}</span>
                  </div>
                  <h3 className="font-display text-gold-royal text-lg mb-2">
                    {profile.title}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {profile.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRITÈRES */}
      <section className="py-20 bg-black-deep border-y border-gold-royal/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-gold-royal mb-12 text-center"
          >
            {c.criteria.title}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-6"
          >
            {c.criteria.items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-black-deep/50 border border-gold-royal/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cream font-medium">{item.label}</span>
                  <span className="text-gold-royal font-display text-lg">{item.pct} %</span>
                </div>
                <div className="h-2 bg-black-warm rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-royal to-gold-royal/70 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEASER FINALE */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-full bg-gold-royal/10 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles size={28} className="text-gold-royal" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl text-gold-royal mb-4"
            >
              {c.reveal.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-lg max-w-xl mx-auto mb-8"
            >
              {c.reveal.desc}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                to="/billetterie"
                className="inline-flex items-center justify-center bg-gold-royal text-black-deep font-semibold px-8 py-3 rounded-lg hover:bg-gold-royal/90 transition-colors"
              >
                {c.reveal.cta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default JuryPage;
