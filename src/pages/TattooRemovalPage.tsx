import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionDivider } from '../components/SectionDivider';

gsap.registerPlugin(ScrollTrigger);

export default function TattooRemovalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.removal-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'inset(0 50% 0 50%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
          }
        );
      }

      gsap.fromTo('.removal-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.removal-content', start: 'top 85%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F7F6F4] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="removal-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-8 md:mb-12">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
              In Kooperation mit Dr. Petra Hirtler
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.15em] uppercase text-charcoal leading-none">
              Tattoo&shy;entfernung
            </h1>
          </div>
          <div className="flex items-end">
            <p className="font-serif italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-md">
              Platz für Neues schaffen. Dank fortgeschrittener Lasertechniken gibt es heute exzellente Möglichkeiten.
            </p>
          </div>
        </div>
      </div>

      <SectionDivider />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Content — two columns */}
        <div className="removal-content grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 md:mb-40">
          <div className="flex flex-col gap-8">
            <p className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9]">
              Manchmal kommt es vor, dass man eine Tätowierung bereut, die Lebensumstände sich ändern oder sich der Geschmack in eine andere Richtung entwickelt hat und man eine Tattooentfernung in Betracht zieht. Mittlerweile gibt es, dank fortgeschrittener Lasertechniken, gute Möglichkeiten ein ungeliebtes Tattoo wieder loszuwerden.
            </p>
            <p className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9]">
              Auch als Vorbereitung, um bei einem Cover-up das bestmögliche Ergebnis erzielen zu können, kann eine teilweise Entfernung einer alten Tätowierung sinnvoll sein.
            </p>
            <p className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9]">
              Bei Dr. Petra Hirtler seid ihr in guten Händen. Die Spezialistin auf dem Gebiet Laserentfernung ist sowohl kompetent als auch erfrischend freundlich. Sie erklärt den Prozess der Tattooentfernung ausführlich und erzielt, je nach Beschaffenheit der Haut und der körpereigenen Regeneration, optimale Ergebnisse.
            </p>
          </div>

          <div>
            <p className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9] mb-12">
              Solltest du die Kombination aus Laserbehandlung und Cover-up in Betracht ziehen, stimme dich bitte unbedingt vorher mit dem Tätowierer deiner Wahl ab, damit wir abklären können, ob deine Wünsche umgesetzt werden können.
            </p>

            {/* Doctor info card */}
            <div className="border-t border-charcoal/10 pt-10">
              <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
                Deine Spezialistin
              </p>
              <div className="flex items-center gap-4 mb-2">
                <img
                  src="/images/tattooentfernung.webp"
                  alt="Dr. Petra Hirtler"
                  className="w-14 h-14 object-cover grayscale"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-sans tracking-[0.12em] uppercase text-charcoal">
                    Dr. Petra Hirtler
                  </h3>
                  <p className="text-[11px] tracking-journal uppercase text-charcoal/60">
                    Medizin am Hauptbahnhof, Wien
                  </p>
                </div>
              </div>
              <div className="mb-8" />
              <a
                href="https://www.tattooentfernung-wien.at/termin-medizin-am-hauptbahnhof/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
              >
                Termin buchen
              </a>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Full-width image with curtain reveal */}
        <div className="mb-32 md:mb-40">
          <div
            ref={imageRef}
            className="w-full overflow-hidden"
            style={{ clipPath: 'inset(0 50% 0 50%)' }}
          >
            <img
              src="/images/studio/JollySchwarz-4253.webp"
              alt="True Canvas Studio"
              className="w-full aspect-[21/9] object-cover object-center grayscale"
              loading="lazy"
            />
          </div>
        </div>

        <SectionDivider />

        {/* Contact */}
        <div className="text-center mb-16 border-t border-charcoal/10 pt-16">
          <p className="font-serif italic text-lg text-charcoal/70 mb-8">
            Fragen zur Tattooentfernung? Schreib uns.
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
