import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Profile = {
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  phone: string | null;
  account_type: "spectator" | "participant";
};

type Submission = {
  id: string;
  discipline: string;
  status: string;
  created_at: string;
};

type TicketRow = {
  id: string;
  ticket_type: string;
  pdf_path: string | null;
  created_at: string;
  orders: { customer_email: string; total_amount: number; currency: string } | null;
};

const STATUS_LABEL: Record<string, { fr: string; en: string }> = {
  submitted: { fr: "Soumise", en: "Submitted" },
  under_review: { fr: "En évaluation", en: "Under review" },
  accepted: { fr: "Retenue 🎉", en: "Accepted 🎉" },
  rejected: { fr: "Non retenue", en: "Not selected" },
};

const TICKET_LABEL: Record<string, { fr: string; en: string }> = {
  semifinal: { fr: "Demi-finale — 1er octobre 2026", en: "Semifinal — Oct 1, 2026" },
  finale: { fr: "Grande finale — 22 octobre 2026", en: "Grand finale — Oct 22, 2026" },
  bundle_semifinal: { fr: "Forfait — Demi-finale", en: "Bundle — Semifinal" },
  bundle_finale: { fr: "Forfait — Grande finale", en: "Bundle — Grand finale" },
};

const AccountPage = () => {
  const { user, signOut } = useAuth();
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const [tab, setTab] = useState<"profile" | "auditions" | "tickets">("profile");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase
        .from("profiles")
        .select("first_name,last_name,age,phone,account_type")
        .eq("user_id", user.id)
        .maybeSingle();
      setProfile(p as Profile | null);

      const { data: s } = await supabase
        .from("audition_submissions")
        .select("id,discipline,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setSubmissions((s as Submission[]) ?? []);

      const { data: t } = await supabase
        .from("tickets")
        .select("id,ticket_type,pdf_path,created_at,orders(customer_email,total_amount,currency)")
        .order("created_at", { ascending: false });
      setTickets((t as unknown as TicketRow[]) ?? []);
    })();
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !profile) return;
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const update = {
      first_name: String(fd.get("first_name") || "").trim() || null,
      last_name: String(fd.get("last_name") || "").trim() || null,
      age: fd.get("age") ? parseInt(String(fd.get("age")), 10) : null,
      phone: String(fd.get("phone") || "").trim() || null,
    };
    const { error } = await supabase.from("profiles").update(update).eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setProfile({ ...profile, ...update });
    toast({ title: lang === "fr" ? "Profil mis à jour" : "Profile updated" });
  };

  const downloadTicket = async (path: string) => {
    const { data, error } = await supabase.storage.from("tickets-pdf").createSignedUrl(path, 300);
    if (error || !data) {
      toast({ title: "Erreur", description: error?.message ?? "Lien indisponible", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  return (
    <Layout>
      <section className="py-20 bg-black-deep min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-gold-royal">
              {lang === "fr" ? "Mon compte" : "My account"}
            </h1>
            <button onClick={() => signOut()} className="text-cream/60 hover:text-gold-royal text-sm underline">
              {lang === "fr" ? "Déconnexion" : "Sign out"}
            </button>
          </motion.div>

          <div className="flex gap-2 mb-8 border-b border-gold-royal/20">
            {(["profile", "auditions", "tickets"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  tab === k ? "text-gold-royal border-b-2 border-gold-royal" : "text-cream/60 hover:text-cream"
                }`}
              >
                {k === "profile"
                  ? lang === "fr" ? "Profil" : "Profile"
                  : k === "auditions"
                  ? lang === "fr" ? "Mes auditions" : "My auditions"
                  : lang === "fr" ? "Mes billets" : "My tickets"}
              </button>
            ))}
          </div>

          {tab === "profile" && profile && (
            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream/80 text-sm mb-1">{lang === "fr" ? "Prénom" : "First name"}</label>
                  <input name="first_name" defaultValue={profile.first_name ?? ""} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                </div>
                <div>
                  <label className="block text-cream/80 text-sm mb-1">{lang === "fr" ? "Nom" : "Last name"}</label>
                  <input name="last_name" defaultValue={profile.last_name ?? ""} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream/80 text-sm mb-1">{lang === "fr" ? "Âge" : "Age"}</label>
                  <input name="age" type="number" min={0} defaultValue={profile.age ?? ""} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                </div>
                <div>
                  <label className="block text-cream/80 text-sm mb-1">{lang === "fr" ? "Téléphone" : "Phone"}</label>
                  <input name="phone" type="tel" defaultValue={profile.phone ?? ""} className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
                </div>
              </div>
              <p className="text-cream/40 text-xs">
                {lang === "fr" ? "Courriel : " : "Email: "} {user?.email}
              </p>
              <p className="text-cream/40 text-xs">
                {lang === "fr" ? "Type : " : "Type: "}
                {profile.account_type === "participant"
                  ? lang === "fr" ? "Participant" : "Participant"
                  : lang === "fr" ? "Spectateur" : "Spectator"}
              </p>
              <button type="submit" disabled={saving} className="gradient-gold text-black-deep font-bold px-6 py-2.5 rounded-md disabled:opacity-60">
                {saving ? "…" : lang === "fr" ? "Enregistrer" : "Save"}
              </button>
            </form>
          )}

          {tab === "auditions" && (
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <p className="text-cream/60 text-sm">
                  {lang === "fr" ? "Aucune audition soumise pour le moment." : "No auditions submitted yet."}
                </p>
              ) : (
                submissions.map((s) => (
                  <div key={s.id} className="border border-gold-royal/20 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="text-cream font-semibold capitalize">{s.discipline}</div>
                      <div className="text-cream/50 text-xs">
                        {new Date(s.created_at).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA")}
                      </div>
                    </div>
                    <span className="text-gold-royal text-sm font-medium">{STATUS_LABEL[s.status]?.[lang] ?? s.status}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "tickets" && (
            <div className="space-y-3">
              {tickets.length === 0 ? (
                <p className="text-cream/60 text-sm">
                  {lang === "fr"
                    ? "Aucun billet associé à ton courriel. Si tu as acheté en mode invité avec un autre courriel, vérifie ta boîte de réception."
                    : "No tickets linked to your email yet."}
                </p>
              ) : (
                tickets.map((t) => (
                  <div key={t.id} className="border border-gold-royal/20 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="text-cream font-semibold">{TICKET_LABEL[t.ticket_type]?.[lang] ?? t.ticket_type}</div>
                      <div className="text-cream/50 text-xs">
                        {new Date(t.created_at).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA")}
                      </div>
                    </div>
                    {t.pdf_path && (
                      <button
                        onClick={() => downloadTicket(t.pdf_path!)}
                        className="border border-gold-royal/40 text-gold-royal hover:bg-gold-royal/10 text-sm px-4 py-2 rounded-md"
                      >
                        PDF
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;
