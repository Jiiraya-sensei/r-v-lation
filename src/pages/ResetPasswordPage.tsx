import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: lang === "fr" ? "Mot de passe mis à jour" : "Password updated" });
    navigate("/mon-compte");
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto px-4">
          <h1 className="font-display text-3xl text-gold-royal text-center mb-8">
            {lang === "fr" ? "Nouveau mot de passe" : "New password"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cream/80 text-sm mb-1">
                {lang === "fr" ? "Nouveau mot de passe" : "New password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "…" : lang === "fr" ? "Mettre à jour" : "Update"}
            </button>
          </form>
        </motion.div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;
