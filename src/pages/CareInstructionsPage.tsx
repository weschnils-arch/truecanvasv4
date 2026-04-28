import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { periodKey: 'care.phase1.period', titleKey: 'care.phase1.title', instKeys: ['care.phase1.i1', 'care.phase1.i2', 'care.phase1.i3'] },
  { periodKey: 'care.phase2.period', titleKey: 'care.phase2.title', instKeys: ['care.phase2.i1', 'care.phase2.i2', 'care.phase2.i3'] },
  { periodKey: 'care.phase3.period', titleKey: 'care.phase3.title', instKeys: ['care.phase3.i1', 'care.phase3.i2', 'care.phase3.i3'] },
];

const DONTS = [
  { labelKey: 'care.dont1.label', textKey: 'care.dont1.text' },
  { labelKey: 'care.dont2.label', textKey: 'care.dont2.text' },
  { labelKey: 'care.dont3.label', textKey: 'care.dont3.text' },
  { labelKey: 'care.dont4.label', textKey: 'care.dont4.text' },
  { labelKey: 'care.dont5.label', textKey: 'care.dont5.text' },
  { labelKey: 'care.dont6.label', textKey: 'care.dont6.text' },
];

export default function CareInstructionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ci-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.ci-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.ci-quote', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.ci-phase').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.ci-dont').forEach(el => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      <div className="max-w-[1000px] mx-auto px-6 pt-12">
        <p className="ci-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('care.eyebrow')}</p>
        <h1 className="ci-title text-4xl md:text-6xl lg:text-7xl heading-caps leading-[0.95] mb-8">
          {t('care.title.l1')}<br />{t('care.title.l2')}
        </h1>
        <p className="ci-quote text-xl md:text-2xl text-charcoal/70 max-w-xl leading-[1.65]">
          {t('care.quote')}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1000px] mx-auto px-6">
        <div className="space-y-16 md:space-y-24">
          {PHASES.map((phase, i) => (
            <div key={i} className="ci-phase grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <span className="text-[48px] md:text-[64px] heading-caps text-charcoal/[0.06] leading-none block -mb-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[11px] heading-caps text-charcoal/45 mb-1">{t(phase.periodKey)}</p>
                <h3 className="text-lg md:text-xl heading-caps-tight">{t(phase.titleKey)}</h3>
              </div>
              <div className="md:col-span-8 space-y-4">
                {phase.instKeys.map((k, j) => (
                  <p key={j} className="text-charcoal/70 text-base leading-[1.85]">
                    {t(k)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-16 md:my-24" />

      <div className="bg-charcoal text-paper py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] heading-caps text-paper/40 mb-4">{t('care.donts.eyebrow')}</p>
          <h2 className="text-2xl md:text-4xl heading-caps leading-[1.05] mb-12 md:mb-16">
            {t('care.donts.title.l1')}<br />{t('care.donts.title.l2')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {DONTS.map((item, i) => (
              <div key={i} className="ci-dont">
                <p className="text-[11px] heading-caps text-paper/35 mb-2">{t(item.labelKey)}</p>
                <p className="text-paper/70 text-base leading-[1.85]">{t(item.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xl text-charcoal/70 leading-[1.65] mb-8">
            {t('care.contact.quote')}
          </p>
          <div className="space-y-3 text-sm text-charcoal/60">
            <p>Weyringergasse 19/1-3, 1040 Wien</p>
            <a
              href="mailto:info@truecanvas.at"
              className="text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-0.5 inline-block"
            >
              info@truecanvas.at
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
