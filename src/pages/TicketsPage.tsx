import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { EVENT_DATES } from "@/config/eventDates";

type ShowOption = "semifinal" | "finale" | "bundle";

const PRESALE_PRICE = 10;

const TicketsPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const [selectedShow, setSelectedShow] = useState<ShowOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);

  const total = selectedShow === "bundle" ? PRESALE_PRICE * 2 * quantity : PRESALE_PRICE * quantity;

  const showOptions: { value: ShowOption; label: string }[] = [
    { value: "semifinal", label: t("ticketPage.semifinalOption") },
    { value: "finale", label: t("ticketPage.finaleOption") },
    { value: "bundle", label: t("ticketPage.bundleOption") },
  ];

  return (
    <Layout>
      <section className="py-20 bg-black-deep min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-5xl text-gold-royal text-center mb-4">
              {t("ticketPage.title")}
            </h1>
            <p className="text-cream/70 text-center mb-12">{t("ticketPage.intro")}</p>
          </motion.div>

          {/* Presale card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="gradient-gold rounded-xl p-8 text-center mb-8"
          >
            <div className="text-black-deep font-bold tracking-wider text-sm mb-1">{t("ticketing.presale")}</div>
            <div className="text-black-deep font-display text-5xl font-bold mb-2">{t("ticketing.price")}</div>
            <div className="text-black-deep/70 text-sm">{t("ticketing.limitedSeats")}</div>
          </motion.div>

          {/* Future categories (disabled) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { name: lang === "fr" ? "Étudiant" : "Student", price: "15 $" },
              { name: lang === "fr" ? "Régulier" : "Regular", price: "20 $" },
              { name: lang === "fr" ? "Externe" : "External", price: "20 $" },
            ].map((cat, i) => (
              <div key={i} className="border border-gold-royal/10 rounded-lg p-4 text-center relative opacity-50">
                <div className="absolute inset-0 bg-black-deep/60 rounded-lg flex items-center justify-center">
                  <span className="text-cream/50 text-xs font-semibold">{t("ticketPage.comingSoon")}</span>
                </div>
                <div className="text-cream font-semibold">{cat.name}</div>
                <div className="text-gold-royal font-display text-2xl font-bold">{cat.price}</div>
              </div>
            ))}
          </div>

          {/* Purchase form */}
          {!purchasing ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setPurchasing(true)}
              className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md text-lg hover:opacity-90 transition-opacity gold-glow"
            >
              {t("ticketing.cta")}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Show selection */}
              <div className="space-y-3">
                {showOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedShow === opt.value
                        ? "border-gold-royal bg-gold-royal/10"
                        : "border-gold-royal/20 hover:border-gold-royal/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="show"
                        checked={selectedShow === opt.value}
                        onChange={() => setSelectedShow(opt.value)}
                        className="accent-gold-royal"
                      />
                      <span className="text-cream text-sm">{opt.label}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("ticketPage.quantity")}</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Total */}
              {selectedShow && (
                <div className="flex items-center justify-between border-t border-gold-royal/20 pt-4">
                  <span className="text-cream font-semibold">{t("ticketPage.total")}</span>
                  <span className="text-gold-royal font-display text-3xl font-bold">{total} $</span>
                </div>
              )}

              <button
                disabled={!selectedShow}
                className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md text-lg hover:opacity-90 transition-opacity gold-glow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("ticketPage.checkout")}
                {/* TODO: Stripe Checkout integration */}
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TicketsPage;
