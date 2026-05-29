import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Layout>
      <section className="min-h-screen bg-black-deep py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          {sessionId ? (
            <>
              <h1 className="font-display text-4xl md:text-5xl text-gold-royal mb-4">
                Merci pour ton achat !
              </h1>
              <p className="text-cream/80 mb-2">
                Ton paiement a bien été reçu. Un courriel de confirmation te sera envoyé sous peu.
              </p>
              <p className="text-cream/50 text-xs mb-8">Référence : {sessionId}</p>
            </>
          ) : (
            <>
              <h1 className="font-display text-4xl md:text-5xl text-gold-royal mb-4">
                Aucune transaction trouvée
              </h1>
              <p className="text-cream/80 mb-8">
                Aucune session de paiement n'a été détectée.
              </p>
            </>
          )}
          <Link
            to="/"
            className="inline-block gradient-gold text-black-deep font-bold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </Layout>
  );
}
