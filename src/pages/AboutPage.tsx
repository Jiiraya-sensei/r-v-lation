import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { EVENT_DATES } from "@/config/eventDates";

const AboutPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";

  return (
    <Layout>
      <section className="py-20 bg-black-deep min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl text-gold-royal mb-8">
            {lang === "fr" ? "À propos de RÉVÉLATION" : "About RÉVÉLATION"}
          </h1>
          <div className="prose prose-invert max-w-none text-cream/70 space-y-4">
            <p>
              {lang === "fr"
                ? "RÉVÉLATION est le premier gala de talents étudiant du Cégep Limoilou, présenté à l'automne 2026. Deux soirées exceptionnelles réunissant les artistes les plus talentueux de la communauté collégiale."
                : "RÉVÉLATION is Cégep Limoilou's first student talent gala, presented in fall 2026. Two extraordinary evenings showcasing the most talented artists from the college community."}
            </p>
            <h2 className="font-display text-2xl text-gold-royal">Dates</h2>
            <ul className="space-y-2">
              <li>◆ {lang === "fr" ? "Auditions" : "Auditions"} — {EVENT_DATES.auditions.dayLabel[lang]}, {EVENT_DATES.auditions.time[lang]}, {EVENT_DATES.auditions.venue[lang]}</li>
              <li>◆ {lang === "fr" ? "Demi-finale" : "Semifinal"} — {EVENT_DATES.semifinal.dayLabel[lang]}, {EVENT_DATES.semifinal.time[lang]}, {EVENT_DATES.semifinal.venue[lang]}</li>
              <li>◆ {lang === "fr" ? "Grande finale" : "Grand Finale"} — {EVENT_DATES.finale.dayLabel[lang]}, {EVENT_DATES.finale.time[lang]}, {EVENT_DATES.finale.venue[lang]}</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
