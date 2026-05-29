import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const content = {
  fr: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    sub: "Tout ce que vous devez savoir sur RÉVÉLATION.",
    items: [
      {
        q: "Qui peut participer à RÉVÉLATION ?",
        a: "Tous les étudiants du Cégep Limoilou, sur l'un des 3 campus : Campus Charlesbourg, Campus Québec ou Campus Des Arts. Aucune expérience professionnelle n'est requise.",
      },
      {
        q: "Quelles disciplines sont acceptées ?",
        a: "Chant, danse, musique instrumentale, humour, théâtre, arts du cirque et toute forme d'expression artistique. Si vous avez un talent, nous avons une scène.",
      },
      {
        q: "Comment se déroule la pré-audition vidéo ?",
        a: "Vous enregistrez une vidéo de 6 à 7 minutes incluant votre prénom, votre âge et pourquoi vous voulez participer. Vous la téléversez ou nous envoyez un lien.",
      },
      {
        q: "Quand et où ont lieu les auditions en personne ?",
        a: "Mardi 15 septembre 2026, de 18h à 20h, à la Salle Montaigne du Cégep Limoilou, Campus Charlesbourg.",
      },
      {
        q: "Quels sont les prix en jeu ?",
        a: "Le Grand Prix RÉVÉLATION de 1 000 $, le Prix d'originalité de 300 $ et le Coup de cœur du public de 300 $.",
      },
      {
        q: "Où et quand se tiennent les soirées ?",
        a: "La demi-finale le 1er octobre et la grande finale le 22 octobre 2026, de 19h à 21h, à la Salle Sylvain-Lelièvre du Cégep Limoilou, Campus Québec.",
      },
      {
        q: "Les billets sont-ils en vente ?",
        a: "La billetterie ouvrira prochainement. Inscrivez-vous à l'infolettre pour être informé en priorité.",
      },
      {
        q: "La grande finale sera-t-elle diffusée ?",
        a: "Oui, la grande finale sera diffusée en direct sur Twitch. Les performances resteront en ligne après l'événement.",
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    sub: "Everything you need to know about RÉVÉLATION.",
    items: [
      {
        q: "Who can participate in RÉVÉLATION?",
        a: "All Cégep Limoilou students, across any of the 3 campuses: Campus Charlesbourg, Campus Québec, or Campus des Arts. No professional experience is required.",
      },
      {
        q: "What disciplines are accepted?",
        a: "Singing, dance, instrumental music, comedy, theater, circus arts and any form of artistic expression. If you have a talent, we have a stage.",
      },
      {
        q: "How does the video pre-audition work?",
        a: "You record a 6 to 7 minute video including your first name, age and why you want to participate. You upload it or send us a link.",
      },
      {
        q: "When and where are the in-person auditions?",
        a: "Tuesday, September 15, 2026, from 6 PM to 8 PM, at Salle Montaigne, Cégep Limoilou, Campus Charlesbourg.",
      },
      {
        q: "What are the prizes?",
        a: "The Grand Prix RÉVÉLATION of $1,000, the Originality Award of $300 and the People's Choice Award of $300.",
      },
      {
        q: "Where and when are the shows?",
        a: "The semifinal on October 1 and the grand finale on October 22, 2026, from 7 PM to 9 PM, at Salle Sylvain-Lelièvre, Cégep Limoilou, Campus Québec.",
      },
      {
        q: "Are tickets on sale?",
        a: "Ticketing will open soon. Subscribe to the newsletter to be informed first.",
      },
      {
        q: "Will the grand finale be broadcast?",
        a: "Yes, the grand finale will be live streamed on Twitch. Performances will remain online after the event.",
      },
    ],
  },
};

const FAQPage = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("fr") ? "fr" : "en") as "fr" | "en";
  const c = content[lang];

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
      mainEntity: c.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-jsonld", "faq");
    script.textContent = JSON.stringify(ld);
    document.head.querySelectorAll('script[data-jsonld="faq"]').forEach((n) => n.remove());
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [lang, c.items]);


  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black-deep">
        <GoldParticles className="opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <HelpCircle size={18} className="text-gold-royal" />
            <span className="text-gold-royal font-display text-sm tracking-[0.3em] uppercase">
              {c.eyebrow}
            </span>
            <HelpCircle size={18} className="text-gold-royal" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-cream mb-4"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/60 text-lg"
          >
            {c.sub}
          </motion.p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="py-16 bg-black-deep">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-4"
          >
            {c.items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-black-deep/50 border border-gold-royal/10 rounded-xl p-5 hover:border-gold-royal/30 transition-colors"
              >
                <h3 className="font-display text-gold-royal text-base mb-2">{item.q}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
