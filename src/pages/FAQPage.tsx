import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    category: 'Termine & Buchung',
    questions: [
      { q: 'Wie komme ich an einen Termin?', a: 'Sofern gerade Termine vergeben werden, was über sämtliche Social Media Kanäle und auch hier bekannt gegeben wird, kannst du über „Bookings" eine Anfrage bezüglich deines Projektes stellen.' },
      { q: 'Wie lange wartet man auf einen Termin?', a: 'Mit etwas Glück werden gerade Termine vergeben und du kannst deine Anfrage an den Tattoo Artist deiner Wahl schicken. Unsere Tätowierer zählen zu den Besten in ihrem Gebiet und sind meistens schon für lange Zeit im Vorhinein ausgebucht. Melde dich also möglichst früh mit deiner Tattoo Idee.' },
      { q: 'Gibt es eine Warteliste?', a: 'Das handhabt jeder unserer Tattoo Artists individuell, generell ist es so, dass nur Projekte in dem Zeitraum angenommen werden, in dem via Instagram „Books open" beim jeweiligen Profil zu lesen ist.' },
      { q: 'Wann sind eure Bookings wieder offen?', a: 'Bestandskunden haben Vorrang, weshalb diese Frage nur schwer zu beantworten ist. Wir bemühen uns alle 3 Monate die Möglichkeit zu einer Terminvereinbarung zu geben. Gerne kannst du uns trotzdem eine Anfrage senden.' },
      { q: 'Gibt es bei euch Walk-ins?', a: 'Nein, das Tattoo Studio True Canvas ist ausschließlich nach Terminvereinbarung geöffnet.' },
    ],
  },
  {
    category: 'Ablauf & Vorbereitung',
    questions: [
      { q: 'Darf ich zu einem Beratungsgespräch kommen?', a: 'Ob und in welcher Form eine Beratung notwendig ist, besprichst du mit deinem Tätowierer persönlich, wenn der Artist deiner Wahl dein Projekt annimmt.' },
      { q: 'Sehe ich Entwürfe vorab?', a: 'Ja, bei deinem Termin. Es werden vorab keine Entwürfe zugesandt. Dein Tätowierer erstellt im Vorfeld Vorschläge, aus denen ausgewählt werden kann und an denen dann noch gemeinsam gefeilt wird, bis dein Custom Tattoo perfekt ist.' },
      { q: 'Wie läuft ein Tätowiertermin ab?', a: 'Zuerst siehst du die Ideen deines Tätowierers, dann wird ausgewählt, perfektioniert und finalisiert. Anschließend erstellt dein Artist das Stencil, welches in mehreren Größen ausgedruckt wird. Der Platz wird hergerichtet, sämtliche Flächen desinfiziert und deine Haut wird vorbereitet. Ist das Stencil angebracht, beginnt die eigentliche Arbeit. Im Anschluss wird dein Tattoo versorgt und du bekommst genaue Pflegeanweisungen.' },
      { q: 'Kann ich meine Haut auf das Tattoo vorbereiten?', a: 'Du kannst in der Zeit vor deinem Tätowiertermin ausreichend trinken und die Haut täglich durch Bodylotion oder Öl geschmeidig halten, bitte verwende allerdings am Tag des Tätowierens keine Körperpflegeprodukte.' },
      { q: 'Gibt es vor meinem Termin etwas zu beachten?', a: 'Bitte komm ausgeruht und satt. Am Vortag kein Alkohol, keine Drogen und kein übermäßiger Koffeinkonsum. Keine blutverdünnenden Mittel (z.B. Aspirin) mindestens 24 Stunden vorher.' },
      { q: 'Tut tätowieren weh?', a: 'Ja. Je nach Körperstelle variiert die Schmerzempfindlichkeit, tendenziell tut es dort wo du kitzelig bist auch am meisten weh. Vergleichbar ist es mit einer Schürfwunde.' },
      { q: 'Darf ich jemanden mitbringen?', a: 'Bitte komm alleine. Tätowieren ist eine Tätigkeit, die höchste Konzentration fordert. Begleitpersonen dürfen dich gerne bis zu uns bringen und nach dem Termin wieder abholen.' },
    ],
  },
  {
    category: 'Preise & Bezahlung',
    questions: [
      { q: 'Was kostet ein Tattoo?', a: 'Abgerechnet wird pro Stunde, der Stundensatz variiert von Künstler zu Künstler. Die Preise richten sich nach Größe, Details, ob es ein Color oder Black & Grey Tattoo wird und welche Körperstelle tätowiert wird. Bezahlt wird direkt nach dem Tätowieren in bar oder per Überweisung.' },
      { q: 'Wie hoch ist die Anzahlung?', a: 'Bei der Terminvereinbarung ist eine nicht refundierbare Anzahlung zwischen 100 und 200€ zu leisten, mit welcher dein Termin als bestätigt gilt. Diese wird beim letzten Termin angerechnet. Die Anzahlung ist notwendig, weil ab Terminbestätigung die Arbeit für den Tätowierer beginnt — Bildrecherche, Entwürfe und Zeichnungen.' },
      { q: 'Wie kann ich bezahlen?', a: 'Bezahlt wird direkt nach dem Tätowieren in bar oder per Überweisung. Kartenzahlung ist leider nicht möglich.' },
    ],
  },
  {
    category: 'Spezielle Anfragen',
    questions: [
      { q: 'Macht ihr Cover-ups?', a: 'Das kommt auf den Künstler an. Bei einer Cover-Anfrage sende bitte unbedingt ein Foto mit. Wir haben eine Kooperation mit Frau Dr. Petra Hirtler, die zu covernde Tätowierungen mittels Laser vorbehandelt und aufhellt. Oft ist ein optimales Ergebnis nur mit vorheriger Laserbehandlung zu erzielen.' },
      { q: 'Kann man über Narben tätowieren?', a: 'Prinzipiell ist es möglich, allerdings kann im Vorfeld nie genau gesagt werden, wie sich die Farbe verhält. Bei starkem Narbengewebe sollte mit einem Hautarzt abgeklärt werden, ob ein Tattoo möglich ist.' },
      { q: 'Tätowiert ihr über Muttermale?', a: 'Muttermale werden beim Tätowieren ausgelassen. Bei Pigmentflecken ist ein Tattoo prinzipiell möglich, sollte aber mit einem Hautarzt abgeklärt werden.' },
      { q: 'Stecht ihr mitgebrachte Motive?', a: 'Sofern es sich um eine realistische Arbeit handelt und die Vorlage ein Foto ist, ja. Ein mitgebrachtes Bild kann gerne Inspiration sein, eine eins-zu-eins Kopie bekommst du bei uns nicht.' },
      { q: 'Tätowiert ihr alles was ich will?', a: 'Unsere Tätowierer machen das was sie machen gerne und sehr gut. Wir behalten uns vor Projekte abzulehnen, mit denen sich keiner unserer Tätowierer identifizieren kann. Gerne empfehlen wir euch auch andere Studios.' },
      { q: 'Tätowiert ihr im Gesicht?', a: 'Nein, auf keinen Fall. Dies hat diverse Gründe und wird auch nicht diskutiert.' },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-charcoal/8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 group"
      >
        <span className="text-sm md:text-base text-charcoal/80 group-hover:text-charcoal transition-colors leading-snug pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-4 h-4 text-charcoal/40" />
          ) : (
            <Plus className="w-4 h-4 text-charcoal/40" />
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm text-charcoal/55 leading-relaxed pb-6 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.faq-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.faq-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.faq-category').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      {/* Hero */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="faq-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">Wissenswertes</p>
        <h1 className="faq-title text-4xl md:text-6xl lg:text-7xl heading-caps leading-[0.95] mb-8">
          Häufige<br />Fragen
        </h1>
        <p className="faq-intro serif-italic text-lg text-charcoal/55 max-w-lg leading-relaxed">
          Alles, was du vor deinem Besuch bei uns wissen solltest. Sollte deine Frage nicht dabei sein, schreib uns gerne eine Mail.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* FAQ Categories */}
      <div className="max-w-[900px] mx-auto px-6">
        {faqs.map((group, gi) => (
          <div key={gi} className="faq-category mb-16 md:mb-20 last:mb-0">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[11px] heading-caps text-charcoal/35">{String(gi + 1).padStart(2, '0')}</span>
              <h2 className="text-lg md:text-xl heading-caps-tight">{group.category}</h2>
            </div>

            {/* Questions */}
            <div>
              {group.questions.map((item, qi) => (
                <AccordionItem key={qi} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Contact CTA */}
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="serif-italic text-lg text-charcoal/55 mb-6">
          Noch Fragen? Wir helfen gerne weiter.
        </p>
        <a
          href="mailto:info@truecanvas.at"
          className="text-base serif-italic text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-1"
        >
          info@truecanvas.at
        </a>
      </div>
    </div>
  );
}
