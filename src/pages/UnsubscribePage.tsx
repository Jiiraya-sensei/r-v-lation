import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | "validating"
  | "valid"
  | "already"
  | "invalid"
  | "submitting"
  | "success"
  | "error";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("validating");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (!res.ok) {
          setState("invalid");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState("already");
          return;
        }
        setState("valid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setState("success");
      } else if (data.reason === "already_unsubscribed") {
        setState("already");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <Layout>
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="font-display text-3xl text-gold-royal mb-6">
            Se désabonner
          </h1>
          {state === "validating" && (
            <p className="text-cream/70">Vérification du lien…</p>
          )}
          {state === "invalid" && (
            <p className="text-cream/70">
              Ce lien de désabonnement est invalide ou expiré.
            </p>
          )}
          {state === "already" && (
            <p className="text-cream/70">
              Cette adresse courriel est déjà désabonnée.
            </p>
          )}
          {state === "valid" && (
            <>
              <p className="text-cream/70 mb-6">
                Confirmer le désabonnement des courriels transactionnels de
                RÉVÉLATION&nbsp;? Tu ne recevras plus de confirmations
                d'achats ou de notifications.
              </p>
              <Button onClick={handleConfirm}>Confirmer le désabonnement</Button>
            </>
          )}
          {state === "submitting" && (
            <p className="text-cream/70">Traitement en cours…</p>
          )}
          {state === "success" && (
            <p className="text-cream/70">
              Tu es désabonné. Tu ne recevras plus de courriels de notre part.
            </p>
          )}
          {state === "error" && (
            <p className="text-cream/70">
              Une erreur est survenue. Réessaie dans un instant.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UnsubscribePage;
