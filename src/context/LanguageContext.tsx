import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'de' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'de', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');
  const toggle = () => setLang(l => l === 'de' ? 'en' : 'de');
  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

// Simple translation helper
type Translations = Record<string, { de: string; en: string }>;

const t: Translations = {
  // Nav
  'nav.studio': { de: 'Studio', en: 'Studio' },
  'nav.artists': { de: 'Artists', en: 'Artists' },
  'nav.guestArtists': { de: 'Guest Artists', en: 'Guest Artists' },
  'nav.info': { de: 'Info', en: 'Info' },
  'nav.extras': { de: 'Extras', en: 'Extras' },
  'nav.faq': { de: 'FAQ', en: 'FAQ' },
  'nav.blog': { de: 'Tattoo-Blog', en: 'Tattoo Blog' },
  'nav.removal': { de: 'Tattoo Entfernung', en: 'Tattoo Removal' },
  'nav.care': { de: 'Pflegeempfehlung', en: 'Aftercare' },
  'nav.piercing': { de: 'Piercing', en: 'Piercing' },
  'nav.cta': { de: 'Termin anfragen', en: 'Book Now' },

  // Hero
  'hero.title1': { de: 'Wer', en: 'Who' },
  'hero.title2': { de: 'Wir', en: 'We' },
  'hero.title3': { de: 'Sind', en: 'Are' },
  'hero.quote1': { de: '"Was hier beginnt, ist nicht nur ein Moment; es ist eine Beziehung –', en: '"What starts here isn\'t just a moment; it\'s a relationship –' },
  'hero.quote2': { de: 'gemessen in Jahreszeiten, nicht in Lärm."', en: 'measured in seasons, not noise."' },
  'hero.p1': { de: 'True Canvas ist ein Raum der Kommunikation, in dem:', en: 'True Canvas is a space of communication where:' },
  'hero.p2': { de: 'Die Arbeit zählt.\nDie Art, wie sie gemacht wird, zählt.\nDer Mensch dahinter zählt.', en: 'The work matters.\nThe way the work is done matters.\nThe person doing it matters.' },
  'hero.p3': { de: 'In dieser Kultur fühlt sich Anerkennung\necht an, nicht inszeniert.', en: 'Inside that culture recognition\nfeels genuine, not performative.' },
  'hero.p4': { de: 'Daraus entsteht Verbindung.\nAus Verbindung entsteht Vertrauen.\nUnd Vertrauen bringt Menschen\nimmer wieder zurück.', en: 'From that comes connection.\nFrom connection comes trust.\nAnd trust has a way of bringing\npeople back into the room.' },
  'hero.p5': { de: 'Das sind wir.', en: 'This is who we are.' },

  // Studio
  'studio.title': { de: 'Wo Kunst ein\nZuhause hat', en: 'Where Art\nFinds a Home' },
  'studio.p1': { de: 'Als Max True Canvas 2018 mitten in Wien gründete, war die Vision klar: Ein Studio zu schaffen, das die typischen Klischees hinter sich lässt.', en: 'When Max founded True Canvas in the heart of Vienna in 2018, the vision was clear: to create a studio that leaves typical clichés behind.' },
  'studio.p2': { de: 'Unser Raum ist hell, modern und einladend – ein Ort, an dem du dich sicher und verstanden fühlst, während wir deine Ideen zum Leben erwecken.', en: 'Our space is bright, modern, and inviting – a place where you feel safe and understood while we bring your ideas to life.' },
  'studio.p3': { de: 'Bei uns triffst du auf ein festes Team aus passionierten Artists und ein ständig wechselndes Line-up an internationalen Gästen. Was uns alle verbindet? Die Liebe zum präzisen Handwerk.', en: 'Here you\'ll find a dedicated team of passionate artists and an ever-changing lineup of international guests. What unites us all? The love of precise craftsmanship.' },

  // Values
  'values.title': { de: 'Bei uns stehst du im Mittelpunkt', en: 'You Are at the Center' },
  'values.v1.title': { de: 'Zeit für dich', en: 'Time for You' },
  'values.v1.text': { de: 'Bei uns gibt es keine Massenabfertigung. Wir nehmen uns die Zeit, die deine Idee verdient, und sorgen dafür, dass du dich ab der ersten Sekunde bei uns wohlfühlst.', en: 'No assembly line here. We take the time your idea deserves and make sure you feel comfortable from the very first second.' },
  'values.v2.title': { de: 'Wahres Handwerk', en: 'True Craft' },
  'values.v2.text': { de: 'Tinte ist Präzisionsarbeit. Wir vereinen höchste Qualität mit künstlerischer Leidenschaft. Jeder Nadelstich sitzt, weil wir unser Handwerk nicht nur beherrschen, sondern lieben.', en: 'Ink is precision work. We combine the highest quality with artistic passion. Every needle stroke is perfect because we don\'t just master our craft — we love it.' },
  'values.v3.title': { de: 'Echtes Vertrauen', en: 'Real Trust' },
  'values.v3.text': { de: 'Ein Tattoo bleibt für immer. Deshalb setzen wir auf ehrliche Beratung und volle Transparenz. Wir bauen keine Kundenkartei, sondern langfristige Beziehungen.', en: 'A tattoo lasts forever. That\'s why we rely on honest consultation and full transparency. We don\'t build client files — we build lasting relationships.' },

  // Artists
  'artists.title': { de: 'Unsere Artists', en: 'Our Artists' },
  'artists.all': { de: 'Alle Artists', en: 'All Artists' },

  // Process
  'process.title': { de: 'Dein Weg zum Tattoo', en: 'Your Path to a Tattoo' },
  'process.intro': { de: 'Ein professionelles Ergebnis braucht eine klare Struktur. Wir begleiten dich Schritt für Schritt.', en: 'A professional result needs a clear structure. We guide you step by step.' },
  'process.s1.title': { de: 'Beratung & Planung', en: 'Consultation & Planning' },
  'process.s1.text': { de: 'Alles beginnt mit deiner Idee. Wir besprechen Motiv und Platzierung und beraten dich ehrlich zur langfristigen Umsetzbarkeit deines Projekts.', en: 'Everything starts with your idea. We discuss the motif and placement and advise you honestly on the long-term feasibility of your project.' },
  'process.s2.title': { de: 'Entwurf & Vorbereitung', en: 'Design & Preparation' },
  'process.s2.text': { de: 'Dein Artist erstellt ein individuelles Design. Am Termin passen wir Details gemeinsam an, bis du zu 100 % zufrieden bist. Erst dann starten wir.', en: 'Your artist creates a custom design. At the appointment, we adjust details together until you\'re 100% satisfied. Only then do we start.' },
  'process.s3.title': { de: 'Präzision & Hygiene', en: 'Precision & Hygiene' },
  'process.s3.text': { de: 'Wir setzen dein Motiv in ruhiger Atmosphäre präzise um. Höchste Hygienestandards und eine ausführliche Pflegeberatung sind bei uns Standard.', en: 'We execute your design precisely in a calm atmosphere. The highest hygiene standards and thorough aftercare advice are our standard.' },

  // Contact
  'contact.title': { de: 'Zeit für dein\nneues Tattoo', en: 'Time for Your\nNew Tattoo' },
  'contact.text': { de: 'Bereit für dein nächstes Tattoo? Beschreibe uns kurz deine Idee, die gewünschte Stelle und den Stil. Wir melden uns zeitnah bei dir.', en: 'Ready for your next tattoo? Briefly describe your idea, the desired placement, and the style. We\'ll get back to you soon.' },

  // Footer
  'footer.tagline': { de: 'Mehr als nur Tinte unter deiner Haut. Ein Raum für echte Beziehungen, wo Handwerk, Vertrauen und die Menschen zählen.', en: 'More than just ink under your skin. A space for real relationships, where craft, trust, and the people behind it all matter.' },
  'footer.nav': { de: 'Navigation', en: 'Navigation' },
  'footer.social': { de: 'Social', en: 'Social' },
};

export function useTranslate() {
  const { lang } = useLang();
  return (key: string): string => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang];
  };
}
