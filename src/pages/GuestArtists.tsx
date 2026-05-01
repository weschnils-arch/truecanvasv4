import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { useTranslate, useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Guest Artists — HIDDEN page at /guestartists (no nav link).
// Styles: DE name first, EN as a parallel entry via `styleEn` lookup below.
const STYLE_EN: Record<string, string> = {
  'Blackwork / Blackout': 'Blackwork / Blackout',
  'Traditionell / Neo Traditional / Oldschool': 'Traditional / Neo Traditional / Oldschool',
  'Fineline / One Line / Tiny Tattoos / Schriftzüge': 'Fineline / One Line / Tiny Tattoos / Lettering',
  'Illustrativ / Graphisch': 'Illustrative / Graphic',
  'Floral / Botanisch': 'Floral / Botanical',
  'Realismus – Black & Grey': 'Realism – Black & Grey',
};

const guestArtists = [
  { name: 'ophelia.tattoo',   style: 'Blackwork / Blackout',                             dates: '2.3. – 12.3.', image: '/images/guests/ophelia.tattoo.webp',     instagram: 'https://instagram.com/ophelia.tattoo' },
  { name: 'shavelkina',       style: 'Traditionell / Neo Traditional / Oldschool',       dates: '2.3. – 8.3.',  image: '/images/guests/shavelkina-1.webp',       instagram: 'https://instagram.com/shavelkina' },
  { name: 'mannytatt',        style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', dates: '2.3. – 8.3.',  image: '/images/guests/mannytatt.webp',          instagram: 'https://instagram.com/mannytatt' },
  { name: 'ruby.tattooist',   style: 'Illustrativ / Graphisch',                          dates: '5.3. – 8.3.',  image: '/images/guests/ruby__lights.webp',       instagram: 'https://instagram.com/ruby.tattooist' },
  { name: 'osmanergin_',      style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', dates: '6.3. – 9.3.',  image: '/images/guests/osmanergin_.webp',        instagram: 'https://instagram.com/osmanergin_' },
  { name: 'gizemgunertattoo', style: 'Floral / Botanisch',                               dates: '6.3. – 8.3.',  image: '/images/guests/gizemgunertatto.webp',    instagram: 'https://instagram.com/gizemgunertattoo' },
  { name: 'canerimozen',      style: 'Blackwork / Blackout',                             dates: '6.3. – 8.3.',  image: '/images/guests/canerimozen.webp',        instagram: 'https://instagram.com/canerimozen' },
  { name: 'annamaria.tattoo', style: 'Illustrativ / Graphisch',                          dates: '9.3. – 15.3.', image: '/images/guests/annamaria.tattoo.webp',   instagram: 'https://instagram.com/annamaria.tattoo' },
  { name: 'talala_tattoo',    style: 'Realismus – Black & Grey',                         dates: '9.3. – 15.3.', image: '/images/guests/talala_tattoo.webp',      instagram: 'https://instagram.com/talala_tattoo' },
  { name: 'vlada.s.tattoo',   style: 'Floral / Botanisch',                               dates: '9.3. – 15.3.', image: '/images/guests/vlada.s.tattoo.webp',     instagram: 'https://instagram.com/vlada.s.tattoo' },
];

const allStyles = Array.from(new Set(guestArtists.map(a => a.style)));

export default function GuestArtists() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const t = useTranslate();
  const { lang } = useLang();

  const styleName = (s: string) => (lang === 'en' ? (STYLE_EN[s] ?? s) : s);

  const filtered = selectedStyles.size === 0
    ? guestArtists
    : guestArtists.filter(a => selectedStyles.has(a.style));

  const toggleStyle = (s: string) => {
    setSelectedStyles(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ga-hero-line', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out' });
      gsap.fromTo('.ga-chip', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, duration: 0.5, delay: 0.2, ease: 'power2.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ga-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [selectedStyles]);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-6">
        <p className="ga-hero-line text-[11px] heading-caps text-charcoal/50 mb-4">{t('guest.eyebrow')}</p>
        <h1 className="ga-hero-line text-4xl md:text-6xl heading-caps leading-[0.95] mb-4">
          {t('guest.title')}
        </h1>
        <p className="ga-hero-line text-[15px] md:text-base text-charcoal/60 max-w-xl leading-[1.75]">
          {t('guest.intro')}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-6">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-4">{t('guest.filter.label')}</p>
        <div className="flex flex-wrap gap-2">
          {allStyles.map(s => {
            const active = selectedStyles.has(s);
            return (
              <button
                key={s}
                onClick={() => toggleStyle(s)}
                className={`ga-chip text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  active
                    ? 'bg-charcoal/20 text-charcoal/60 border-charcoal/20'
                    : 'bg-paper text-charcoal/70 border-charcoal/15 hover:border-charcoal/40 hover:bg-charcoal/5'
                }`}
              >
                {styleName(s)}
              </button>
            );
          })}
          {selectedStyles.size > 0 && (
            <button
              onClick={() => setSelectedStyles(new Set())}
              className="text-[11px] heading-caps px-5 py-2.5 text-charcoal/50 hover:text-charcoal transition-colors"
            >
              {t('guest.filter.reset')}
            </button>
          )}
        </div>
        <p className="text-[11px] heading-caps text-charcoal/35 mt-4">
          {filtered.length} {filtered.length === 1 ? t('guest.count.one') : t('guest.count.many')}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
          {filtered.map((artist, i) => (
            <a
              key={i}
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ga-card group"
            >
              <div className="overflow-hidden mb-2">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="text-[12px] heading-caps-tight truncate">@{artist.name}</p>
                  <p className="text-[10px] text-charcoal/40 mt-0.5">{artist.dates}</p>
                </div>
                <Instagram className="w-3 h-3 text-charcoal/30 group-hover:text-charcoal transition-colors mt-0.5 shrink-0" />
              </div>
              <p className="text-[10px] text-charcoal/40 mt-0.5 truncate">{styleName(artist.style)}</p>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-charcoal/50 text-lg">
            {t('guest.empty')}
          </p>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 border-t border-charcoal/10 pt-16">
        <div className="max-w-2xl">
          <p className="text-[11px] heading-caps text-charcoal/50 mb-6">{t('guest.apply.eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl heading-caps leading-[1.05] mb-6 md:whitespace-nowrap">
            {t('guest.apply.title.l1')} {t('guest.apply.title.l2')}
          </h2>
          <p className="text-[15px] text-charcoal/70 leading-[1.9] mb-10 max-w-lg">
            {t('guest.apply.text')}
          </p>
          <a
            href="mailto:guest@truecanvas.at"
            className="inline-block px-12 py-4 border border-charcoal/20 text-[12px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
          >
            {t('guest.apply.cta')}
          </a>
        </div>
      </div>
    </div>
  );
}
