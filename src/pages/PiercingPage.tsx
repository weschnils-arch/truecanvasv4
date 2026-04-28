import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const FEATURE_KEYS = [1, 2, 3, 4, 5, 6] as const;

export default function PiercingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.pi-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.pi-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.pi-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <p className="pi-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('mayduna.eyebrow')}</p>
            <h1 className="pi-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95]">
              {t('mayduna.title')}
            </h1>
          </div>
          <div className="flex items-end">
            <p className="pi-intro text-[15px] md:text-base text-charcoal/70 leading-[1.85] max-w-md">
              {t('mayduna.intro')}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="text-charcoal/70 text-base md:text-lg leading-[1.9] mb-6">
              {t('mayduna.body1')}
            </p>
            <p className="text-charcoal/70 text-base md:text-lg leading-[1.9]">
              {t('mayduna.body2')}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-charcoal/8 p-8 md:p-10">
              <p className="text-[11px] heading-caps text-charcoal/40 mb-6">{t('mayduna.partner.label')}</p>
              <h3 className="text-2xl md:text-3xl heading-caps-tight mb-3">{t('mayduna.partner.name')}</h3>
              <p className="text-sm text-charcoal/60 leading-[1.85] mb-8">
                {t('mayduna.partner.text')}
              </p>
              <a
                href="https://mayduna.de/termin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
              >
                {t('mayduna.partner.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — narrower per client */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="pi-hero-img overflow-hidden" style={{ clipPath: 'inset(0 0 100% 0)' }}>
          <img
            src="/images/piercing.webp"
            alt={`${t('mayduna.title')} — ${t('mayduna.partner.name')}`}
            className="w-full aspect-[4/5] object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-12">{t('mayduna.why')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          {FEATURE_KEYS.map((n, i) => (
            <div key={n} className="pi-feature">
              <span className="text-[11px] heading-caps text-charcoal/30 block mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm md:text-base heading-caps-tight mb-2">{t(`mayduna.feature${n}.title`)}</h3>
              <p className="text-sm text-charcoal/65 leading-[1.85]">{t(`mayduna.feature${n}.text`)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-12">
        <p className="text-[15px] text-charcoal/70 mb-6">
          {t('mayduna.contact.line')}
        </p>
        <a
          href="mailto:info@truecanvas.at"
          className="text-base text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-1"
        >
          info@truecanvas.at
        </a>
      </div>
    </div>
  );
}
