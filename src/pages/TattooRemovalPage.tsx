import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Erstgespräch',
    description: 'Dr. Hirtler begutachtet dein Tattoo und bespricht mit dir die Möglichkeiten, den voraussichtlichen Aufwand und die zu erwartenden Ergebnisse.',
  },
  {
    number: '02',
    title: 'Laserbehandlung',
    description: 'Mit modernster Lasertechnologie werden die Farbpigmente in der Haut aufgebrochen. Der Körper baut diese dann natürlich ab.',
  },
  {
    number: '03',
    title: 'Heilungsphase',
    description: 'Zwischen den Sitzungen braucht deine Haut Zeit zur Regeneration. In der Regel sind mehrere Sitzungen im Abstand von einigen Wochen nötig.',
  },
];

export default function TattooRemovalPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.tr-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.tr-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.tr-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

      // Image reveal
      const img = document.querySelector('.tr-hero-img');
      if (img) {
        gsap.fromTo(img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: img, start: 'top 80%' },
          }
        );
      }

      // Steps
      gsap.utils.toArray<HTMLElement>('.tr-step').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // Content blocks
      gsap.utils.toArray<HTMLElement>('.tr-content').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <p className="tr-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">In Kooperation mit Dr. Petra Hirtler</p>
        <h1 className="tr-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95] max-w-4xl">
          Tattoo&shy;entfernung
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-4 mb-8">
        <p className="tr-intro serif-italic text-xl md:text-2xl text-charcoal/55 max-w-2xl leading-relaxed">
          Platz für Neues schaffen. Dank fortgeschrittener Lasertechniken gibt es heute exzellente Möglichkeiten, ungeliebte Tattoos zu entfernen.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Doctor Image — small for quality */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="tr-hero-img overflow-hidden max-w-[200px]" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <img
            src="/images/tattooentfernung.webp"
            alt="Dr. Petra Hirtler"
            className="w-full aspect-square object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content — editorial two column */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="tr-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="serif-italic text-xl md:text-2xl text-charcoal/60 leading-relaxed">
              "Manchmal braucht es einen Neuanfang. Wir sorgen dafür, dass dieser so sanft wie möglich verläuft."
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-charcoal/60 text-base md:text-lg leading-[1.85]">
              Manchmal kommt es vor, dass man eine Tätowierung bereut, die Lebensumstände sich ändern oder sich der Geschmack in eine andere Richtung entwickelt hat und man eine Tattooentfernung in Betracht zieht. Mittlerweile gibt es, dank fortgeschrittener Lasertechniken, gute Möglichkeiten ein ungeliebtes Tattoo wieder loszuwerden.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg leading-[1.85]">
              Auch als Vorbereitung, um bei einem Cover-up das bestmögliche Ergebnis erzielen zu können, kann eine teilweise Entfernung einer alten Tätowierung sinnvoll sein.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg leading-[1.85]">
              Solltest du die Kombination aus Laserbehandlung und Cover-up in Betracht ziehen, stimme dich bitte unbedingt vorher mit dem Tätowierer deiner Wahl ab, damit wir abklären können, ob deine Wünsche umgesetzt werden können.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Process Steps */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-12">Der Prozess</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="tr-step">
              <span className="text-[48px] md:text-[64px] heading-caps text-charcoal/[0.06] leading-none block -mb-3">
                {step.number}
              </span>
              <h3 className="text-base md:text-lg heading-caps-tight mb-3">{step.title}</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Doctor Info */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="tr-content max-w-2xl">
          <p className="text-[11px] heading-caps text-charcoal/40 mb-6">Deine Spezialistin</p>
          <h2 className="text-3xl md:text-4xl heading-caps leading-[1.05] mb-4">
            Dr. Petra Hirtler
          </h2>
          <p className="text-[12px] heading-caps text-charcoal/45 mb-8">Medizin am Hauptbahnhof, Wien</p>
          <p className="text-charcoal/60 text-base leading-relaxed mb-10 max-w-lg">
            Bei Dr. Petra Hirtler seid ihr in guten Händen. Die Spezialistin auf dem Gebiet Laserentfernung ist sowohl kompetent als auch erfrischend freundlich. Sie erklärt den Prozess der Tattooentfernung ausführlich und erzielt, je nach Beschaffenheit der Haut und der körpereigenen Regeneration, optimale Ergebnisse.
          </p>
          <a
            href="https://www.tattooentfernung-wien.at/termin-medizin-am-hauptbahnhof/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
          >
            Termin buchen
          </a>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Contact */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <p className="serif-italic text-lg text-charcoal/55 mb-6">
          Fragen zur Tattooentfernung? Schreib uns.
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
