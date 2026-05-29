import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      const msg = error.toLowerCase().includes("invalid")
        ? lang === "fr" ? "Courriel ou mot de passe invalide." : "Invalid email or password."
        : error.toLowerCase().includes("not confirmed")
        ? lang === "fr" ? "Vérifie ton courriel pour confirmer ton compte." : "Please confirm your email first."
        : error;
      toast({ title: lang === "fr" ? "Échec de connexion" : "Login failed", description: msg, variant: "destructive" });
      return;
    }
    toast({ title: lang === "fr" ? "Connecté" : "Logged in" });
    navigate("/mon-compte");
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto px-4"
        >
          <h1 className="font-display text-3xl text-gold-royal text-center mb-8">{t("auth.loginTitle")}</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-cream/80 text-sm mb-1">{t("auth.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
              />
            </div>
            <div>
              <label className="block text-cream/80 text-sm mb-1">{t("auth.password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (lang === "fr" ? "Connexion…" : "Logging in…") : t("auth.login")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/mot-de-passe-oublie" className="text-gold-royal/70 hover:text-gold-royal transition-colors">
              {t("auth.forgotPassword")}
            </Link>
            <p className="text-cream/50 mt-2">
              {t("auth.noAccount")}{" "}
              <Link to="/inscription" className="text-gold-royal hover:text-gold-light transition-colors">
                {t("auth.registerLink")}
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default LoginPage;
