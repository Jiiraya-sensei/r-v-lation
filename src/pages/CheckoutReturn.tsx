import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (!sessionId) return;
    const interval = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <GoldParticles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-lg mx-auto px-4"
        >
          {sessionId ? (
            <>
              <div className="text-6xl mb-6">🎟️</div>
              <h2 className="font-display text-3xl md:text-4xl text-gold-royal mb-4">
                {lang === "fr" ? "Paiement confirmé !" : "Payment confirmed!"}
              </h2>
              <p className="text-cream/70 leading-relaxed mb-2">
                {lang === "fr"
                  ? "Tes billets sont en route. Tu vas recevoir un courriel avec un PDF par billet (chacun avec un QR code unique à présenter à l'entrée)."
                  : "Your tickets are on the way. You'll receive an email with one PDF per ticket (each with a unique QR code to scan at the door)."}
              </p>
              <p className="text-cream/50 text-sm mt-4">
                {lang === "fr"
                  ? "Pense à vérifier ton dossier promotions ou indésirables."
                  : "Be sure to check your promotions / spam folder."}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/" className="border border-gold-royal/40 text-cream hover:bg-gold-royal/10 px-5 py-2.5 rounded-md text-sm">
                  {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
                </Link>
                <Link to="/mon-compte" className="gradient-gold text-black-deep font-semibold px-5 py-2.5 rounded-md text-sm">
                  {lang === "fr" ? "Voir mes billets" : "View my tickets"}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl text-gold-royal mb-4">
                {lang === "fr" ? "Aucune session trouvée" : "No session found"}
              </h2>
              <Link to="/billetterie" className="text-gold-royal underline">
                {lang === "fr" ? "← Retour à la billetterie" : "← Back to tickets"}
              </Link>
            </>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}
