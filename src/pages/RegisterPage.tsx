import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

type AccountType = "spectator" | "participant" | null;

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accountType) return;
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const first_name = String(fd.get("first_name") || "").trim();
    const last_name = String(fd.get("last_name") || "").trim();
    const ageStr = String(fd.get("age") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    const { error } = await signUp(email, password, {
      first_name,
      last_name: last_name || undefined,
      age: ageStr ? parseInt(ageStr, 10) : undefined,
      phone: phone || undefined,
      account_type: accountType,
    });
    setLoading(false);
    if (error) {
      toast({ title: lang === "fr" ? "Inscription échouée" : "Sign-up failed", description: error, variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-6">✉️</div>
            <h2 className="font-display text-2xl text-gold-royal mb-4">
              {lang === "fr" ? "Vérifie ton courriel" : "Check your email"}
            </h2>
            <p className="text-cream/70">
              {lang === "fr"
                ? "Nous t'avons envoyé un lien de confirmation. Clique dessus pour activer ton compte."
                : "We sent you a confirmation link. Click it to activate your account."}
            </p>
            <Link to="/connexion" className="inline-block mt-6 text-gold-royal hover:text-gold-light underline">
              {lang === "fr" ? "Aller à la connexion" : "Go to login"}
            </Link>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto px-4"
        >
          <h1 className="font-display text-3xl text-gold-royal text-center mb-8">{t("auth.registerTitle")}</h1>

          {!accountType ? (
            <div className="space-y-4">
              <button
                onClick={() => setAccountType("spectator")}
                className="w-full border border-gold-royal/30 text-cream p-4 rounded-lg hover:border-gold-royal hover:bg-gold-royal/5 transition-colors text-left"
              >
                <div className="font-semibold text-gold-royal">{t("auth.spectator")}</div>
              </button>
              <button
                onClick={() => setAccountType("participant")}
                className="w-full border border-gold-royal/30 text-cream p-4 rounded-lg hover:border-gold-royal hover:bg-gold-royal/5 transition-colors text-left"
              >
                <div className="font-semibold text-gold-royal">{t("auth.participant")}</div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.firstName")} *</label>
                <input name="first_name" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>

              {accountType === "participant" && (
                <>
                  <div>
                    <label className="block text-cream/80 text-sm mb-1">{t("auth.lastName")} *</label>
                    <input name="last_name" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream/80 text-sm mb-1">{t("auth.age")} *</label>
                      <input name="age" type="number" min={16} required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                    </div>
                    <div>
                      <label className="block text-cream/80 text-sm mb-1">{t("auth.phone")} *</label>
                      <input name="phone" type="tel" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.email")} *</label>
                <input name="email" type="email" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.password")} *</label>
                <input name="password" type="password" required minLength={8} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                <p className="text-cream/40 text-xs mt-1">
                  {lang === "fr" ? "Minimum 8 caractères." : "At least 8 characters."}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? (lang === "fr" ? "Création…" : "Creating…") : t("auth.createAccount")}
              </button>

              <button
                type="button"
                onClick={() => setAccountType(null)}
                className="w-full text-cream/50 text-sm hover:text-gold-royal transition-colors"
              >
                ← {lang === "fr" ? "Changer le type de compte" : "Change account type"}
              </button>
            </form>
          )}

          <p className="text-cream/50 text-sm text-center mt-6">
            {t("auth.hasAccount")}{" "}
            <Link to="/connexion" className="text-gold-royal hover:text-gold-light transition-colors">
              {t("auth.loginLink")}
            </Link>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
