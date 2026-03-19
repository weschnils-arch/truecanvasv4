import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const guestArtists = [
  // März
  { name: 'ophelia.tattoo', style: 'Blackwork / Blackout', month: 'März', dates: '2.3. – 12.3.', image: '/images/guests/ophelia.tattoo.webp', instagram: 'https://instagram.com/ophelia.tattoo' },
  { name: 'shavelkina', style: 'Traditionell / Neo Traditional / Oldschool', month: 'März', dates: '2.3. – 8.3.', image: '/images/guests/shavelkina-1.webp', instagram: 'https://instagram.com/shavelkina' },
  { name: 'mannytatt', style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', month: 'März', dates: '2.3. – 8.3.', image: '/images/guests/mannytatt.webp', instagram: 'https://instagram.com/mannytatt' },
  { name: 'ruby.tattooist', style: 'Illustrativ / Graphisch', month: 'März', dates: '5.3. – 8.3.', image: '/images/guests/ruby__lights.webp', instagram: 'https://instagram.com/ruby.tattooist' },
  { name: 'osmanergin_', style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', month: 'März', dates: '6.3. – 9.3.', image: '/images/guests/osmanergin_.webp', instagram: 'https://instagram.com/osmanergin_' },
  { name: 'gizemgunertattoo', style: 'Floral / Botanisch', month: 'März', dates: '6.3. – 8.3.', image: '/images/guests/gizemgunertatto.webp', instagram: 'https://instagram.com/gizemgunertattoo' },
  { name: 'canerimozen', style: 'Blackwork / Blackout', month: 'März', dates: '6.3. – 8.3.', image: '/images/guests/canerimozen.webp', instagram: 'https://instagram.com/canerimozen' },
  { name: 'annamaria.tattoo', style: 'Illustrativ / Graphisch', month: 'März', dates: '9.3. – 15.3.', image: '/images/guests/annamaria.tattoo.webp', instagram: 'https://instagram.com/annamaria.tattoo' },
  { name: 'talala_tattoo', style: 'Realismus – Black & Grey', month: 'März', dates: '9.3. – 15.3.', image: '/images/guests/talala_tattoo.webp', instagram: 'https://instagram.com/talala_tattoo' },
  { name: 'vlada.s.tattoo', style: 'Floral / Botanisch', month: 'März', dates: '9.3. – 15.3.', image: '/images/guests/vlada.s.tattoo.webp', instagram: 'https://instagram.com/vlada.s.tattoo' },
  // April
  { name: 'ophelia.tattoo', style: 'Blackwork / Blackout', month: 'April', dates: '1.4. – 6.4.', image: '/images/guests/ophelia.tattoo.webp', instagram: 'https://instagram.com/ophelia.tattoo' },
  { name: 'mannytatt', style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', month: 'April', dates: '7.4. – 13.4.', image: '/images/guests/mannytatt.webp', instagram: 'https://instagram.com/mannytatt' },
  { name: 'talala_tattoo', style: 'Realismus – Black & Grey', month: 'April', dates: '14.4. – 20.4.', image: '/images/guests/talala_tattoo.webp', instagram: 'https://instagram.com/talala_tattoo' },
  { name: 'shavelkina', style: 'Traditionell / Neo Traditional / Oldschool', month: 'April', dates: '21.4. – 27.4.', image: '/images/guests/shavelkina-1.webp', instagram: 'https://instagram.com/shavelkina' },
  // Mai
  { name: 'ruby.tattooist', style: 'Illustrativ / Graphisch', month: 'Mai', dates: '5.5. – 11.5.', image: '/images/guests/ruby__lights.webp', instagram: 'https://instagram.com/ruby.tattooist' },
  { name: 'canerimozen', style: 'Blackwork / Blackout', month: 'Mai', dates: '12.5. – 18.5.', image: '/images/guests/canerimozen.webp', instagram: 'https://instagram.com/canerimozen' },
  { name: 'annamaria.tattoo', style: 'Illustrativ / Graphisch', month: 'Mai', dates: '19.5. – 25.5.', image: '/images/guests/annamaria.tattoo.webp', instagram: 'https://instagram.com/annamaria.tattoo' },
  { name: 'vlada.s.tattoo', style: 'Floral / Botanisch', month: 'Mai', dates: '19.5. – 25.5.', image: '/images/guests/vlada.s.tattoo.webp', instagram: 'https://instagram.com/vlada.s.tattoo' },
  // Juni
  { name: 'gizemgunertattoo', style: 'Floral / Botanisch', month: 'Juni', dates: '2.6. – 8.6.', image: '/images/guests/gizemgunertatto.webp', instagram: 'https://instagram.com/gizemgunertattoo' },
  { name: 'osmanergin_', style: 'Fineline / One Line / Tiny Tattoos / Schriftzüge', month: 'Juni', dates: '9.6. – 15.6.', image: '/images/guests/osmanergin_.webp', instagram: 'https://instagram.com/osmanergin_' },
  { name: 'talala_tattoo', style: 'Realismus – Black & Grey', month: 'Juni', dates: '16.6. – 22.6.', image: '/images/guests/talala_tattoo.webp', instagram: 'https://instagram.com/talala_tattoo' },
];

const allStyles = [...new Set(guestArtists.map(a => a.style))];
const allMonths = ['Alle Monate', ...new Set(guestArtists.map(a => a.month))];

export default function GuestArtists() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState('Alle Stile');
  const [activeMonth, setActiveMonth] = useState('Alle Monate');
  const [styleOpen, setStyleOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const styleRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  const filtered = guestArtists.filter(a => {
    const matchStyle = activeStyle === 'Alle Stile' || a.style === activeStyle;
    const matchMonth = activeMonth === 'Alle Monate' || a.month === activeMonth;
    return matchStyle && matchMonth;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ga-hero-line', { x: -80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ga-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeStyle, activeMonth]);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (styleRef.current && !styleRef.current.contains(e.target as Node)) setStyleOpen(false);
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) setMonthOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
          <div className="lg:col-span-7">
            <p className="ga-hero-line text-[11px] heading-caps text-charcoal/50 mb-8">Internationale Gäste</p>
            <h1 className="ga-hero-line text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95]">
              Guest<br />Artists
            </h1>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="ga-hero-line serif-italic text-lg md:text-xl text-charcoal/55 leading-relaxed max-w-md">
              Neue Perspektiven, neue Techniken. Regelmäßig begrüßen wir internationale Gastkünstler in unserem Studio.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Filter Dropdowns */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Month Dropdown */}
          <div ref={monthRef} className="relative">
            <button onClick={(e) => { e.stopPropagation(); setMonthOpen(!monthOpen); setStyleOpen(false); }}
              className="flex items-center gap-2 text-[11px] heading-caps text-charcoal border border-charcoal/15 px-5 py-3 hover:bg-charcoal/5 transition-colors">
              {activeMonth === 'Alle Monate' ? 'Monat wählen' : activeMonth}
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${monthOpen ? 'rotate-180' : ''}`} />
            </button>
            {monthOpen && (
              <div data-lenis-prevent className="absolute top-full left-0 mt-2 w-52 max-h-64 overflow-y-auto bg-paper border border-charcoal/10 py-2 z-50 shadow-lg">
                {allMonths.map(m => (
                  <button key={m} onClick={() => { setActiveMonth(m); setMonthOpen(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-[11px] heading-caps transition-colors ${activeMonth === m ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style Dropdown */}
          <div ref={styleRef} className="relative">
            <button onClick={(e) => { e.stopPropagation(); setStyleOpen(!styleOpen); setMonthOpen(false); }}
              className="flex items-center gap-2 text-[11px] heading-caps text-charcoal border border-charcoal/15 px-5 py-3 hover:bg-charcoal/5 transition-colors">
              {activeStyle === 'Alle Stile' ? 'Stil wählen' : activeStyle}
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${styleOpen ? 'rotate-180' : ''}`} />
            </button>
            {styleOpen && (
              <div data-lenis-prevent className="absolute top-full left-0 mt-2 w-72 max-h-64 overflow-y-auto bg-paper border border-charcoal/10 py-2 z-50 shadow-lg">
                <button onClick={() => { setActiveStyle('Alle Stile'); setStyleOpen(false); }}
                  className={`block w-full text-left px-5 py-2.5 text-[11px] heading-caps transition-colors ${activeStyle === 'Alle Stile' ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                  Alle Stile
                </button>
                {allStyles.map(s => (
                  <button key={s} onClick={() => { setActiveStyle(s); setStyleOpen(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-[11px] heading-caps transition-colors ${activeStyle === s ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/50 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-[11px] heading-caps text-charcoal/35">{filtered.length} {filtered.length === 1 ? 'Artist' : 'Artists'}</p>
          {activeMonth !== 'Alle Monate' && (
            <button onClick={() => setActiveMonth('Alle Monate')} className="text-[10px] heading-caps text-charcoal bg-charcoal/5 px-3 py-1 flex items-center gap-2 hover:bg-charcoal/10 transition-colors">
              {activeMonth} <span className="text-charcoal/40">×</span>
            </button>
          )}
          {activeStyle !== 'Alle Stile' && (
            <button onClick={() => setActiveStyle('Alle Stile')} className="text-[10px] heading-caps text-charcoal bg-charcoal/5 px-3 py-1 flex items-center gap-2 hover:bg-charcoal/10 transition-colors">
              {activeStyle} <span className="text-charcoal/40">×</span>
            </button>
          )}
        </div>
      </div>

      {/* Compact Grid — color images */}
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
                  style={{ filter: 'none' }}
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
              <p className="text-[10px] text-charcoal/40 mt-0.5 truncate">{artist.style}</p>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 serif-italic text-charcoal/50 text-lg">Keine Guest Artists in dieser Kategorie.</p>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Apply CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="max-w-2xl">
          <p className="text-[11px] heading-caps text-charcoal/50 mb-6">Für Künstler</p>
          <h2 className="text-3xl md:text-4xl heading-caps leading-[1.05] mb-6">
            Dein Guestspot<br />in Wien
          </h2>
          <p className="serif-italic text-charcoal/55 leading-relaxed mb-10 max-w-lg">
            Du möchtest als Artist bei True Canvas arbeiten? Wir bieten dir einen voll ausgestatteten Arbeitsplatz in einem modernen, hellen Studio im Herzen Wiens.
          </p>
          <a
            href="https://form.jotform.com/210883790627060"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
          >
            Jetzt bewerben
          </a>
        </div>
      </div>
    </div>
  );
}
