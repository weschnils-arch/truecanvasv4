import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

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
      { q: 'Ab welchem Alter tätowiert ihr?', a: 'Wir tätowieren ausnahmslos erst ab 18 Jahren. Auch eine Einverständniserklärung der Eltern ändert das nicht.' },
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

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.faq-group', {
        y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-content', start: 'top 90%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F7F6F4] min-h-screen font-sans pb-32">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="faq-header text-center mb-24">
          <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-4">
            Häufige Fragen
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-[0.15em] uppercase mb-8 whitespace-nowrap">
            Wissenswertes für deinen Besuch
          </h1>
          <p className="font-serif italic text-lg text-charcoal/70 max-w-xl mx-auto leading-relaxed">
            Wir hoffen möglichst viele deiner Fragen hier abzudecken. Gerne kannst du uns auch eine Mail senden.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="faq-content flex flex-col gap-16">
          {faqs.map((group) => (
            <div key={group.category} className="faq-group">
              <h3 className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-8 border-b border-charcoal/10 pb-4">
                {group.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {group.questions.map((item, i) => (
                  <AccordionItem key={i} value={`${group.category}-${i}`} className="border-charcoal/10">
                    <AccordionTrigger className="text-left text-base md:text-lg py-6 hover:no-underline hover:text-charcoal/60 transition-colors font-sans tracking-wide">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-charcoal/70 text-base font-serif leading-relaxed pb-8">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="text-charcoal/60 text-sm mb-6 uppercase tracking-journal">
            Noch Fragen offen?
          </p>
          <a
            href="mailto:info@truecanvas.at"
            className="text-lg font-serif italic text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-1"
          >
            info@truecanvas.at
          </a>
        </div>
      </div>
    </div>
  );
}
