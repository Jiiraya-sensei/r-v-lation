export const EVENT_DATES = {
  auditions: {
    date: "2026-09-15",
    dayLabel: { fr: "mardi 15 septembre 2026", en: "Tuesday, September 15, 2026" },
    time: { fr: "18h00 à 20h00", en: "6:00 PM to 8:00 PM" },
    venue: { fr: "Salle Montaigne, Cégep Limoilou, Campus Charlesbourg", en: "Salle Montaigne, Cégep Limoilou, Campus Charlesbourg" },
    shortVenue: { fr: "Salle Montaigne (Campus Charlesbourg)", en: "Salle Montaigne (Campus Charlesbourg)" },
  },
  semifinal: {
    date: "2026-10-01",
    dayLabel: { fr: "jeudi 1er octobre 2026", en: "Thursday, October 1, 2026" },
    time: { fr: "19h00 à 21h00", en: "7:00 PM to 9:00 PM" },
    venue: { fr: "Salle Sylvain-Lelièvre, Cégep Limoilou, Campus Québec (1398, 8e Avenue)", en: "Salle Sylvain-Lelièvre, Cégep Limoilou, Campus Québec (1398, 8e Avenue)" },
    shortVenue: { fr: "Salle Sylvain-Lelièvre", en: "Salle Sylvain-Lelièvre" },
  },
  finale: {
    date: "2026-10-22",
    dayLabel: { fr: "jeudi 22 octobre 2026", en: "Thursday, October 22, 2026" },
    time: { fr: "19h00 à 21h00", en: "7:00 PM to 9:00 PM" },
    venue: { fr: "Salle Sylvain-Lelièvre, Cégep Limoilou, Campus Québec (1398, 8e Avenue)", en: "Salle Sylvain-Lelièvre, Cégep Limoilou, Campus Québec (1398, 8e Avenue)" },
    shortVenue: { fr: "Salle Sylvain-Lelièvre", en: "Salle Sylvain-Lelièvre" },
  },
  videoDeadline: {
    placeholder: "[DATE_LIMITE_VIDEO]",
  },
} as const;

export type EventKey = keyof typeof EVENT_DATES;
