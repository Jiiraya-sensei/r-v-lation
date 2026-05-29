import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EVENT_DATES } from "@/config/eventDates";
import { Instagram, Calendar } from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";

  const events = [
    {
      label: lang === "fr" ? "Pré-auditions vidéo" : "Video Pre-Auditions",
      date: EVENT_DATES.auditions.dayLabel[lang],
      time: EVENT_DATES.auditions.time[lang],
      venue: EVENT_DATES.auditions.shortVenue[lang],
    },
    {
      label: lang === "fr" ? "Demi-finale" : "Semifinal",
      date: EVENT_DATES.semifinal.dayLabel[lang],
      time: EVENT_DATES.semifinal.time[lang],
      venue: EVENT_DATES.semifinal.shortVenue[lang],
    },
    {
      label: lang === "fr" ? "Grande finale" : "Grand Finale",
      date: EVENT_DATES.finale.dayLabel[lang],
      time: EVENT_DATES.finale.time[lang],
      venue: EVENT_DATES.finale.shortVenue[lang],
    },
  ];

  return (
    <footer className="bg-black-deep border-t border-gold-royal/10">
      {/* Event dates banner */}
      <div className="bg-gold-royal/5 border-b border-gold-royal/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calendar className="text-gold-royal" size={20} />
            <h4 className="text-gold-royal font-display text-lg tracking-wider uppercase">
              Dates des événements 2026
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {events.map((event, i) => (
              <div
                key={i}
                className="text-center bg-black-deep/40 border border-gold-royal/20 rounded-lg px-4 py-4 hover:border-gold-royal/40 transition-colors"
              >
                <div className="text-gold-royal font-semibold text-sm mb-1">{event.label}</div>
                <div className="text-cream font-medium text-sm">{event.date}</div>
                <div className="text-cream/60 text-xs mt-1">{event.time}</div>
                <div className="text-cream/40 text-xs mt-0.5">{event.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-display text-2xl text-gold-royal tracking-[0.15em] mb-3">RÉVÉLATION</h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {lang === "fr"
                  ? "Le gala de talents étudiant du Cégep Limoilou. Automne 2026."
                  : "Cégep Limoilou's Student Talent Gala. Fall 2026."}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-gold-royal font-semibold text-sm mb-3 uppercase tracking-wider">
                {lang === "fr" ? "Navigation" : "Navigation"}
              </h4>
              <ul className="space-y-2 text-cream/60 text-sm">
                <li><Link to="/" className="hover:text-gold-royal transition-colors">{lang === "fr" ? "Accueil" : "Home"}</Link></li>
                <li><Link to="/auditionner" className="hover:text-gold-royal transition-colors">{lang === "fr" ? "Auditionner" : "Audition"}</Link></li>
                <li><Link to="/billetterie" className="hover:text-gold-royal transition-colors">{lang === "fr" ? "Billetterie" : "Tickets"}</Link></li>
                <li><Link to="/a-propos" className="hover:text-gold-royal transition-colors">{lang === "fr" ? "À propos" : "About"}</Link></li>
              </ul>
            </div>

            {/* Legal + Social */}
            <div>
              <h4 className="text-gold-royal font-semibold text-sm mb-3 uppercase tracking-wider">
                {lang === "fr" ? "Liens utiles" : "Useful Links"}
              </h4>
              <ul className="space-y-2 text-cream/60 text-sm">
                <li><Link to="/conditions-generales" className="hover:text-gold-royal transition-colors">{t("footer.terms")}</Link></li>
                <li><Link to="/confidentialite" className="hover:text-gold-royal transition-colors">{t("footer.privacy")}</Link></li>
                <li><Link to="/utilisation-videos" className="hover:text-gold-royal transition-colors">{t("footer.videoPolicy")}</Link></li>
              </ul>
              <a
                href="https://www.instagram.com/revelationofficielle/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/60 hover:text-gold-royal transition-colors mt-4 text-sm"
              >
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </div>

          <div className="border-t border-gold-royal/10 pt-6 text-center">
            <p className="text-cream/30 text-xs">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
