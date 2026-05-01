import { useEffect, useState, useRef } from 'react';
import { Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { residents, getActiveStyles } from '../config/artists';
import { useLang, useTranslate } from '../context/LanguageContext';
import { useBookingUrl } from '../hooks/useBookingUrl';

gsap.registerPlugin(ScrollTrigger);

const RECRUIT_MAILTO = 'mailto:info@truecanvas.at?subject=Bewerbung%20Resident%20Artist';

export default function ArtistsPage() {
  const [activeStyleId, setActiveStyleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStyles = getActiveStyles();
  const { lang } = useLang();
  const t = useTranslate();
  const bookingUrl = useBookingUrl();

  const filtered = activeStyleId === null
    ? residents
    : residents.filter(r => r.styleIds.includes(activeStyleId));

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ap-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.ap-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out' });
      gsap.fromTo('.ap-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.ap-pills', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.45, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.artist-tile',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeStyleId]);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      {/* Hero — V3 1:1 */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-8">
        <p className="ap-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('artists.eyebrow')}</p>
        <h1 className="ap-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95] mb-8 max-w-4xl">
          {t('artists.title')}
        </h1>
        <p className="ap-subtitle text-lg md:text-xl text-charcoal/60 max-w-xl leading-relaxed">
          {t('artists.intro')}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Pill Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="ap-pills flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveStyleId(null)}
            className={`text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
              activeStyleId === null
                ? 'bg-charcoal text-paper border-charcoal'
                : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
            }`}
          >
            {t('artists.filter.all')}
          </button>
          {activeStyles.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveStyleId(s.id)}
              className={`text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeStyleId === s.id
                  ? 'bg-charcoal text-paper border-charcoal'
                  : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
              }`}
            >
              {lang === 'en' ? s.nameEn : s.name}
            </button>
          ))}
        </div>
        <p className="text-[11px] heading-caps text-charcoal/35 mb-10">
          {filtered.length} {filtered.length === 1 ? 'Artist' : 'Artists'}
        </p>
      </div>

      {/* 4-col grid: 7 artists (4 + 3) + recruit tile = 8 cells */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {filtered.map(artist => (
            <a
              key={artist.id}
              href={`https://www.instagram.com/${artist.instagram.replace('@', '')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="artist-tile group block"
            >
              <div className="overflow-hidden relative aspect-[3/4] bg-charcoal/5">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-end p-6">
                  <Instagram className="w-5 h-5 text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg md:text-xl heading-caps-tight leading-tight">{artist.name}</h3>
                  <p className="text-[12px] text-charcoal/50 mt-1">{artist.instagram}</p>
                </div>
                <p className="text-[11px] text-charcoal/40 text-right leading-snug mt-1">
                  {artist.styleIds
                    .map(id => activeStyles.find(s => s.id === id))
                    .filter(Boolean)
                    .map(s => (lang === 'en' ? s!.nameEn : s!.name))
                    .join(' / ')}
                </p>
              </div>
            </a>
          ))}

        </div>

        {/* Recruit band — slim, sits between grid and CTA */}
        {activeStyleId === null && (
          <a
            href={RECRUIT_MAILTO}
            className="mt-16 md:mt-24 block group"
          >
            <div className="border-t border-b border-charcoal/15 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors duration-500 group-hover:border-charcoal/40">
              <div>
                <p className="text-[11px] heading-caps text-charcoal/50 mb-2">Open Call</p>
                <h3 className="text-xl md:text-2xl heading-caps-tight leading-tight">
                  {t('artists.recruit.title')}
                </h3>
                <p className="text-[13px] text-charcoal/60 leading-relaxed mt-2 max-w-md">
                  {t('artists.recruit.text')}
                </p>
              </div>
              <span className="inline-block text-[11px] heading-caps text-charcoal border-b border-charcoal/30 pb-0.5 group-hover:border-charcoal transition-colors whitespace-nowrap">
                {t('artists.recruit.button')} ↗
              </span>
            </div>
          </a>
        )}

        {filtered.length === 0 && (
          <p className="text-center py-24 text-charcoal/50 text-lg">
            {t('artists.empty')}
          </p>
        )}
      </div>

      {/* CTA — V3 1:1 */}
      <div className="bg-charcoal text-paper py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl heading-caps-tight mb-3">{t('artists.cta.title')}</h2>
            <p className="text-paper/60 max-w-md">{t('artists.cta.text')}</p>
          </div>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-paper/20 text-[11px] heading-caps text-paper hover:bg-paper hover:text-charcoal transition-all duration-500"
          >
            {t('artists.cta.button')}
          </a>
        </div>
      </div>
    </div>
  );
}
