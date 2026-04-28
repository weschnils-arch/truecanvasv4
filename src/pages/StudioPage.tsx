import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Studios — images keep their keys; names + descriptions come from t().
const studioSlides = [
  { numberLabel: '01', nameKey: 'studio.room1.name', textKey: 'studio.room1.text',
    images: ['/images/studio/JollySchwarz-3999.webp', '/images/studio/JollySchwarz-4003.webp', '/images/studio/JollySchwarz-3975.webp'] },
  { numberLabel: '02', nameKey: 'studio.room2.name', textKey: 'studio.room2.text',
    images: ['/images/studio/JollySchwarz-4134.webp', '/images/studio/JollySchwarz-4112.webp', '/images/studio/JollySchwarz-4146.webp'] },
  { numberLabel: '03', nameKey: 'studio.room3.name', textKey: 'studio.room3.text',
    images: ['/images/studio/JollySchwarz-4173.webp', '/images/studio/JollySchwarz-4185.webp', '/images/studio/JollySchwarz-4189.webp'] },
];

// V2 staggered detail-photos set — client-approved layout per email
const detailPhotos = [
  { src: '/images/studio/JollySchwarz-4038.webp', alt: 'Framed artwork detail' },
  { src: '/images/studio/JollySchwarz-4295.webp', alt: 'Wall lights' },
  { src: '/images/studio/JollySchwarz-4075.webp', alt: 'Mirror reflection' },
  { src: '/images/studio/JollySchwarz-4253.webp', alt: 'Ring light detail' },
];

function MiniSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = useTranslate();

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % images.length), 5000);
  }, [images.length]);

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetInterval]);

  const go = (dir: number) => {
    setCurrent(c => (c + dir + images.length) % images.length);
    resetInterval();
  };

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      ))}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-paper/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={t('common.back')}
      >
        <ChevronLeft className="w-4 h-4 text-charcoal" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-paper/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={t('common.next')}
      >
        <ChevronRight className="w-4 h-4 text-charcoal" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetInterval(); }}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'bg-paper w-4' : 'bg-paper/50 w-1.5'}`}
            aria-label={`${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.sp-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.sp-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.sp-intro p', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.sp-studio-block').forEach(el => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });

      const pq = document.querySelector('.sp-pullquote');
      if (pq) {
        gsap.fromTo(pq,
          { scale: 0.97, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: pq, start: 'top 80%', once: true } }
        );
      }

      gsap.utils.toArray<HTMLElement>('.sp-work-tile').forEach(el => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      {/* Intro / "Wer wir sind" */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-16">
        <p className="sp-eyebrow text-[11px] heading-caps text-charcoal/50 mb-4">{t('studio.address')}</p>
        <h1 className="sp-title text-4xl md:text-6xl lg:text-7xl heading-caps leading-[0.95] mb-8">
          {t('studio.title')}
        </h1>

        <div className="sp-intro grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-5xl">
          <p className="text-[16px] text-charcoal/75 leading-[1.9]">{t('studio.p1')}</p>
          <p className="text-[16px] text-charcoal/75 leading-[1.9]">{t('studio.p2')}</p>
        </div>
      </div>

      <div className="section-divider mx-8 md:mx-20 my-8" />

      {/* Three studios — offset layout, click-through */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/50 mb-16">{t('studio.rooms.eyebrow')}</p>

        <div className="space-y-24 md:space-y-32">
          {studioSlides.map((studio, i) => (
            <div
              key={studio.numberLabel}
              className={`sp-studio-block grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <MiniSlideshow images={studio.images} alt={t(studio.nameKey)} />
              </div>
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <span className="text-[72px] md:text-[96px] heading-caps text-charcoal/[0.05] leading-none block -mb-6 md:-mb-8">
                  {studio.numberLabel}
                </span>
                <h3 className="text-2xl md:text-3xl heading-caps-tight mb-4">{t(studio.nameKey)}</h3>
                <p className="text-charcoal/70 text-base leading-[1.9] max-w-md">
                  {t(studio.textKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mx-8 md:mx-20 my-8" />

      {/* Pull quote */}
      <div className="sp-pullquote max-w-4xl mx-auto px-6 text-center py-20 md:py-28">
        <p className="text-3xl md:text-5xl heading-caps-tight text-charcoal/80 leading-[1.25]">
          {t('studio.pullquote')}
        </p>
      </div>

      <div className="section-divider mx-8 md:mx-20 my-8" />

      {/* Studio detail photos — V2 staggered 4-col grid (client-approved layout) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/50 mb-10 text-center">{t('studio.atwork')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {detailPhotos.map((photo, i) => (
            <div
              key={i}
              className={`sp-work-tile overflow-hidden ${i % 2 === 1 ? 'mt-8 md:mt-12' : ''}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
