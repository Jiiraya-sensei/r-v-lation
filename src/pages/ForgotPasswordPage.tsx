import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: error, variant: "destructive" });
      return;
    }
    setSent(true);
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl text-gold-royal text-center mb-8">
            {lang === "fr" ? "Mot de passe oublié" : "Forgot password"}
          </h1>

          {sent ? (
            <p className="text-cream/70 text-center">
              {lang === "fr"
                ? "Si un compte existe pour cette adresse, tu recevras un lien de réinitialisation."
                : "If an account exists for that email, you'll receive a reset link."}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cream/80 text-sm mb-1">{lang === "fr" ? "Courriel" : "Email"}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "…" : lang === "fr" ? "Envoyer le lien" : "Send link"}
              </button>
            </form>
          )}

          <p className="text-center mt-6">
            <Link to="/connexion" className="text-cream/50 hover:text-gold-royal text-sm underline">
              {lang === "fr" ? "← Retour à la connexion" : "← Back to login"}
            </Link>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default ForgotPasswordPage;
