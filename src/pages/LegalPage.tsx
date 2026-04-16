import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";

const LegalPage = ({ type }: { type: "terms" | "privacy" | "video" }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";

  const titles = {
    terms: { fr: "Conditions générales d'utilisation", en: "Terms of Use" },
    privacy: { fr: "Politique de confidentialité", en: "Privacy Policy" },
    video: { fr: "Politique d'utilisation des vidéos de pré-audition", en: "Pre-Audition Video Use Policy" },
  };

  // TODO: Full legal content
  const placeholders = {
    terms: {
      fr: "Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation du site web de RÉVÉLATION. En utilisant ce site, vous acceptez d'être lié par ces conditions. Le site est exploité depuis le Québec, Canada, et est soumis aux lois québécoises, notamment la Loi 25 sur la protection des renseignements personnels. Contenu complet à venir.",
      en: "These terms of use govern access to and use of the RÉVÉLATION website. By using this site, you agree to be bound by these terms. The site is operated from Quebec, Canada, and is subject to Quebec laws, including Law 25 on the protection of personal information. Full content coming soon.",
    },
    privacy: {
      fr: "RÉVÉLATION collecte des données personnelles (nom, courriel, téléphone, vidéo) dans le cadre de l'évaluation des candidatures et de la gestion de la billetterie. Les données sont conservées un an après l'événement, sauf demande de suppression. Les données sont partagées avec des fournisseurs de services essentiels uniquement. Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Le site est soumis aux lois québécoises (Loi 25). Contenu complet à venir.",
      en: "RÉVÉLATION collects personal data (name, email, phone, video) for the purpose of evaluating applications and managing ticket sales. Data is retained for one year after the event unless deletion is requested. Data is shared only with essential service providers. You have the right to access, rectify, delete, and port your data. The site is subject to Quebec laws (Law 25). Full content coming soon.",
    },
    video: {
      fr: "Les vidéos de pré-audition soumises sont utilisées principalement pour l'évaluation des candidatures par le jury de RÉVÉLATION. Avec votre consentement explicite distinct, des extraits pourront être utilisés dans la bande-annonce ou sur les réseaux sociaux de RÉVÉLATION. Aucune cession de droits d'auteur n'est impliquée. Vous pouvez retirer votre consentement à tout moment par courriel avant l'événement. Contenu complet à venir.",
      en: "Pre-audition videos submitted are primarily used for evaluating applications by the RÉVÉLATION jury. With your separate explicit consent, excerpts may be used in the trailer or on RÉVÉLATION's social media. No copyright transfer is involved. You may withdraw your consent at any time by email before the event. Full content coming soon.",
    },
  };

  return (
    <Layout>
      <section className="py-20 bg-black-deep min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl text-gold-royal mb-8">{titles[type][lang]}</h1>
          <div className="text-cream/70 leading-relaxed whitespace-pre-line">
            {placeholders[type][lang]}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalPage;
