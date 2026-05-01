import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { number: '01', titleKey: 'laser.step1.title', textKey: 'laser.step1.text' },
  { number: '02', titleKey: 'laser.step2.title', textKey: 'laser.step2.text' },
  { number: '03', titleKey: 'laser.step3.title', textKey: 'laser.step3.text' },
];

export default function TattooRemovalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.tr-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.tr-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.tr-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

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

      gsap.utils.toArray<HTMLElement>('.tr-step').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <p className="tr-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('laser.eyebrow')}</p>
        <h1 className="tr-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95] max-w-4xl">
          <span dangerouslySetInnerHTML={{ __html: t('laser.title') }} />
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-4 mb-8">
        <p className="tr-intro text-xl md:text-2xl text-charcoal/70 max-w-2xl leading-[1.65]">
          {t('laser.intro')}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="tr-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xl md:text-2xl text-charcoal/70 leading-[1.65]">
              {t('laser.pullquote')}
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-charcoal/70 text-base md:text-lg leading-[1.9]">{t('laser.body1')}</p>
            <p className="text-charcoal/70 text-base md:text-lg leading-[1.9]">{t('laser.body2')}</p>
            <p className="text-charcoal/70 text-base md:text-lg leading-[1.9]">{t('laser.body3')}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-12">{t('laser.process.title')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {STEPS.map((step) => (
            <div key={step.number} className="tr-step">
              <span className="text-[48px] md:text-[64px] heading-caps text-charcoal/[0.06] leading-none block -mb-3">
                {step.number}
              </span>
              <h3 className="text-base md:text-lg heading-caps-tight mb-3">{t(step.titleKey)}</h3>
              <p className="text-sm text-charcoal/65 leading-[1.85]">{t(step.textKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="overflow-hidden">
              <img
                src="/images/tattooentfernung.webp"
                alt={t('laser.doctor.name')}
                className="w-full aspect-[4/5] object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-[11px] heading-caps text-charcoal/40 mb-6">{t('laser.doctor.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl heading-caps leading-[1.05] mb-4">
              {t('laser.doctor.name')}
            </h2>
            <p className="text-[12px] heading-caps text-charcoal/45 mb-8">{t('laser.doctor.location')}</p>
            <p className="text-charcoal/70 text-base leading-[1.9] mb-10 max-w-lg">
              {t('laser.doctor.text')}
            </p>
            <a
              href="https://www.tattooentfernung-wien.at/termin-medizin-am-hauptbahnhof/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
            >
              {t('laser.doctor.cta')}
            </a>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <p className="text-[15px] text-charcoal/70 mb-6">
          {t('laser.contact.line')}
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
