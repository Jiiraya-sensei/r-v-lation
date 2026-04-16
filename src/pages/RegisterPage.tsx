import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

type AccountType = "spectator" | "participant" | null;

const RegisterPage = () => {
  const { t } = useTranslation();
  const [accountType, setAccountType] = useState<AccountType>(null);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto px-4"
        >
          <h1 className="font-display text-3xl text-gold-royal text-center mb-8">{t("auth.registerTitle")}</h1>

          {/* Account type choice */}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Supabase Auth signup
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.firstName")} *</label>
                <input required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>

              {accountType === "participant" && (
                <>
                  <div>
                    <label className="block text-cream/80 text-sm mb-1">{t("auth.lastName")} *</label>
                    <input required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream/80 text-sm mb-1">{t("auth.age")} *</label>
                      <input type="number" min={16} required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                    </div>
                    <div>
                      <label className="block text-cream/80 text-sm mb-1">{t("auth.phone")} *</label>
                      <input type="tel" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.email")} *</label>
                <input type="email" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auth.password")} *</label>
                <input type="password" required minLength={8} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>

              <button
                type="submit"
                className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                {t("auth.createAccount")}
              </button>

              <button
                type="button"
                onClick={() => setAccountType(null)}
                className="w-full text-cream/50 text-sm hover:text-gold-royal transition-colors"
              >
                ← {t("auth.spectator")} / {t("auth.participant")}
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
