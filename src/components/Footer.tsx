import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EVENT_DATES } from "@/config/eventDates";
import { Instagram } from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";

  return (
    <footer className="bg-black-deep border-t border-gold-royal/10 py-12">
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

          {/* Dates */}
          <div>
            <h4 className="text-gold-royal font-semibold text-sm mb-3 uppercase tracking-wider">Dates</h4>
            <ul className="space-y-2 text-cream/60 text-sm">
              <li>◆ {EVENT_DATES.auditions.dayLabel[lang]} · {EVENT_DATES.auditions.time[lang]}</li>
              <li>◆ {EVENT_DATES.semifinal.dayLabel[lang]} · {EVENT_DATES.semifinal.time[lang]}</li>
              <li>◆ {EVENT_DATES.finale.dayLabel[lang]} · {EVENT_DATES.finale.time[lang]}</li>
            </ul>
          </div>

          {/* Links */}
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
    </footer>
  );
};

export default Footer;
