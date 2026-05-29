import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import GoldParticles from "./GoldParticles";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    {
      label: t("nav.show"),
      children: [
        { to: "/a-propos", label: t("nav.about") },
        { to: "/jury", label: t("nav.jury") },
        { to: "/bourses", label: t("nav.scholarships") },
      ],
    },
    { to: "/auditionner", label: t("nav.audition") },
    { to: "/billetterie", label: t("nav.tickets") },
    { to: "/faq", label: t("nav.faq") },
  ];

  const mobileLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/a-propos", label: t("nav.about") },
    { to: "/jury", label: t("nav.jury") },
    { to: "/bourses", label: t("nav.scholarships") },
    { to: "/auditionner", label: t("nav.audition") },
    { to: "/billetterie", label: t("nav.tickets") },
    { to: "/faq", label: t("nav.faq") },
    user
      ? { to: "/mon-compte", label: t("nav.myAccount") }
      : { to: "/connexion", label: t("nav.login") },
    ...(user ? [] : [{ to: "/inscription", label: t("nav.register") }]),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black-deep/95 backdrop-blur-md border-b border-gold-royal/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-xl md:text-2xl tracking-[0.2em] text-gold-royal font-bold">
            RÉVÉLATION
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, i) =>
              link.children ? (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(link.label)}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  <button className="text-cream/80 hover:text-gold-royal transition-colors text-sm font-medium">
                    {link.label}
                  </button>
                  <AnimatePresence>
                    {showDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 mt-1 bg-black-deep border border-gold-royal/20 rounded-md min-w-[180px] py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block px-4 py-2 text-sm text-cream/80 hover:text-gold-royal hover:bg-gold-royal/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to!}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to ? "text-gold-royal" : "text-cream/80 hover:text-gold-royal"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <button
              onClick={toggleLang}
              className="text-xs text-cream/50 hover:text-gold-royal border border-cream/20 rounded px-2 py-1 transition-colors"
            >
              {i18n.language === "fr" ? "EN" : "FR"}
            </button>

            {user ? (
              <Link
                to="/mon-compte"
                className="inline-flex items-center gap-1.5 text-sm text-cream/80 hover:text-gold-royal transition-colors"
              >
                <User size={14} /> {t("nav.myAccount")}
              </Link>
            ) : (
              <Link to="/connexion" className="text-sm text-cream/80 hover:text-gold-royal transition-colors">
                {t("nav.login")}
              </Link>
            )}

            <Link
              to="/auditionner"
              className="gradient-gold text-black-deep font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              {t("nav.auditionNow")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gold-royal z-50 inline-flex items-center justify-center w-11 h-11 -mr-2"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black-deep flex flex-col items-center justify-center"
          >
            <GoldParticles />
            <div className="flex flex-col items-center gap-6 relative z-10">
              {mobileLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-cream hover:text-gold-royal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/auditionner"
                onClick={() => setMobileOpen(false)}
                className="gradient-gold text-black-deep font-semibold px-8 py-3 rounded-md mt-4 text-lg"
              >
                {t("nav.auditionNow")}
              </Link>
              <button
                onClick={toggleLang}
                className="text-cream/50 hover:text-gold-royal border border-cream/20 rounded px-3 py-1 mt-2"
              >
                {i18n.language === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
