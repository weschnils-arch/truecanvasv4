import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { residents, getActiveStyles, type ResidentArtist } from '../config/artists';
import { useLang, useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function ArtistTile({ artist, visible }: { artist: ResidentArtist; visible: boolean }) {
  const [hoverIdx, setHoverIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { lang } = useLang();
  const t = useTranslate();

  const startSlideshow = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setHoverIdx(i => (i + 1) % artist.portfolio.length);
    }, 900);
  };
  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHoverIdx(0);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  if (!visible) return null;

  const currentImage = expanded ? artist.portfolio[hoverIdx] : artist.portrait;
  const role = lang === 'en' ? artist.roleEn : artist.roleDe;

  return (
    <div
      className="artist-tile group"
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-charcoal/5">
        <img
          src={currentImage}
          alt={artist.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        {(intervalRef.current || expanded) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {artist.portfolio.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === hoverIdx ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-xl heading-caps-tight mb-1">{artist.name}</h3>
      {role && <p className="text-[11px] text-charcoal/40 mb-3">{role}</p>}

      <button
        onClick={() => {
          setExpanded(e => !e);
          if (!expanded) startSlideshow();
          else stopSlideshow();
        }}
        className="text-[11px] heading-caps text-charcoal/60 hover:text-charcoal transition-colors border-b border-charcoal/20 pb-0.5 mt-2"
      >
        {expanded ? t('artists.less') : t('artists.more')}
      </button>

      {expanded && (
        <div className="mt-4">
          <a
            href={`https://www.instagram.com/${artist.instagram.replace('@', '')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] heading-caps text-charcoal/60 hover:text-charcoal transition-colors"
          >
            {artist.instagram} ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function ArtistsPage() {
  const [activeStyleId, setActiveStyleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStyles = getActiveStyles();
  const { lang } = useLang();
  const t = useTranslate();

  const filtered = activeStyleId === null
    ? residents
    : residents.filter(r => r.styleIds.includes(activeStyleId));

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ap-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.ap-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out' });
      gsap.fromTo('.ap-intro', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.ap-pills', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: 'power3.out' });
      gsap.fromTo('.ap-grid > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.5, stagger: 0.1, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-6">
        <p className="ap-eyebrow text-[11px] heading-caps text-charcoal/50 mb-4">{t('artists.eyebrow')}</p>
        <h1 className="ap-title text-4xl md:text-6xl heading-caps leading-[0.95] mb-4">
          {t('artists.title')}
        </h1>
        <p className="ap-intro text-[15px] md:text-base text-charcoal/60 max-w-xl leading-[1.75]">
          {t('artists.intro')}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-6">
        <div className="ap-pills flex flex-wrap gap-2">
          <button
            onClick={() => setActiveStyleId(null)}
            className={`text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
              activeStyleId === null
                ? 'bg-charcoal text-paper border-charcoal'
                : 'text-charcoal/60 border-charcoal/15 hover:border-charcoal/35'
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
                  : 'text-charcoal/60 border-charcoal/15 hover:border-charcoal/35'
              }`}
            >
              {lang === 'en' ? s.nameEn : s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="ap-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[0, 1, 2, 3].map(slot => {
            const artist = filtered[slot];
            if (!artist) {
              return (
                <div key={slot} className="artist-tile opacity-40">
                  <div className="aspect-[3/4] bg-charcoal/5 mb-5 flex items-center justify-center">
                    <p className="text-[11px] heading-caps text-charcoal/40">{t('artists.comingsoon')}</p>
                  </div>
                </div>
              );
            }
            return <ArtistTile key={artist.id} artist={artist} visible />;
          })}
          {filtered.slice(4).map(artist => (
            <ArtistTile key={artist.id} artist={artist} visible />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-charcoal/50 text-lg">
            {t('artists.empty')}
          </p>
        )}
      </div>
    </div>
  );
}
