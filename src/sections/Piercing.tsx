import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { piercingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Piercing() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path curtain reveal on scroll
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(0 50% 0 50%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      }

      // Text content fade in
      gsap.from('.piercing-content', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.piercing-content',
          start: 'top 85%',
          once: true,
        },
      });

      // Features stagger
      gsap.from('.piercing-feature', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.piercing-feature',
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="piercing" className="py-32 md:py-48">
      {/* Full-width Piercing Image with curtain reveal */}
      <div
        ref={imageWrapperRef}
        className="w-full overflow-hidden aspect-[16/7] md:aspect-[21/9]"
      >
        <img
          src="/images/piercing.webp"
          alt="Piercing bei TrueCanvas"
          loading="lazy"
          onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Content */}
      <div className="piercing-content max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mt-20 md:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/70 mb-6">
              In Kooperation mit Mayduna
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-archive uppercase text-charcoal leading-relaxed">
              Mehr als nur Tattoos:<br />
              Piercings bei Mayduna
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-charcoal/70 leading-relaxed max-w-lg">
              {piercingConfig.description}
            </p>
          </div>
        </div>

        {/* Three Feature Points — pure text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16">
          {piercingConfig.features.map((feature, i) => (
            <div key={i} className="piercing-feature">
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

        {/* CTA */}
        <a
          href="https://mayduna.de/termin/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
        >
          Piercing Termin buchen
        </a>
      </div>
    </section>
  );
}
