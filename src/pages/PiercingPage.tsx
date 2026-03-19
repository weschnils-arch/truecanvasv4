import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { piercingConfig } from '../config';
import { SectionDivider } from '../components/SectionDivider';

gsap.registerPlugin(ScrollTrigger);

export default function PiercingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.piercing-header',
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

      gsap.fromTo('.piercing-page-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.piercing-page-content', start: 'top 85%' } }
      );

      gsap.from('.piercing-page-feature', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.piercing-page-feature',
          start: 'top 90%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F7F6F4] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="piercing-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
              In Kooperation mit Mayduna
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.15em] uppercase text-charcoal leading-none">
              Piercing
            </h1>
          </div>
          <div className="flex items-end">
            <p className="font-serif italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-md">
              Professionelle Piercings in der gewohnten True Canvas Atmosphäre. Höchste Standards an Hygiene, Präzision und Ästhetik.
            </p>
          </div>
        </div>
      </div>

      <SectionDivider />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Content */}
        <div className="piercing-page-content grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 md:mb-40">
          <div className="flex flex-col gap-8">
            <p className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9]">
              {piercingConfig.description}
            </p>
          </div>

          <div>
            {/* Mayduna info card */}
            <div className="border-t border-charcoal/10 pt-10">
              <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
                Dein Partner
              </p>
              <h3 className="text-xl md:text-2xl font-sans tracking-[0.12em] uppercase text-charcoal mb-8">
                Mayduna
              </h3>
              <a
                href="https://mayduna.de/termin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
              >
                Piercing Termin buchen
              </a>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-32 md:mb-40">
          {piercingConfig.features.map((feature, i) => (
            <div key={i} className="piercing-page-feature">
              <span className="text-[11px] tracking-archive uppercase text-charcoal/60 block mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm tracking-journal uppercase text-charcoal mb-3" style={{ fontWeight: 400 }}>
                {feature.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <SectionDivider />

        {/* Full-width image */}
        <div className="mb-32 md:mb-40">
          <div
            ref={imageRef}
            className="w-full overflow-hidden"
            style={{ clipPath: 'inset(0 50% 0 50%)' }}
          >
            <img
              src="/images/piercing.webp"
              alt="Piercing bei TrueCanvas"
              className="w-full aspect-[21/9] object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <SectionDivider />

        {/* Contact */}
        <div className="text-center mb-16 border-t border-charcoal/10 pt-16">
          <p className="font-serif italic text-lg text-charcoal/70 mb-8">
            Fragen zum Piercing? Schreib uns.
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
