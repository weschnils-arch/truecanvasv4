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

type Translations = Record<string, { de: string; en: string }>;

const t: Translations = {
  /* ───────── NAV ───────── */
  'nav.artists': { de: 'Artists', en: 'Artists' },
  'nav.studio': { de: 'Studio', en: 'Studio' },
  'nav.info': { de: 'Info', en: 'Info' },
  'nav.extras': { de: 'Extras', en: 'Extras' },
  'nav.faq': { de: 'FAQ', en: 'FAQ' },
  'nav.blog': { de: 'Blog', en: 'Blog' },
  'nav.removal': { de: 'Tattoo-Entfernung', en: 'Tattoo Removal' },
  'nav.piercing': { de: 'Piercing (Mayduna)', en: 'Piercing (Mayduna)' },
  'nav.care': { de: 'Pflegeempfehlung', en: 'Aftercare' },
  'nav.vouchers': { de: 'Gutscheine', en: 'Vouchers' },
  'nav.cta': { de: 'Termin anfragen', en: 'Book Appointment' },
  'nav.home': { de: 'Home — True Canvas', en: 'Home — True Canvas' },
  'nav.menu': { de: 'Menü', en: 'Menu' },

  /* ───────── HERO ───────── */
  'hero.tagline': { de: 'Gemessen in Jahreszeiten, nicht in Lärm', en: 'Measured in seasons, not noise' },

  /* ───────── HOMEPAGE ───────── */
  // V3 verbatim — 2-column "Wo Kunst ein Zuhause hat" block
  'home.studio.title': { de: 'Wo Kunst ein\nZuhause hat', en: 'Where Art\nFinds a Home' },
  'home.studio.p1': {
    de: 'Als Max True Canvas 2018 mitten in Wien gründete, war die Vision klar: Ein Studio zu schaffen, das die typischen Klischees hinter sich lässt.',
    en: 'When Max founded True Canvas in the heart of Vienna in 2018, the vision was clear: to create a studio that leaves typical clichés behind.',
  },
  'home.studio.p2': {
    de: 'Unser Raum ist hell, modern und einladend – ein Ort, an dem du dich sicher und verstanden fühlst, während wir deine Ideen zum Leben erwecken.',
    en: 'Our space is bright, modern, and inviting – a place where you feel safe and understood while we bring your ideas to life.',
  },
  'home.studio.p3': {
    de: 'Bei uns triffst du auf ein festes Team aus passionierten Artists und ein ständig wechselndes Line-up an internationalen Gästen. Was uns alle verbindet? Die Liebe zum präzisen Handwerk.',
    en: 'Here you\'ll find a dedicated team of passionate artists and an ever-changing lineup of international guests. What unites us all? The love of precise craftsmanship.',
  },
  'home.studio.threebuildings': { de: '3 Studios in einem Gebäude', en: '3 Studios Under One Roof' },
  'home.studio.label': { de: 'Studio', en: 'Studio' },

  'home.values.eyebrow': { de: 'Unsere Werte', en: 'Our Values' },
  'home.values.title': { de: 'Bei uns stehst du im Mittelpunkt', en: 'You Are at the Center' },
  'home.values.v1.title': { de: 'Zeit für dich', en: 'Time for You' },
  'home.values.v1.text': {
    de: 'Bei uns gibt es keine Massenabfertigung. Wir nehmen uns die Zeit, die deine Idee verdient, und sorgen dafür, dass du dich ab der ersten Sekunde bei uns wohlfühlst.',
    en: 'No assembly line. We take the time your idea deserves and make sure you feel at home from the first second.',
  },
  'home.values.v2.title': { de: 'Wahres Handwerk', en: 'True Craft' },
  'home.values.v2.text': {
    de: 'Tinte ist Präzisionsarbeit. Wir vereinen höchste Qualität mit künstlerischer Leidenschaft. Jeder Nadelstich sitzt, weil wir unser Handwerk nicht nur beherrschen, sondern lieben.',
    en: 'Ink is precision work. We combine the highest quality with artistic passion. Every stroke lands because we don\'t just master our craft — we love it.',
  },
  'home.values.v3.title': { de: 'Echtes Vertrauen', en: 'Real Trust' },
  'home.values.v3.text': {
    de: 'Ein Tattoo bleibt für immer. Deshalb setzen wir auf ehrliche Beratung und volle Transparenz. Wir bauen keine Kundenkartei, sondern langfristige Beziehungen.',
    en: 'A tattoo lasts forever. That\'s why we stand for honest advice and full transparency. We don\'t build client files — we build long-term relationships.',
  },

  // V3 verbatim labels
  'home.artists.title': { de: 'Unsere Artists', en: 'Our Artists' },
  'home.artists.all':   { de: 'Alle Artists',   en: 'All Artists' },

  'home.process.eyebrow': { de: 'Der Prozess', en: 'The Process' },
  'home.process.title': { de: 'Dein Weg zum Tattoo', en: 'Your Path to a Tattoo' },
  'home.process.intro': {
    de: 'Ein professionelles Ergebnis braucht eine klare Struktur. Wir begleiten dich Schritt für Schritt.',
    en: 'A professional result needs a clear structure. We guide you step by step.',
  },
  'home.process.s1.title': { de: 'Beratung & Planung', en: 'Consultation & Planning' },
  'home.process.s1.text': {
    de: 'Alles beginnt mit deiner Idee. Wir besprechen Motiv und Platzierung und beraten dich ehrlich zur langfristigen Umsetzbarkeit deines Projekts.',
    en: 'It all starts with your idea. We discuss motif and placement and advise you honestly on the long-term feasibility of your piece.',
  },
  'home.process.s2.title': { de: 'Entwurf & Vorbereitung', en: 'Design & Preparation' },
  'home.process.s2.text': {
    de: 'Dein Artist erstellt ein individuelles Design. Am Termin passen wir Details gemeinsam an, bis du zu 100% zufrieden bist. Erst dann starten wir.',
    en: 'Your artist creates a custom design. At the appointment we refine details together until you\'re 100% satisfied. Only then do we start.',
  },
  'home.process.s3.title': { de: 'Präzision & Hygiene', en: 'Precision & Hygiene' },
  'home.process.s3.text': {
    de: 'Wir setzen dein Motiv in ruhiger Atmosphäre präzise um. Höchste Hygienestandards und eine ausführliche Pflegeberatung sind bei uns Standard.',
    en: 'We execute your piece precisely in a calm atmosphere. The highest hygiene standards and thorough aftercare are our norm.',
  },
  'home.process.cta': { de: 'Termin anfragen', en: 'Book Appointment' },

  // V2 Testimonials section ("Feedback")
  'testi.eyebrow': { de: 'Kundenstimmen', en: 'Testimonials' },
  'testi.title':   { de: 'Feedback',       en: 'Feedback' },
  'testi.google':  { de: 'Basierend auf Google Rezensionen', en: 'Based on Google Reviews' },
  'testi.date.2weeks':  { de: 'vor 2 Wochen',  en: '2 weeks ago' },
  'testi.date.3weeks':  { de: 'vor 3 Wochen',  en: '3 weeks ago' },
  'testi.date.1month':  { de: 'vor 1 Monat',   en: '1 month ago' },
  'testi.date.2months': { de: 'vor 2 Monaten', en: '2 months ago' },
  'testi.date.3months': { de: 'vor 3 Monaten', en: '3 months ago' },
  'testi.1.text': { de: 'Die ruhigste Studio-Atmosphäre, in der ich je war. Das Tattoo ist perfekt geheilt und sieht fantastisch aus.', en: 'The calmest studio atmosphere I\'ve ever been in. The tattoo healed perfectly and looks fantastic.' },
  'testi.2.text': { de: 'Lena hat mir zugehört, Anpassungen vorgenommen und genau das geliefert, was ich mir vorgestellt habe.', en: 'Lena listened, adjusted the design and delivered exactly what I had imagined.' },
  'testi.3.text': { de: 'Saubere Linien, tolle Energie, null Stress. Ich komme definitiv wieder für mein nächstes Tattoo.', en: 'Clean lines, great energy, zero stress. I\'ll definitely be back for my next tattoo.' },
  'testi.4.text': { de: 'Ein Studio, das wirklich anders ist. Man fühlt sich sofort willkommen und verstanden. Absolut empfehlenswert!', en: 'A studio that is truly different. You feel welcome and understood straight away. Absolutely recommended.' },
  'testi.5.text': { de: 'Professionell von Anfang bis Ende. Die Beratung war ehrlich und das Ergebnis übertrifft meine Erwartungen.', en: 'Professional from start to finish. The advice was honest and the result exceeds my expectations.' },
  'testi.6.text': { de: 'Mein drittes Tattoo bei True Canvas und jedes Mal bin ich begeistert. Hygiene, Beratung und Ergebnis stimmen einfach.', en: 'My third tattoo at True Canvas and every time I\'m thrilled. Hygiene, advice and result — all right on.' },

  // V2 FAQ section on landing
  'home.faq.eyebrow': { de: 'Häufige Fragen', en: 'FAQ' },
  'home.faq.title':   { de: 'Deine Fragen',   en: 'Your Questions' },
  'faq.allcta':       { de: 'Alle Fragen ansehen', en: 'View All Questions' },

  /* ───────── CTA BAND ───────── */
  'cta.title': { de: 'Bereit für dein Projekt?', en: 'Ready for your project?' },
  'cta.subtitle': {
    de: 'Sende uns deine Idee und wir verbinden dich mit dem passenden Artist.',
    en: 'Send us your idea and we’ll connect you with the right artist.',
  },

  /* ───────── FOOTER ───────── */
  'footer.contact': { de: 'Kontakt', en: 'Contact' },
  'footer.navigation': { de: 'Navigation', en: 'Navigation' },
  'footer.extras': { de: 'Extras', en: 'Extras' },
  'footer.social': { de: 'Folge uns', en: 'Follow Us' },
  'footer.findus': { de: 'Finde uns', en: 'Find Us' },
  'footer.impressum': { de: 'Impressum', en: 'Legal Notice' },
  'footer.datenschutz': { de: 'Datenschutz', en: 'Privacy Policy' },
  'footer.agb': { de: 'AGB', en: 'Terms' },
  'footer.copyright': { de: '© 2026 True Canvas. Wien.', en: '© 2026 True Canvas. Vienna.' },
  'footer.whatsapp': { de: 'WhatsApp Channel', en: 'WhatsApp Channel' },

  /* ───────── ARTISTS PAGE ───────── */
  'artists.eyebrow': { de: 'Das Kollektiv', en: 'The Collective' },
  'artists.title': { de: 'Unsere Artists', en: 'Our Artists' },
  'artists.intro': {
    de: 'Acht Künstler. Acht Handschriften. Vereint unter einem Dach im Herzen Wiens.',
    en: 'Eight artists. Eight signatures. Under one roof in the heart of Vienna.',
  },
  'artists.cta.title': { de: 'Bereit für dein Projekt?', en: 'Ready for your project?' },
  'artists.cta.text': {
    de: 'Sende uns deine Idee und wir verbinden dich mit dem passenden Artist.',
    en: 'Send us your idea and we’ll connect you with the right artist.',
  },
  'artists.cta.button': { de: 'Termin anfragen', en: 'Request appointment' },
  'artists.recruit.title': { de: 'Resident werden?', en: 'Want to become a resident?' },
  'artists.recruit.text': {
    de: 'Wir freuen uns über Bewerbungen von Artists, die unsere Werte teilen.',
    en: 'We welcome applications from artists who share our values.',
  },
  'artists.recruit.button': { de: 'Jetzt bewerben', en: 'Apply now' },
  'artists.filter.all': { de: 'Alle', en: 'All' },
  'artists.more': { de: 'Mehr', en: 'More' },
  'artists.less': { de: 'Weniger', en: 'Less' },
  'artists.comingsoon': { de: 'Coming Soon', en: 'Coming Soon' },
  'artists.empty': { de: 'Keine Artists in dieser Kategorie.', en: 'No artists in this category.' },

  /* ───────── GUEST ARTISTS PAGE ───────── */
  'guest.eyebrow': { de: 'Internationale Gäste', en: 'International Guests' },
  'guest.title': { de: 'Guest Artists', en: 'Guest Artists' },
  'guest.intro': {
    de: 'Neue Perspektiven, neue Techniken. Regelmäßig begrüßen wir internationale Gastkünstler in unserem Studio.',
    en: 'New perspectives, new techniques. We regularly host international guest artists at our studio.',
  },
  'guest.filter.label': { de: 'Stile wählen', en: 'Select Styles' },
  'guest.filter.reset': { de: 'Zurücksetzen', en: 'Reset' },
  'guest.count.one': { de: 'Artist', en: 'artist' },
  'guest.count.many': { de: 'Artists', en: 'artists' },
  'guest.empty': { de: 'Keine Guest Artists in dieser Auswahl.', en: 'No guest artists match this selection.' },
  'guest.apply.eyebrow': { de: 'Für Künstler', en: 'For Artists' },
  'guest.apply.title.l1': { de: 'Dein Guestspot', en: 'Your Guest Spot' },
  'guest.apply.title.l2': { de: 'in Wien', en: 'in Vienna' },
  'guest.apply.text': {
    de: 'Du möchtest als Artist bei True Canvas arbeiten? Wir bieten dir einen voll ausgestatteten Arbeitsplatz in einem modernen, hellen Studio im Herzen Wiens. Schick uns dein Portfolio und deinen Wunschzeitraum.',
    en: 'Want to work as an artist at True Canvas? We offer a fully equipped workstation in a modern, bright studio in the heart of Vienna. Send us your portfolio and preferred dates.',
  },
  'guest.apply.cta': { de: 'Jetzt bewerben', en: 'Apply Now' },

  /* ───────── STUDIO PAGE ───────── */
  'studio.address': { de: 'Weyringergasse 19, 1040 Wien', en: 'Weyringergasse 19, 1040 Vienna' },
  'studio.title': { de: 'Wer wir sind', en: 'Who We Are' },
  'studio.p1': {
    de: 'True Canvas wurde 2019 in Wien gegründet — mit dem Anspruch, einen Ort zu schaffen, an dem höchste künstlerische Qualität auf eine Atmosphäre trifft, in der sich jeder wohlfühlt. Drei Studios unter einem Dach, verbunden durch eine Idee: Tätowieren als Kunst zu verstehen, nicht als Massenware.',
    en: 'True Canvas was founded in Vienna in 2019 — with the ambition to create a place where the highest artistic quality meets an atmosphere where everyone feels at home. Three studios under one roof, connected by one idea: to treat tattooing as art, not mass production.',
  },
  'studio.p2': {
    de: 'Auf über 200m² vereinen wir drei individuelle Studios, einen einladenden Empfangsbereich und einen Raum für Beratungsgespräche. Jedes Detail wurde mit Sorgfalt ausgewählt — weil wir glauben, dass die Umgebung die Kunst prägt.',
    en: 'Across more than 200m² we combine three individual studios, an inviting reception area and a dedicated consultation room. Every detail was chosen with care — because we believe the environment shapes the art.',
  },
  'studio.rooms.eyebrow': { de: 'Drei Räume — eine Vision', en: 'Three Rooms — One Vision' },
  // PLATZHALTER-Texte — vom Client final zu liefern
  'studio.room1.name': { de: 'Der Empfang', en: 'The Reception' },
  'studio.room1.text': {
    de: 'Ein einladender Raum mit warmem Licht und durchdachtem Design. Hier beginnt dein Tattoo-Erlebnis — entspannt, persönlich und mit voller Aufmerksamkeit auf dich.',
    en: 'A welcoming room with warm light and thoughtful design. This is where your tattoo experience begins — relaxed, personal and with full attention on you.',
  },
  // Studio 2 + 3 — V3 verbatim
  'studio.room2.name': { de: 'Das Atelier', en: 'The Atelier' },
  'studio.room2.text': {
    de: 'Hell, modern und auf Präzision ausgelegt. Unser zweites Studio bietet Platz für detailreiches Arbeiten in ruhiger Atmosphäre — mit natürlichem Licht und professionellem Equipment.',
    en: 'Bright, modern and built for precision. Our second studio offers space for detailed work in a calm atmosphere — with natural light and professional equipment.',
  },
  'studio.room3.name': { de: 'Das Gewölbe', en: 'The Vault' },
  'studio.room3.text': {
    de: 'Unter historischen Bögen entsteht zeitgenössische Kunst. Das größte unserer drei Studios vereint Wiener Altbau-Charme mit moderner Tattoo-Ausstattung.',
    en: 'Under historic arches, contemporary art comes to life. The largest of our three studios unites Viennese period charm with modern tattoo equipment.',
  },
  'studio.pullquote': {
    de: 'Ein kuratierter Raum, in dem Tätowieren zur Kunst wird.',
    en: 'A curated space where tattooing becomes art.',
  },
  'studio.atwork': { de: 'Bei uns im Studio', en: 'Inside the Studio' },

  /* ───────── PIERCING / MAYDUNA PAGE ───────── */
  'mayduna.eyebrow': { de: 'In Kooperation mit Mayduna', en: 'In Cooperation with Mayduna' },
  'mayduna.title': { de: 'Piercing', en: 'Piercing' },
  'mayduna.intro': {
    de: 'Professionelle Piercings in der gewohnten True Canvas Atmosphäre. Höchste Standards an Hygiene, Präzision und Ästhetik.',
    en: 'Professional piercings in the familiar True Canvas atmosphere. The highest standards of hygiene, precision and aesthetics.',
  },
  'mayduna.body1': {
    de: 'Piercing ist Körperkunst — genau wie Tätowieren. Deshalb setzen wir auch hier auf höchste Qualität. In Kooperation mit Mayduna bieten wir professionelle Piercings in unserem Studio an. Von klassischen Ohr-Piercings bis hin zu ausgefalleneren Platzierungen — immer mit dem Anspruch an Perfektion und Sicherheit.',
    en: 'Piercing is body art — just like tattooing. That\'s why we insist on the highest quality here too. In cooperation with Mayduna, we offer professional piercings in our studio. From classic ear piercings to more unusual placements — always with a commitment to perfection and safety.',
  },
  'mayduna.body2': {
    de: 'Mayduna ist bekannt für eine einfühlsame Arbeitsweise, schnelle und präzise Technik sowie eine umfassende Beratung zu Schmuckwahl und Pflege. Die Termine finden regelmäßig in unserem Studio statt.',
    en: 'Mayduna is known for an empathetic approach, fast and precise technique, and thorough advice on jewellery selection and care. Appointments take place regularly at our studio.',
  },
  'mayduna.partner.label': { de: 'Dein Partner', en: 'Your Partner' },
  'mayduna.partner.name': { de: 'Mayduna', en: 'Mayduna' },
  'mayduna.partner.text': {
    de: 'Professionelles Piercing mit Leidenschaft und Präzision. Termine regelmäßig bei True Canvas.',
    en: 'Professional piercing with passion and precision. Appointments regularly at True Canvas.',
  },
  'mayduna.partner.cta': { de: 'Piercing Termin buchen', en: 'Book Piercing Appointment' },
  'mayduna.why': { de: 'Warum bei uns', en: 'Why Us' },
  'mayduna.feature1.title': { de: 'Steriler Arbeitsbereich', en: 'Sterile Workspace' },
  'mayduna.feature1.text': { de: 'Höchste Hygienestandards in jedem Schritt. Alle Werkzeuge werden sterilisiert und nur einmal verwendet.', en: 'Highest hygiene standards at every step. All tools are sterilised and single-use.' },
  'mayduna.feature2.title': { de: 'Premium Schmuck', en: 'Premium Jewellery' },
  'mayduna.feature2.text': { de: 'Ausschließlich hochwertiger Erstschmuck aus Titan und Gold — verträglich, schön und langlebig.', en: 'Exclusively high-quality first jewellery in titanium and gold — compatible, beautiful and durable.' },
  'mayduna.feature3.title': { de: 'Erfahrung & Präzision', en: 'Experience & Precision' },
  'mayduna.feature3.text': { de: 'Mayduna bringt jahrelange Erfahrung und ein geschultes Auge für perfekte Platzierung mit.', en: 'Mayduna brings years of experience and a trained eye for perfect placement.' },
  'mayduna.feature4.title': { de: 'Individuelle Beratung', en: 'Individual Advice' },
  'mayduna.feature4.text': { de: 'Vor jedem Piercing besprechen wir gemeinsam die beste Position, den passenden Schmuck und alles zur Pflege.', en: 'Before every piercing we discuss the best position, matching jewellery and everything about aftercare.' },
  'mayduna.feature5.title': { de: 'Nachsorge inklusive', en: 'Aftercare Included' },
  'mayduna.feature5.text': { de: 'Wir begleiten dich auch nach dem Stechen — mit Pflegetipps und einem offenen Ohr für alle Fragen.', en: 'We support you after the piercing too — with care tips and an open ear for any question.' },
  'mayduna.feature6.title': { de: 'Studio-Atmosphäre', en: 'Studio Atmosphere' },
  'mayduna.feature6.text': { de: 'Kein steriles Kettengeschäft, sondern ein warmer, einladender Ort mit persönlicher Betreuung.', en: 'No sterile chain shop — a warm, inviting place with personal care.' },
  'mayduna.contact.line': { de: 'Fragen zum Piercing? Schreib uns.', en: 'Questions about piercing? Write to us.' },

  /* ───────── LASER / TATTOO REMOVAL ───────── */
  'laser.eyebrow': { de: 'In Kooperation mit Dr. Petra Hirtler', en: 'In Cooperation with Dr. Petra Hirtler' },
  'laser.title': { de: 'Tattoo\u00adentfernung', en: 'Tattoo Removal' },
  'laser.intro': {
    de: 'Platz für Neues schaffen. Dank fortgeschrittener Lasertechniken gibt es heute exzellente Möglichkeiten, ungeliebte Tattoos zu entfernen.',
    en: 'Make space for something new. Thanks to advanced laser technology, there are excellent ways today to remove unwanted tattoos.',
  },
  'laser.body1': {
    de: 'Manchmal kommt es vor, dass man eine Tätowierung bereut, die Lebensumstände sich ändern oder sich der Geschmack in eine andere Richtung entwickelt hat und man eine Tattooentfernung in Betracht zieht. Mittlerweile gibt es, dank fortgeschrittener Lasertechniken, gute Möglichkeiten ein ungeliebtes Tattoo wieder loszuwerden.',
    en: 'Sometimes you regret a tattoo, life circumstances change, or taste moves in a different direction and removal starts to make sense. Thanks to modern laser techniques, there are now good options to get rid of an unwanted tattoo.',
  },
  'laser.body2': {
    de: 'Auch als Vorbereitung, um bei einem Cover-up das bestmögliche Ergebnis erzielen zu können, kann eine teilweise Entfernung einer alten Tätowierung sinnvoll sein.',
    en: 'Partial removal of an old tattoo can also make sense as preparation for a cover-up, to achieve the best possible result.',
  },
  'laser.body3': {
    de: 'Solltest du die Kombination aus Laserbehandlung und Cover-up in Betracht ziehen, stimme dich bitte unbedingt vorher mit dem Tätowierer deiner Wahl ab, damit wir abklären können, ob deine Wünsche umgesetzt werden können.',
    en: 'If you\'re considering combining laser treatment with a cover-up, please coordinate with your chosen tattooer in advance so we can confirm your vision can be realised.',
  },
  'laser.pullquote': {
    de: '"Manchmal braucht es einen Neuanfang. Wir sorgen dafür, dass dieser so sanft wie möglich verläuft."',
    en: '"Sometimes a fresh start is needed. We make sure it happens as gently as possible."',
  },
  'laser.process.title': { de: 'Der Prozess', en: 'The Process' },
  'laser.step1.title': { de: 'Erstgespräch', en: 'Initial Consultation' },
  'laser.step1.text': {
    de: 'Dr. Hirtler begutachtet dein Tattoo und bespricht mit dir die Möglichkeiten, den voraussichtlichen Aufwand und die zu erwartenden Ergebnisse.',
    en: 'Dr. Hirtler assesses your tattoo and discusses options, the likely effort, and the results you can expect.',
  },
  'laser.step2.title': { de: 'Laserbehandlung', en: 'Laser Treatment' },
  'laser.step2.text': {
    de: 'Mit modernster Lasertechnologie werden die Farbpigmente in der Haut aufgebrochen. Der Körper baut diese dann natürlich ab.',
    en: 'The latest laser technology breaks down the colour pigments in your skin. Your body then clears them naturally.',
  },
  'laser.step3.title': { de: 'Heilungsphase', en: 'Healing Phase' },
  'laser.step3.text': {
    de: 'Zwischen den Sitzungen braucht deine Haut Zeit zur Regeneration. In der Regel sind mehrere Sitzungen im Abstand von einigen Wochen nötig.',
    en: 'Between sessions your skin needs time to regenerate. Typically several sessions spaced a few weeks apart are required.',
  },
  'laser.doctor.eyebrow': { de: 'Deine Spezialistin', en: 'Your Specialist' },
  'laser.doctor.name': { de: 'Dr. Petra Hirtler', en: 'Dr. Petra Hirtler' },
  'laser.doctor.location': { de: 'Medizin am Hauptbahnhof, Wien', en: 'Medizin am Hauptbahnhof, Vienna' },
  'laser.doctor.text': {
    de: 'Bei Dr. Petra Hirtler seid ihr in guten Händen. Die Spezialistin auf dem Gebiet Laserentfernung ist sowohl kompetent als auch erfrischend freundlich. Sie erklärt den Prozess der Tattooentfernung ausführlich und erzielt, je nach Beschaffenheit der Haut und der körpereigenen Regeneration, optimale Ergebnisse.',
    en: 'You\'re in good hands with Dr. Petra Hirtler. A specialist in laser removal who is both highly competent and refreshingly kind. She explains the process in detail and achieves the best possible results given skin condition and your body\'s regeneration.',
  },
  'laser.doctor.cta': { de: 'Termin buchen', en: 'Book Appointment' },
  'laser.contact.line': { de: 'Fragen zur Tattooentfernung? Schreib uns.', en: 'Questions about tattoo removal? Write to us.' },

  /* ───────── FAQ content (homepage + FAQ page share) ───────── */
  'faq.q1.question': { de: 'Wie buche ich einen Termin?', en: 'How do I book an appointment?' },
  'faq.q1.answer': {
    de: 'Du kannst ganz einfach über unser Buchungsformular einen Termin anfragen. Beschreibe deine Idee, die gewünschte Stelle und den Stil. Wir melden uns zeitnah bei dir.',
    en: 'Easily request an appointment through our booking form. Describe your idea, the desired placement and the style. We\'ll get back to you quickly.',
  },
  'faq.q2.question': { de: 'Wie lange dauert die Heilung?', en: 'How long does healing take?' },
  'faq.q2.answer': {
    de: 'Die erste Heilungsphase dauert etwa 2-3 Wochen. Vollständig verheilt ist ein Tattoo nach etwa 6-8 Wochen. Wir geben dir eine detaillierte Pflegeanleitung mit.',
    en: 'The first healing phase takes about 2–3 weeks. A tattoo is fully healed after about 6–8 weeks. We provide detailed aftercare instructions.',
  },
  'faq.q3.question': { de: 'Was kostet ein Tattoo?', en: 'What does a tattoo cost?' },
  'faq.q3.answer': {
    de: 'Die Kosten hängen von Größe, Detailgrad und Zeitaufwand ab. Wir besprechen den Preis transparent im Vorfeld des Termins.',
    en: 'Price depends on size, level of detail and time required. We discuss the price transparently before the appointment.',
  },
  'faq.q4.question': { de: 'Kann ich mein eigenes Design mitbringen?', en: 'Can I bring my own design?' },
  'faq.q4.answer': {
    de: 'Absolut! Wir arbeiten gerne mit deinen Ideen. Unsere Artists beraten dich, wie das Design optimal umgesetzt werden kann.',
    en: 'Absolutely. We love working with your ideas. Our artists will advise you on how to execute the design best.',
  },
  'faq.q5.question': { de: 'Bietet ihr auch Piercings an?', en: 'Do you also offer piercings?' },
  'faq.q5.answer': {
    de: 'Ja, in Kooperation mit Mayduna bieten wir professionelle Piercings in der gewohnten True Canvas Atmosphäre an.',
    en: 'Yes — in cooperation with Mayduna, we offer professional piercings in the familiar True Canvas atmosphere.',
  },

  /* ───────── TESTIMONIALS ───────── */
  'testimonial.1.quote': {
    de: 'Die ruhigste Studio-Atmosphäre, in der ich je war. Das Tattoo ist perfekt geheilt und sieht fantastisch aus.',
    en: 'The calmest studio atmosphere I\'ve ever been in. The tattoo healed perfectly and looks fantastic.',
  },
  'testimonial.1.role': { de: 'Kunde', en: 'Client' },
  'testimonial.2.quote': {
    de: 'Lena hat mir zugehört, Anpassungen vorgenommen und genau das geliefert, was ich mir vorgestellt habe.',
    en: 'Lena listened, adjusted the design and delivered exactly what I had imagined.',
  },
  'testimonial.2.role': { de: 'Kundin', en: 'Client' },
  'testimonial.3.quote': {
    de: 'Saubere Linien, tolle Energie, null Stress. Ich komme definitiv wieder für mein nächstes Tattoo.',
    en: 'Clean lines, great energy, zero stress. I\'ll definitely be back for my next tattoo.',
  },
  'testimonial.3.role': { de: 'Kunde', en: 'Client' },

  /* ───────── AFTERCARE PAGE ───────── */
  'care.eyebrow': { de: 'Aftercare', en: 'Aftercare' },
  'care.title.l1': { de: 'Pflege deines', en: 'Caring for Your' },
  'care.title.l2': { de: 'neuen Tattoos', en: 'New Tattoo' },
  'care.quote': { de: '"Ein perfektes Ergebnis braucht die richtige Heilung."', en: '"A perfect result needs the right healing."' },
  'care.phase1.period': { de: 'Tag 1 – 7', en: 'Day 1 – 7' },
  'care.phase1.title':  { de: 'Die Membran arbeitet', en: 'The Membrane Does the Work' },
  'care.phase1.i1': {
    de: 'Solange die Folie auf der Haut ist machst du gar nichts. Nichts. Überhaupt Nichts. Das ist eine der wichtigsten Pflegeempfehlungen überhaupt — überfordere deine Haut nicht.',
    en: 'As long as the foil is on your skin, do nothing. Nothing. Absolutely nothing. This is one of the most important aftercare rules — don\'t overwhelm your skin.',
  },
  'care.phase1.i2': {
    de: 'Sollte sich in den ersten Stunden eine störende Blase mit Wundflüssigkeit gebildet haben, dann ist das nicht schlimm. Das dickt durch die Verdunstung ein.',
    en: 'If a bubble with wound fluid forms in the first hours, it\'s not a problem. It will thicken as it evaporates.',
  },
  'care.phase1.i3': { de: 'Duschen ist mit der Membran ganz normal möglich.', en: 'Showering is perfectly fine with the membrane.' },
  'care.phase2.period': { de: 'Tag 8', en: 'Day 8' },
  'care.phase2.title':  { de: 'Folie entfernen', en: 'Remove the Foil' },
  'care.phase2.i1': {
    de: 'Nach 7 Tagen entfernst du die Membran, indem du sie an einer Ecke oder Kante anhebst und lauwarmes Wasser zwischen Haut und Folie laufen lässt und dann vorsichtig abziehst.',
    en: 'After 7 days remove the membrane by lifting it at a corner, letting lukewarm water run between skin and foil, and then gently peeling it off.',
  },
  'care.phase2.i2': {
    de: 'Wasche die Haut mit warmem Wasser und PH-neutraler Seife mit sauberen, frisch gewaschenen Händen.',
    en: 'Wash the skin with warm water and pH-neutral soap using clean, freshly washed hands.',
  },
  'care.phase2.i3': {
    de: 'Trockne die Haut anschließend mit einem Einwegtuch (Küchenrolle) tupfend ab.',
    en: 'Then pat the skin dry with a single-use cloth (paper towel).',
  },
  'care.phase3.period': { de: 'Tag 8 – 22', en: 'Day 8 – 22' },
  'care.phase3.title':  { de: 'Pflege & Heilung', en: 'Care & Healing' },
  'care.phase3.i1': {
    de: 'Bis etwa zwei Wochen nach dem Ablösen der Folie wiederholst du das hauchdünne Eincremen (mit sauberen, gewaschenen Händen) täglich 2-3 Mal.',
    en: 'For about two weeks after removing the foil, repeat the paper-thin application of cream (with clean, washed hands) 2–3 times a day.',
  },
  'care.phase3.i2': {
    de: 'Verwende ausschließlich die im Studio erhältlichen Aftercare-Cremes.',
    en: 'Use only the aftercare creams available at the studio.',
  },
  'care.phase3.i3': { de: 'Weniger ist mehr — eine dünne Schicht reicht völlig aus.', en: 'Less is more — a thin layer is all you need.' },

  'care.donts.eyebrow': { de: 'Wichtig', en: 'Important' },
  'care.donts.title.l1': { de: 'Was du tun oder', en: 'What to Do or' },
  'care.donts.title.l2': { de: 'lassen sollst', en: 'Avoid' },
  'care.dont1.label': { de: '3 – 4 Wochen', en: '3 – 4 Weeks' },
  'care.dont1.text':  { de: 'Kein Schwimmbad, Meer oder Badewanne — die Haut quillt auf und die Farbe kann beeinträchtigt werden.', en: 'No swimming pool, sea or bathtub — the skin swells and colour can be affected.' },
  'care.dont2.label': { de: 'Sonne', en: 'Sun' },
  'care.dont2.text':  { de: '3-4 Wochen lang tabu. Danach ist Sonnenschutz mit hohem LSF absolute Pflicht.', en: 'Off-limits for 3–4 weeks. After that, sunscreen with high SPF is absolutely mandatory.' },
  'care.dont3.label': { de: 'Körperpflege', en: 'Body Care' },
  'care.dont3.text':  { de: 'Keine Saunagänge, Dampfbäder oder intensiver Sport. Schwitzen auf der frischen Wunde unbedingt vermeiden.', en: 'No sauna, steam baths or intense sport. Avoid sweating on the fresh wound at all costs.' },
  'care.dont4.label': { de: 'Produkte', en: 'Products' },
  'care.dont4.text':  { de: 'Verwende nur die empfohlenen Aftercare-Produkte. Keine parfümierten Lotions oder Cremes.', en: 'Use only the recommended aftercare products. No perfumed lotions or creams.' },
  'care.dont5.label': { de: 'Kleidung', en: 'Clothing' },
  'care.dont5.text':  { de: 'Vermeide enge, reibende Kleidung auf dem frischen Tattoo. Lockere, atmungsaktive Stoffe sind ideal.', en: 'Avoid tight, chafing clothing on the fresh tattoo. Loose, breathable fabrics are ideal.' },
  'care.dont6.label': { de: 'Berührung', en: 'Touching' },
  'care.dont6.text':  { de: 'Nicht kratzen, nicht zupfen. Auch wenn es juckt — lass die Haut in Ruhe heilen.', en: 'Do not scratch, do not pick. Even if it itches — let the skin heal in peace.' },

  'care.contact.quote': {
    de: '"Sollte etwas nicht so aussehen wie erwartet oder du dir unsicher sein, melde dich jederzeit bei uns."',
    en: '"If anything doesn\'t look right or you\'re unsure, reach out to us any time."',
  },

  /* ───────── FAQ PAGE (categorised, full set) ───────── */
  'faqp.eyebrow': { de: 'Wissenswertes', en: 'Good to Know' },
  'faqp.title.l1': { de: 'Häufige', en: 'Frequently' },
  'faqp.title.l2': { de: 'Fragen', en: 'Asked' },
  'faqp.intro': {
    de: 'Alles, was du vor deinem Besuch bei uns wissen solltest. Sollte deine Frage nicht dabei sein, schreib uns gerne eine Mail.',
    en: 'Everything you should know before visiting us. If your question isn\'t listed, drop us a line.',
  },
  'faqp.cat1': { de: 'Termine & Buchung', en: 'Appointments & Booking' },
  'faqp.cat2': { de: 'Ablauf & Vorbereitung', en: 'Process & Preparation' },
  'faqp.cat3': { de: 'Preise & Bezahlung', en: 'Pricing & Payment' },
  'faqp.cat4': { de: 'Spezielle Anfragen', en: 'Special Requests' },
  'faqp.contact.line': { de: 'Noch Fragen? Wir helfen gerne weiter.', en: 'More questions? We\'re happy to help.' },

  'faqp.c1.q1.q': { de: 'Wie komme ich an einen Termin?', en: 'How do I get an appointment?' },
  'faqp.c1.q1.a': { de: 'Sofern gerade Termine vergeben werden, was über sämtliche Social Media Kanäle und auch hier bekannt gegeben wird, kannst du über „Bookings" eine Anfrage bezüglich deines Projektes stellen.', en: 'When bookings are open (announced via all social media channels and here on the site), you can submit a request about your project via "Bookings".' },
  'faqp.c1.q2.q': { de: 'Wie lange wartet man auf einen Termin?', en: 'How long is the waiting time?' },
  'faqp.c1.q2.a': { de: 'Mit etwas Glück werden gerade Termine vergeben und du kannst deine Anfrage an den Tattoo Artist deiner Wahl schicken. Unsere Tätowierer zählen zu den Besten in ihrem Gebiet und sind meistens schon für lange Zeit im Vorhinein ausgebucht. Melde dich also möglichst früh mit deiner Tattoo Idee.', en: 'With a bit of luck bookings are open and you can send your request to the artist of your choice. Our tattooers are among the best in their field and are usually booked well in advance. Reach out as early as possible with your idea.' },
  'faqp.c1.q3.q': { de: 'Gibt es eine Warteliste?', en: 'Is there a waiting list?' },
  'faqp.c1.q3.a': { de: 'Das handhabt jeder unserer Tattoo Artists individuell, generell ist es so, dass nur Projekte in dem Zeitraum angenommen werden, in dem via Instagram „Books open" beim jeweiligen Profil zu lesen ist.', en: 'Each artist handles this individually; in general, projects are only accepted during periods when "Books open" is announced on that artist\'s Instagram profile.' },
  'faqp.c1.q4.q': { de: 'Wann sind eure Bookings wieder offen?', en: 'When are your bookings open again?' },
  'faqp.c1.q4.a': { de: 'Bestandskunden haben Vorrang, weshalb diese Frage nur schwer zu beantworten ist. Wir bemühen uns alle 3 Monate die Möglichkeit zu einer Terminvereinbarung zu geben. Gerne kannst du uns trotzdem eine Anfrage senden.', en: 'Returning clients have priority, which makes this hard to answer. We aim to open bookings every 3 months. You\'re welcome to send us a request anyway.' },
  'faqp.c1.q5.q': { de: 'Gibt es bei euch Walk-ins?', en: 'Do you accept walk-ins?' },
  'faqp.c1.q5.a': { de: 'Nein, das Tattoo Studio True Canvas ist ausschließlich nach Terminvereinbarung geöffnet.', en: 'No — True Canvas is by appointment only.' },

  'faqp.c2.q1.q': { de: 'Darf ich zu einem Beratungsgespräch kommen?', en: 'Can I come in for a consultation?' },
  'faqp.c2.q1.a': { de: 'Ob und in welcher Form eine Beratung notwendig ist, besprichst du mit deinem Tätowierer persönlich, wenn der Artist deiner Wahl dein Projekt annimmt.', en: 'Whether and how a consultation is needed is something you\'ll discuss with your artist personally, once they\'ve accepted your project.' },
  'faqp.c2.q2.q': { de: 'Sehe ich Entwürfe vorab?', en: 'Will I see the design in advance?' },
  'faqp.c2.q2.a': { de: 'Ja, bei deinem Termin. Es werden vorab keine Entwürfe zugesandt. Dein Tätowierer erstellt im Vorfeld Vorschläge, aus denen ausgewählt werden kann und an denen dann noch gemeinsam gefeilt wird, bis dein Custom Tattoo perfekt ist.', en: 'Yes — at your appointment. Designs are not sent in advance. Your artist will prepare options beforehand and you\'ll refine them together until your custom tattoo is perfect.' },
  'faqp.c2.q3.q': { de: 'Wie läuft ein Tätowiertermin ab?', en: 'How does a tattoo appointment work?' },
  'faqp.c2.q3.a': { de: 'Zuerst siehst du die Ideen deines Tätowierers, dann wird ausgewählt, perfektioniert und finalisiert. Anschließend erstellt dein Artist das Stencil, welches in mehreren Größen ausgedruckt wird. Der Platz wird hergerichtet, sämtliche Flächen desinfiziert und deine Haut wird vorbereitet. Ist das Stencil angebracht, beginnt die eigentliche Arbeit. Im Anschluss wird dein Tattoo versorgt und du bekommst genaue Pflegeanweisungen.', en: 'First you see your artist\'s ideas, then pick, refine and finalise. Next the artist creates the stencil and prints it in several sizes. The workstation is prepared, all surfaces disinfected, your skin is prepped. Once the stencil is applied, the actual work begins. Afterwards your tattoo is cared for and you receive detailed aftercare instructions.' },
  'faqp.c2.q4.q': { de: 'Kann ich meine Haut auf das Tattoo vorbereiten?', en: 'Can I prep my skin for the tattoo?' },
  'faqp.c2.q4.a': { de: 'Du kannst in der Zeit vor deinem Tätowiertermin ausreichend trinken und die Haut täglich durch Bodylotion oder Öl geschmeidig halten, bitte verwende allerdings am Tag des Tätowierens keine Körperpflegeprodukte.', en: 'Drink plenty of water in the time leading up to your appointment and keep your skin supple daily with body lotion or oil. Please don\'t use any body-care products on the day of your appointment.' },
  'faqp.c2.q5.q': { de: 'Gibt es vor meinem Termin etwas zu beachten?', en: 'Anything else to consider before my appointment?' },
  'faqp.c2.q5.a': { de: 'Bitte komm ausgeruht und satt. Am Vortag kein Alkohol, keine Drogen und kein übermäßiger Koffeinkonsum. Keine blutverdünnenden Mittel (z.B. Aspirin) mindestens 24 Stunden vorher.', en: 'Please arrive well-rested and well-fed. The day before: no alcohol, drugs, or excessive caffeine. No blood thinners (e.g. aspirin) for at least 24 hours beforehand.' },
  'faqp.c2.q6.q': { de: 'Tut tätowieren weh?', en: 'Does getting tattooed hurt?' },
  'faqp.c2.q6.a': { de: 'Ja. Je nach Körperstelle variiert die Schmerzempfindlichkeit, tendenziell tut es dort wo du kitzelig bist auch am meisten weh. Vergleichbar ist es mit einer Schürfwunde.', en: 'Yes. Pain sensitivity varies by location — generally it hurts most where you\'re ticklish. It\'s comparable to a graze.' },
  'faqp.c2.q7.q': { de: 'Darf ich jemanden mitbringen?', en: 'Can I bring someone with me?' },
  'faqp.c2.q7.a': { de: 'Bitte komm alleine. Tätowieren ist eine Tätigkeit, die höchste Konzentration fordert. Begleitpersonen dürfen dich gerne bis zu uns bringen und nach dem Termin wieder abholen.', en: 'Please come alone. Tattooing demands full concentration. Companions are welcome to drop you off and pick you up afterwards.' },

  'faqp.c3.q1.q': { de: 'Was kostet ein Tattoo?', en: 'What does a tattoo cost?' },
  'faqp.c3.q1.a': { de: 'Abgerechnet wird pro Stunde, der Stundensatz variiert von Künstler zu Künstler. Die Preise richten sich nach Größe, Details, ob es ein Color oder Black & Grey Tattoo wird und welche Körperstelle tätowiert wird. Bezahlt wird direkt nach dem Tätowieren in bar oder per Überweisung.', en: 'We bill per hour; the hourly rate varies by artist. Price depends on size, detail, whether it\'s colour or black & grey, and body placement. Payment is due directly after the tattoo, in cash or by bank transfer.' },
  'faqp.c3.q2.q': { de: 'Wie hoch ist die Anzahlung?', en: 'How much is the deposit?' },
  'faqp.c3.q2.a': { de: 'Bei der Terminvereinbarung ist eine nicht refundierbare Anzahlung zwischen 100 und 200€ zu leisten, mit welcher dein Termin als bestätigt gilt. Diese wird beim letzten Termin angerechnet. Die Anzahlung ist notwendig, weil ab Terminbestätigung die Arbeit für den Tätowierer beginnt — Bildrecherche, Entwürfe und Zeichnungen.', en: 'When booking, a non-refundable deposit of €100–200 is due, which confirms your appointment. It\'s credited against your final session. The deposit is needed because from the moment of confirmation the artist\'s work begins — reference gathering, sketches and drawings.' },
  'faqp.c3.q3.q': { de: 'Wie kann ich bezahlen?', en: 'How can I pay?' },
  'faqp.c3.q3.a': { de: 'Bezahlt wird direkt nach dem Tätowieren in bar oder per Überweisung. Kartenzahlung ist leider nicht möglich.', en: 'Payment is due directly after the tattoo in cash or by bank transfer. Card payment is unfortunately not available.' },

  'faqp.c4.q1.q': { de: 'Macht ihr Cover-ups?', en: 'Do you do cover-ups?' },
  'faqp.c4.q1.a': { de: 'Das kommt auf den Künstler an. Bei einer Cover-Anfrage sende bitte unbedingt ein Foto mit. Wir haben eine Kooperation mit Frau Dr. Petra Hirtler, die zu covernde Tätowierungen mittels Laser vorbehandelt und aufhellt. Oft ist ein optimales Ergebnis nur mit vorheriger Laserbehandlung zu erzielen.', en: 'It depends on the artist. For cover-up requests please include a photo. We cooperate with Dr. Petra Hirtler, who pre-treats and lightens tattoos for cover-up via laser. Often an optimal result is only possible with prior laser treatment.' },
  'faqp.c4.q2.q': { de: 'Kann man über Narben tätowieren?', en: 'Can you tattoo over scars?' },
  'faqp.c4.q2.a': { de: 'Prinzipiell ist es möglich, allerdings kann im Vorfeld nie genau gesagt werden, wie sich die Farbe verhält. Bei starkem Narbengewebe sollte mit einem Hautarzt abgeklärt werden, ob ein Tattoo möglich ist.', en: 'In principle yes, but it\'s never possible to predict exactly how the ink will behave. For heavy scar tissue a dermatologist should clear whether a tattoo is possible.' },
  'faqp.c4.q3.q': { de: 'Tätowiert ihr über Muttermale?', en: 'Do you tattoo over moles?' },
  'faqp.c4.q3.a': { de: 'Muttermale werden beim Tätowieren ausgelassen. Bei Pigmentflecken ist ein Tattoo prinzipiell möglich, sollte aber mit einem Hautarzt abgeklärt werden.', en: 'Moles are left untouched. Tattoos over pigment spots are generally possible but should be cleared with a dermatologist.' },
  'faqp.c4.q4.q': { de: 'Stecht ihr mitgebrachte Motive?', en: 'Do you tattoo designs I bring in?' },
  'faqp.c4.q4.a': { de: 'Sofern es sich um eine realistische Arbeit handelt und die Vorlage ein Foto ist, ja. Ein mitgebrachtes Bild kann gerne Inspiration sein, eine eins-zu-eins Kopie bekommst du bei uns nicht.', en: 'For realism work where the reference is a photo, yes. A brought-in image is welcome as inspiration — but we don\'t do one-to-one copies.' },
  'faqp.c4.q5.q': { de: 'Tätowiert ihr alles was ich will?', en: 'Will you tattoo anything I want?' },
  'faqp.c4.q5.a': { de: 'Unsere Tätowierer machen das was sie machen gerne und sehr gut. Wir behalten uns vor Projekte abzulehnen, mit denen sich keiner unserer Tätowierer identifizieren kann. Gerne empfehlen wir euch auch andere Studios.', en: 'Our artists do what they love and do it very well. We reserve the right to decline projects that none of our artists can identify with — we\'re happy to recommend other studios.' },
  'faqp.c4.q6.q': { de: 'Tätowiert ihr im Gesicht?', en: 'Do you tattoo faces?' },
  'faqp.c4.q6.a': { de: 'Nein, auf keinen Fall. Dies hat diverse Gründe und wird auch nicht diskutiert.', en: 'No, absolutely not. There are several reasons for this and it\'s not up for discussion.' },

  /* ───────── BLOG PAGE ───────── */
  'blog.eyebrow': { de: 'Journal', en: 'Journal' },
  'blog.title.l1': { de: 'Tattoo', en: 'Tattoo' },
  'blog.title.l2': { de: 'Blog', en: 'Blog' },
  'blog.intro': {
    de: 'Gedanken, Hintergründe und Wissenswertes rund um Tattoos, Haut und Handwerk.',
    en: 'Thoughts, background and good-to-know on tattoos, skin and craft.',
  },
  'blog.search.placeholder': { de: 'Beiträge durchsuchen', en: 'Search articles' },
  'blog.cat.prep': { de: 'Vorbereitung', en: 'Preparation' },
  'blog.cat.skin': { de: 'Haut', en: 'Skin' },
  'blog.cat.fineline': { de: 'Fineline Tattoo', en: 'Fineline Tattoo' },
  'blog.cat.copyright': { de: 'Urheberrecht', en: 'Copyright' },
  'blog.cat.all': { de: 'Alle Beiträge', en: 'All Articles' },

  'blog.post1.title': { de: 'Gut befeuchtet, gut tätowiert', en: 'Well Hydrated, Well Tattooed' },
  'blog.post1.subtitle': { de: 'So bereitest du deine Haut optimal vor', en: 'How to prep your skin properly' },
  'blog.post1.date': { de: 'März 2026', en: 'March 2026' },
  'blog.post1.excerpt': { de: 'Warum du deine Haut vor dem Tätowieren gut mit Feuchtigkeit versorgen solltest — und warum du es am Tag des Termins besser lässt.', en: 'Why you should moisturise your skin well before a tattoo — and why you should skip it on the day itself.' },

  'blog.post2.title': { de: 'Narben werden zu Kunst', en: 'Scars Become Art' },
  'blog.post2.subtitle': { de: 'Tattoos als Heilung', en: 'Tattoos as healing' },
  'blog.post2.date': { de: 'Februar 2026', en: 'February 2026' },
  'blog.post2.excerpt': { de: 'Tattoos über Narben und Dehnungsstreifen: Möglichkeiten, Risiken und wichtige Überlegungen.', en: 'Tattoos over scars and stretch marks: possibilities, risks and key considerations.' },

  'blog.post3.title': { de: 'Fine Line Tattoos', en: 'Fine Line Tattoos' },
  'blog.post3.subtitle': { de: 'Feine Linien — Große Kunst', en: 'Fine lines — big art' },
  'blog.post3.date': { de: 'Februar 2026', en: 'February 2026' },
  'blog.post3.excerpt': { de: 'Fine Line Tattoos haben eine ganz eigene Faszination. Richtige Pflege und die Notwendigkeit des Nachstechens.', en: 'Fine line tattoos have a fascination of their own. Proper care and why touch-ups matter.' },

  'blog.post4.title': { de: 'Tattoo-Alterung erklärt', en: 'Tattoo Aging Explained' },
  'blog.post4.subtitle': { de: 'Was passiert wirklich unter deiner Haut?', en: 'What really happens under your skin?' },
  'blog.post4.date': { de: 'Januar 2026', en: 'January 2026' },
  'blog.post4.excerpt': { de: 'Warum bleibt ein Tattoo eigentlich in der Haut? Eine spannende Reise durch unser Immunsystem und die Hautalterung.', en: 'Why does a tattoo actually stay in the skin? A journey through the immune system and skin aging.' },

  'blog.post5.title': { de: 'Hand- und Fußtattoos', en: 'Hand and Foot Tattoos' },
  'blog.post5.subtitle': { de: 'Warum sie oft nicht halten, was sie versprechen', en: 'Why they often don\'t hold up' },
  'blog.post5.date': { de: 'Dezember 2025', en: 'December 2025' },
  'blog.post5.excerpt': { de: 'Warum Tattoos auf Händen und Füßen häufig verblassen, verschwimmen oder unvollständig heilen.', en: 'Why tattoos on hands and feet often fade, blur or heal incompletely.' },

  'blog.post6.title': { de: 'Tattoo und Urheberrecht', en: 'Tattoos and Copyright' },
  'blog.post6.subtitle': { de: 'Ist mein Tattoo einzigartig?', en: 'Is my tattoo unique?' },
  'blog.post6.date': { de: 'November 2025', en: 'November 2025' },
  'blog.post6.excerpt': { de: 'Der Anspruch eines Tätowierten ist es, etwas Einzigartiges unter die Haut zu bekommen. Doch wie sieht die Rechtslage aus?', en: 'Every tattooed person wants something unique under their skin — but what\'s the legal reality?' },

  'blog.post7.title': { de: 'Tattoo Gurken', en: 'Tattoo Flops' },
  'blog.post7.subtitle': { de: 'Wenn Tattoos daneben gehen', en: 'When tattoos go wrong' },
  'blog.post7.date': { de: 'Oktober 2025', en: 'October 2025' },
  'blog.post7.excerpt': { de: 'Sogenannte Tattoo Gurken — ein Begriff für besonders misslungene Tätowierungen. Wie es dazu kommt und wie man sie vermeidet.', en: '"Tattoo flops" — a term for particularly botched tattoos. How they happen and how to avoid them.' },

  'blog.post8.title': { de: 'Wenn sich ein Tattoo entzündet', en: 'When a Tattoo Gets Infected' },
  'blog.post8.subtitle': { de: 'Ursachen, Erkennung und Behandlung', en: 'Causes, detection and treatment' },
  'blog.post8.date': { de: 'September 2025', en: 'September 2025' },
  'blog.post8.excerpt': { de: 'Keime, Bakterien, Viren und Pilze können eine Infektion verursachen. So erkennst du die Anzeichen und reagierst richtig.', en: 'Germs, bacteria, viruses and fungi can cause infection. How to spot the signs and react correctly.' },

  'blog.cat.tattoo': { de: 'Tattoo', en: 'Tattoo' },
  'blog.cat.aftercare': { de: 'Aftercare', en: 'Aftercare' },
  'blog.search.heading': { de: 'Wissen & Inspiration', en: 'Knowledge & Inspiration' },
  'blog.search.input': { de: 'Suche...', en: 'Search...' },
  'blog.empty': { de: 'Keine Beiträge gefunden.', en: 'No articles found.' },
  'blog.external.heading': { de: 'Empfohlene externe Blogs', en: 'Recommended External Blogs' },

  /* ───────── COMMON ───────── */
  'common.back': { de: 'Zurück', en: 'Back' },
  'common.next': { de: 'Weiter', en: 'Next' },
  'common.external': { de: '↗', en: '↗' },
};

export function useTranslate() {
  const { lang } = useLang();
  return (key: string): string => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang];
  };
}
