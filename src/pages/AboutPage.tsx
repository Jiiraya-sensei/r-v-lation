import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, Users, Mic2, Building2, CalendarDays } from "lucide-react";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";
import { EVENT_DATES } from "@/config/eventDates";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const AboutPage = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("fr") ? "fr" : "en") as "fr" | "en";

  const content = {
    fr: {
      hero: {
        eyebrow: "Notre histoire",
        title: "Là où les rêves trouvent leur scène.",
        sub: "RÉVÉLATION est né d'une conviction simple : chaque étudiant du Cégep Limoilou mérite une scène professionnelle pour briller.",
      },
      story: {
        title: "L'origine du projet",
        p1: "Produit par Hans en partenariat avec le Cégep Limoilou, RÉVÉLATION est le premier gala de talents étudiant de l'institution. L'idée est née d'un constat : des dizaines d'artistes talentueux traversent ces couloirs chaque année sans jamais obtenir de véritable vitrine professionnelle.",
        p2: "En 2026, nous avons décidé de changer ça. En réunissant la rigueur d'une production télévisuelle, la chaleur d'une communauté collégiale et l'ambition d'un concours national, RÉVÉLATION donne aux étudiants bien plus qu'une scène — elle leur donne une chance.",
      },
      mission: {
        title: "Notre mission",
        text: "Révéler les talents cachés de la communauté étudiante du Cégep Limoilou, les propulser sur une scène professionnelle et les connecter aux opportunités qu'ils méritent.",
      },
      values: {
        title: "Nos valeurs",
        items: [
          { icon: Star, label: "Excellence", desc: "Chaque détail — lumière, son, mise en scène — est pensé pour mettre le talent en valeur." },
          { icon: Heart, label: "Bienveillance", desc: "Un environnement safe, inclusif et encourageant pour tous les participants." },
          { icon: Users, label: "Communauté", desc: "RÉVÉLATION unit étudiants, professeurs, public et partenaires autour de l'art." },
          { icon: Mic2, label: "Authenticité", desc: "On ne cherche pas la perfection technique, on cherche l'émotion vraie." },
        ],
      },
      format: {
        title: "Le format",
        steps: [
          { label: "Pré-audition vidéo", desc: "Soumission en ligne — réservée aux étudiants du Cégep Limoilou, peu importe le campus (Charlesbourg, Québec ou Des Arts)." },
          { label: "Auditions en personne", desc: `${EVENT_DATES.auditions.dayLabel.fr} · ${EVENT_DATES.auditions.time.fr} · Salle Montaigne, Campus Charlesbourg.` },
          { label: "Demi-finale", desc: `${EVENT_DATES.semifinal.dayLabel.fr} · ${EVENT_DATES.semifinal.time.fr} · Salle Sylvain-Lelièvre. Les meilleurs s'affrontent.` },
          { label: "Grande finale", desc: `${EVENT_DATES.finale.dayLabel.fr} · ${EVENT_DATES.finale.time.fr} · 677 spectateurs, jury professionnel, bourse de 1 000 $.` },
        ],
      },
      partners: {
        title: "Partenaires fondateurs",
        items: [
          { icon: Building2, name: "Cégep Limoilou", role: "Partenaire institutionnel" },
          { icon: Star, name: "Hans Productions", role: "Producteur exécutif" },
        ],
      },
      cta: {
        audition: "Je veux auditionner",
        jury: "Découvrir le jury",
      },
    },
    en: {
      hero: {
        eyebrow: "Our story",
        title: "Where dreams find their stage.",
        sub: "RÉVÉLATION was born from a simple belief: every Cégep Limoilou student deserves a professional stage to shine.",
      },
      story: {
        title: "The origin",
        p1: "Produced by Hans in partnership with Cégep Limoilou, RÉVÉLATION is the institution's first student talent gala. The idea came from a simple observation: dozens of talented artists walk these halls every year without ever getting a real professional showcase.",
        p2: "In 2026, we decided to change that. By combining the rigor of a TV production, the warmth of a college community and the ambition of a national competition, RÉVÉLATION gives students more than a stage — it gives them a chance.",
      },
      mission: {
        title: "Our mission",
        text: "To reveal the hidden talents of the Cégep Limoilou student community, propel them onto a professional stage and connect them to the opportunities they deserve.",
      },
      values: {
        title: "Our values",
        items: [
          { icon: Star, label: "Excellence", desc: "Every detail — lighting, sound, staging — is designed to showcase talent." },
          { icon: Heart, label: "Care", desc: "A safe, inclusive and encouraging environment for all participants." },
          { icon: Users, label: "Community", desc: "RÉVÉLATION unites students, teachers, audiences and partners around art." },
          { icon: Mic2, label: "Authenticity", desc: "We don't seek technical perfection — we seek genuine emotion." },
        ],
      },
      format: {
        title: "The format",
        steps: [
          { label: "Online video pre-audition", desc: "Online submission — exclusively for Cégep Limoilou students, any campus (Charlesbourg, Québec or Des Arts)." },
          { label: "In-person auditions", desc: `${EVENT_DATES.auditions.dayLabel.en} · ${EVENT_DATES.auditions.time.en} · Salle Montaigne, Campus Charlesbourg.` },
          { label: "Semifinal", desc: `${EVENT_DATES.semifinal.dayLabel.en} · ${EVENT_DATES.semifinal.time.en} · Salle Sylvain-Lelièvre. The best compete.` },
          { label: "Grand Finale", desc: `${EVENT_DATES.finale.dayLabel.en} · ${EVENT_DATES.finale.time.en} · 677 spectators, professional jury, $1,000 scholarship.` },
        ],
      },
      partners: {
        title: "Founding partners",
        items: [
          { icon: Building2, name: "Cégep Limoilou", role: "Institutional partner" },
          { icon: Star, name: "Hans Productions", role: "Executive producer" },
        ],
      },
      cta: {
        audition: "I want to audition",
        jury: "Meet the jury",
      },
    },
  };

  const c = content[lang];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black-deep">
        <GoldParticles className="opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold-royal font-display text-sm tracking-[0.3em] uppercase mb-4"
          >
            {c.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-cream mb-6"
          >
            {c.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {c.hero.sub}
          </motion.p>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gold-royal/10 to-gold-royal/5 border border-gold-royal/20 rounded-2xl p-8 md:p-10">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold-royal/10 rounded-full flex items-center justify-center">
                  <span className="font-display text-gold-royal text-xl">2026</span>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3 text-cream/70 text-sm">
                    <CalendarDays size={16} className="text-gold-royal" />
                    <span>Cégep Limoilou × Hans Productions</span>
                  </div>
                  <div className="flex items-center gap-3 text-cream/70 text-sm">
                    <Star size={16} className="text-gold-royal" />
                    <span>Première édition</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="font-display text-3xl text-gold-royal mb-6">
                {c.story.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-cream/70 leading-relaxed mb-4">
                {c.story.p1}
              </motion.p>
              <motion.p variants={fadeUp} className="text-cream/70 leading-relaxed">
                {c.story.p2}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-black-deep border-y border-gold-royal/10">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl text-gold-royal mb-6">
              {c.mission.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-cream/80 text-xl md:text-2xl font-display italic leading-relaxed">
              « {c.mission.text} »
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-gold-royal mb-12 text-center"
          >
            {c.values.title}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {c.values.items.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-black-deep/50 border border-gold-royal/10 rounded-xl p-6 hover:border-gold-royal/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-royal/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-gold-royal" />
                  </div>
                  <h3 className="font-display text-gold-royal text-lg mb-2">{v.label}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE FORMAT */}
      <section className="py-20 bg-black-deep border-y border-gold-royal/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-gold-royal mb-12 text-center"
          >
            {c.format.title}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold-royal/20 md:-translate-x-px" />
            {c.format.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold-royal rounded-full mt-1.5 md:-translate-x-1.5" />
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
                {/* Card */}
                <div className="ml-10 md:ml-0 md:w-1/2 bg-black-deep/50 border border-gold-royal/10 rounded-xl p-5 hover:border-gold-royal/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold-royal font-display text-sm">0{i + 1}</span>
                    <h3 className="font-display text-cream text-base">{step.label}</h3>
                  </div>
                  <p className="text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-gold-royal mb-12 text-center"
          >
            {c.partners.title}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {c.partners.items.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 bg-black-deep/50 border border-gold-royal/10 rounded-xl p-6 hover:border-gold-royal/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold-royal/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-gold-royal" />
                  </div>
                  <div>
                    <h3 className="font-display text-cream text-base">{p.name}</h3>
                    <p className="text-cream/50 text-sm">{p.role}</p>
                  </div>
                </motion.div>
              );
            })}
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
              to="/jury"
              className="inline-flex items-center justify-center border border-gold-royal/30 text-gold-royal font-semibold px-8 py-3 rounded-lg hover:bg-gold-royal/10 transition-colors"
            >
              {c.cta.jury}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
