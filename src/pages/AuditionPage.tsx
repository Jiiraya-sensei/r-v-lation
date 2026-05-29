import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GoldParticles from "@/components/GoldParticles";
import { EVENT_DATES } from "@/config/eventDates";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const DISCIPLINES = ["singing", "dance", "instrument", "comedy", "theater", "circus", "other"] as const;

const AuditionPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en";
  const [videoMode, setVideoMode] = useState<"upload" | "link">("upload");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [age, setAge] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      const first_name = String(fd.get("first_name") || "").trim();
      const last_name = String(fd.get("last_name") || "").trim();
      const ageNum = parseInt(String(fd.get("age") || "0"), 10);
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const discipline = String(fd.get("discipline") || "");
      const bio = String(fd.get("bio") || "").trim() || null;
      const video_link = videoMode === "link" ? String(fd.get("video_link") || "").trim() || null : null;
      const parent_name = isMinor ? String(fd.get("parent_name") || "").trim() : null;
      const parent_consent = isMinor;

      let video_path: string | null = null;
      if (videoMode === "upload") {
        if (!videoFile) {
          toast({ title: lang === "fr" ? "Vidéo manquante" : "Video missing", description: lang === "fr" ? "Téléverse une vidéo ou colle un lien." : "Upload a video or paste a link.", variant: "destructive" });
          setSubmitting(false);
          return;
        }
        const ext = videoFile.name.split(".").pop() || "mp4";
        const safe = `${first_name}-${last_name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const path = `${safe}-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("audition-videos")
          .upload(path, videoFile, { contentType: videoFile.type, upsert: false });
        if (upErr) throw upErr;
        video_path = path;
      }

      const { error: insErr } = await supabase.from("audition_submissions").insert({
        first_name, last_name, age: ageNum, phone, email, discipline,
        bio, video_path, video_link, parent_name, parent_consent,
      });
      if (insErr) throw insErr;

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      toast({
        title: lang === "fr" ? "Erreur d'envoi" : "Submission error",
        description: err?.message || (lang === "fr" ? "Réessaie dans un instant." : "Please try again."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };



  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("video/")) return;
    setVideoFile(file);
  };

  const isMinor = age !== "" && parseInt(age) >= 16 && parseInt(age) < 18;

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <GoldParticles />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center max-w-lg mx-auto px-4"
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="font-display text-3xl text-gold-royal mb-4">{t("auditionPage.confirmTitle")}</h2>
            <p className="text-cream/70 leading-relaxed">{t("auditionPage.confirmInfo")}</p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Steps */}
      <section className="py-20 bg-black-deep">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-5xl text-gold-royal text-center mb-4">
              {t("auditionPage.title")}
            </h1>
            <p className="text-cream/70 text-center mb-6">{t("auditionPage.intro")}</p>
            <div className="max-w-xl mx-auto mb-12 border border-gold-royal/20 rounded-lg p-4 bg-gold-royal/5 text-center">
              <p className="text-gold-light text-sm font-medium">
                {lang === "fr"
                  ? "Participation réservée aux étudiants du Cégep Limoilou — Campus Charlesbourg, Campus Québec ou Campus Des Arts."
                  : "Participation reserved for Cégep Limoilou students — Campus Charlesbourg, Campus Québec or Campus des Arts."}
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 md:gap-0 mb-16">
            {[
              { step: 1, title: t("auditionPage.step1"), sub: t("auditionPage.step1Deadline") },
              { step: 2, title: t("auditionPage.step2"), sub: t("auditionPage.step2Date") },
              { step: 3, title: t("auditionPage.step3"), sub: t("auditionPage.step3Date") },
            ].map((s, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <div className="hidden md:block w-16 h-px bg-gold-royal/30" />}
                <div className="text-center px-4">
                  <div className="w-10 h-10 rounded-full gradient-gold text-black-deep font-bold flex items-center justify-center mx-auto mb-2">
                    {s.step}
                  </div>
                  <div className="text-cream font-semibold text-sm">{s.title}</div>
                  <div className="text-cream/50 text-xs mt-1">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Video guidelines */}
          <div className="border border-gold-royal/40 rounded-lg p-6 mb-12 bg-gold-royal/5">
            <h3 className="font-display text-xl text-gold-royal mb-4">{t("auditionPage.videoTitle")}</h3>
            <ul className="space-y-2 text-cream/70 text-sm">
              <li>• {t("auditionPage.videoDuration")}</li>
              <li className="text-gold-light font-semibold bg-ruby-deep/20 rounded px-3 py-2">
                ⚠️ {t("auditionPage.videoIntro")}
              </li>
              <li>• {t("auditionPage.videoOrientation")}</li>
              <li>• {t("auditionPage.videoLighting")}</li>
              <li>• {t("auditionPage.videoSound")}</li>
              <li>• {t("auditionPage.videoFormat")}</li>
              <li>• {t("auditionPage.videoSize")}</li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formFirstName")} *</label>
                <input name="first_name" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formLastName")} *</label>
                <input name="last_name" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formAge")} *</label>
                <input
                  name="age"
                  type="number"
                  min={16}
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
                />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formPhone")} *</label>
                <input name="phone" type="tel" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formEmail")} *</label>
                <input name="email" type="email" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />
              </div>
              <div>
                <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formDiscipline")} *</label>
                <select name="discipline" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal">
                  <option value="">—</option>
                  {DISCIPLINES.map((d) => (
                    <option key={d} value={d}>{t(`auditionPage.disciplines.${d}`)}</option>
                  ))}
                </select>
              </div>
            </div>


            <div>
              <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.formBio")}</label>
              <textarea
                name="bio"
                maxLength={500}
                rows={3}
                className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal resize-none"
              />
            </div>


            {/* Video mode toggle */}
            <div>
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setVideoMode("upload")}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    videoMode === "upload"
                      ? "gradient-gold text-black-deep"
                      : "border border-gold-royal/30 text-cream/60 hover:text-gold-royal"
                  }`}
                >
                  {t("auditionPage.uploadVideo")}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoMode("link")}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    videoMode === "link"
                      ? "gradient-gold text-black-deep"
                      : "border border-gold-royal/30 text-cream/60 hover:text-gold-royal"
                  }`}
                >
                  {t("auditionPage.pasteLink")}
                </button>
              </div>

              {videoMode === "upload" ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-royal ${
                    dragActive ? "border-gold-royal bg-gold-royal/10" : "border-gold-royal/20 hover:border-gold-royal/50"
                  }`}
                >
                  <p className="text-cream/70 text-sm">
                    {videoFile ? videoFile.name : t("auditionPage.uploadDrop")}
                  </p>
                  {videoFile && (
                    <p className="text-cream/40 text-xs mt-1">
                      {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/avi,video/x-msvideo,video/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>
              ) : (
                <input
                  name="video_link"
                  type="url"
                  placeholder={t("auditionPage.linkPlaceholder")}
                  className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal"
                />
              )}

            </div>

            {/* Consents */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-cream/70 text-sm cursor-pointer">
                <input type="checkbox" required className="mt-0.5 accent-gold-royal" />
                <span>{t("auditionPage.consentTerms")}</span>
              </label>
              <label className="flex items-start gap-3 text-cream/70 text-sm cursor-pointer">
                <input type="checkbox" required className="mt-0.5 accent-gold-royal" />
                <span>{t("auditionPage.consentPrivacy")}</span>
              </label>
              <label className="flex items-start gap-3 text-cream/70 text-sm cursor-pointer">
                <input type="checkbox" required className="mt-0.5 accent-gold-royal" />
                <span>{t("auditionPage.consentVideo")}</span>
              </label>
            </div>

            {/* Minor fields */}
            {isMinor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border border-ruby-deep/30 rounded-lg p-4 bg-ruby-deep/5 space-y-4"
              >
                <p className="text-gold-light text-sm font-semibold">
                  {lang === "fr" ? "Consentement parental requis (16-17 ans)" : "Parental consent required (ages 16-17)"}
                </p>
                <div>
                  <label className="block text-cream/80 text-sm mb-1">{t("auditionPage.parentName")} *</label>
                  <input name="parent_name" required className="w-full bg-black-warm border border-gold-royal/20 text-cream px-4 py-2.5 rounded-md focus:outline-none focus:border-gold-royal" />

                </div>
                <label className="flex items-start gap-3 text-cream/70 text-sm cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-gold-royal" />
                  <span>{t("auditionPage.parentConsent")}</span>
                </label>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full gradient-gold text-black-deep font-bold py-3 rounded-md text-lg hover:opacity-90 transition-opacity gold-glow"
            >
              {t("auditionPage.submit")}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AuditionPage;
