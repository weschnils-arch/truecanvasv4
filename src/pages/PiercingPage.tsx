import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Steriler Arbeitsbereich',
    description: 'Höchste Hygienestandards in jedem Schritt. Alle Werkzeuge werden sterilisiert und nur einmal verwendet.',
  },
  {
    title: 'Premium Schmuck',
    description: 'Ausschließlich hochwertiger Erstschmuck aus Titan und Gold — verträglich, schön und langlebig.',
  },
  {
    title: 'Erfahrung & Präzision',
    description: 'Mayduna bringt jahrelange Erfahrung und ein geschultes Auge für perfekte Platzierung mit.',
  },
  {
    title: 'Individuelle Beratung',
    description: 'Vor jedem Piercing besprechen wir gemeinsam die beste Position, den passenden Schmuck und alles zur Pflege.',
  },
  {
    title: 'Nachsorge inklusive',
    description: 'Wir begleiten dich auch nach dem Stechen — mit Pflegetipps und einem offenen Ohr für alle Fragen.',
  },
  {
    title: 'Studio-Atmosphäre',
    description: 'Kein steriles Kettengeschäft, sondern ein warmer, einladender Ort mit persönlicher Betreuung.',
  },
];

export default function PiercingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.pi-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.pi-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.pi-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

      // Image reveal
      const img = document.querySelector('.pi-hero-img');
      if (img) {
        gsap.fromTo(img,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: img, start: 'top 80%' },
          }
        );
      }

      // Features
      gsap.utils.toArray<HTMLElement>('.pi-feature').forEach(el => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <p className="pi-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">In Kooperation mit Mayduna</p>
            <h1 className="pi-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95]">
              Piercing
            </h1>
          </div>
          <div className="flex items-end">
            <p className="pi-intro serif-italic text-lg md:text-xl text-charcoal/55 leading-relaxed max-w-md">
              Professionelle Piercings in der gewohnten True Canvas Atmosphäre. Höchste Standards an Hygiene, Präzision und Ästhetik.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Text */}
          <div className="lg:col-span-7">
            <p className="text-charcoal/60 text-base md:text-lg leading-[1.85] mb-6">
              Piercing ist Körperkunst — genau wie Tätowieren. Deshalb setzen wir auch hier auf höchste Qualität. In Kooperation mit Mayduna bieten wir professionelle Piercings in unserem Studio an. Von klassischen Ohr-Piercings bis hin zu ausgefalleneren Platzierungen — immer mit dem Anspruch an Perfektion und Sicherheit.
            </p>
            <p className="text-charcoal/60 text-base md:text-lg leading-[1.85]">
              Mayduna ist bekannt für eine einfühlsame Arbeitsweise, schnelle und präzise Technik sowie eine umfassende Beratung zu Schmuckwahl und Pflege. Die Termine finden regelmäßig in unserem Studio statt.
            </p>
          </div>

          {/* Partner Card */}
          <div className="lg:col-span-5">
            <div className="border border-charcoal/8 p-8 md:p-10">
              <p className="text-[11px] heading-caps text-charcoal/40 mb-6">Dein Partner</p>
              <h3 className="text-2xl md:text-3xl heading-caps-tight mb-3">Mayduna</h3>
              <p className="text-sm text-charcoal/50 leading-relaxed mb-8">
                Professionelles Piercing mit Leidenschaft und Präzision. Termine regelmäßig bei True Canvas.
              </p>
              <a
                href="https://mayduna.de/termin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
              >
                Piercing Termin buchen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="pi-hero-img overflow-hidden" style={{ clipPath: 'inset(0 0 100% 0)' }}>
          <img
            src="/images/piercing.webp"
            alt="Piercing bei True Canvas"
            className="w-full aspect-[21/9] object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Features Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-12">Warum bei uns</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          {features.map((feature, i) => (
            <div key={i} className="pi-feature">
              <span className="text-[11px] heading-caps text-charcoal/30 block mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm md:text-base heading-caps-tight mb-2">{feature.title}</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Contact */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-12">
        <p className="serif-italic text-lg text-charcoal/55 mb-6">
          Fragen zum Piercing? Schreib uns.
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
