import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Instagram, ChevronDown } from 'lucide-react';
import { tattooStylesConfig } from '../config';

const guestArtists = [
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
];

const allStyles = ['Alle Stile', ...tattooStylesConfig.styles.map(s => s.name)];
const allMonths = ['Alle Monate', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni'];

export default function GuestArtists() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState('Alle Stile');
  const [activeMonth, setActiveMonth] = useState('Alle Monate');
  const [monthDropdown, setMonthDropdown] = useState(false);
  const [styleDropdown, setStyleDropdown] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);

  const filtered = guestArtists.filter(a => {
    const matchStyle = activeStyle === 'Alle Stile' || a.style === activeStyle;
    const matchMonth = activeMonth === 'Alle Monate' || a.month === activeMonth;
    return matchStyle && matchMonth;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.guest-header', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) setMonthDropdown(false);
      if (styleRef.current && !styleRef.current.contains(e.target as Node)) setStyleDropdown(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F7F6F4] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="guest-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
              Internationale Künstler in Wien
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.15em] uppercase text-charcoal leading-none">
              Guest Artists
            </h1>
          </div>
          <div className="flex items-end">
            <p className="font-serif italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-md">
              Innovation lebt vom Austausch. Regelmäßig begrüßen wir internationale Gastkünstler, die neue Perspektiven und Techniken in unser Studio bringen.
            </p>
          </div>
        </div>

        {/* Atmospheric photo */}
        <div className="mb-24 md:mb-32 overflow-hidden">
          <img src="/images/studio/JollySchwarz-4173.webp" alt="True Canvas Studio" className="w-full aspect-[21/9] object-cover grayscale" loading="lazy" />
        </div>

        {/* Style filter — horizontal scroll */}
        <div className="mb-6">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12">
            <div className="flex gap-2 pb-6 border-b border-charcoal/10 min-w-max">
              <button onClick={() => setActiveStyle('Alle Stile')}
                className={`text-[10px] tracking-journal uppercase transition-all duration-300 px-4 py-2 shrink-0 ${activeStyle === 'Alle Stile' ? 'text-charcoal bg-charcoal/5 border border-charcoal/20' : 'text-charcoal/60 border border-transparent hover:border-charcoal/10 hover:text-charcoal'}`}>
                Alle Stile
              </button>
              {allStyles.map(s => (
                <button key={s} onClick={() => setActiveStyle(s)}
                  className={`text-[10px] tracking-journal uppercase transition-all duration-300 px-4 py-2 shrink-0 ${activeStyle === s ? 'text-charcoal bg-charcoal/5 border border-charcoal/20' : 'text-charcoal/60 border border-transparent hover:border-charcoal/10 hover:text-charcoal'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dropdowns: Month + Style */}
        <div className="flex gap-4 mb-12">
          {/* Month dropdown */}
          <div ref={monthRef} className="relative">
            <button onClick={(e) => { e.stopPropagation(); setMonthDropdown(!monthDropdown); setStyleDropdown(false); }}
              className="flex items-center gap-2 text-[11px] tracking-archive uppercase text-charcoal border border-charcoal/15 px-5 py-3 hover:bg-charcoal/5 transition-colors">
              {activeMonth === 'Alle Monate' ? 'Monat wählen' : activeMonth}
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${monthDropdown ? 'rotate-180' : ''}`} />
            </button>
            {monthDropdown && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-paper border border-charcoal/10 py-2 z-50 shadow-lg">
                {allMonths.map(m => (
                  <button key={m} onClick={() => { setActiveMonth(m); setMonthDropdown(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-[11px] tracking-journal uppercase transition-colors ${activeMonth === m ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style dropdown */}
          <div ref={styleRef} className="relative">
            <button onClick={(e) => { e.stopPropagation(); setStyleDropdown(!styleDropdown); setMonthDropdown(false); }}
              className="flex items-center gap-2 text-[11px] tracking-archive uppercase text-charcoal border border-charcoal/15 px-5 py-3 hover:bg-charcoal/5 transition-colors">
              {activeStyle === 'Alle Stile' ? 'Tattoostyle wählen' : activeStyle}
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${styleDropdown ? 'rotate-180' : ''}`} />
            </button>
            {styleDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-paper border border-charcoal/10 py-2 z-50 shadow-lg">
                <button onClick={() => { setActiveStyle('Alle Stile'); setStyleDropdown(false); }}
                  className={`block w-full text-left px-5 py-2.5 text-[11px] tracking-journal uppercase transition-colors ${activeStyle === 'Alle Stile' ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                  Alle Stile
                </button>
                {allStyles.map(s => (
                  <button key={s} onClick={() => { setActiveStyle(s); setStyleDropdown(false); }}
                    className={`block w-full text-left px-5 py-2.5 text-[11px] tracking-journal uppercase transition-colors ${activeStyle === s ? 'text-charcoal bg-charcoal/5' : 'text-charcoal/60 hover:bg-charcoal/5 hover:text-charcoal'}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active filters display */}
        {(activeStyle !== 'Alle Stile' || activeMonth !== 'Alle Monate') && (
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[10px] tracking-journal uppercase text-charcoal/60">Filter:</p>
            {activeMonth !== 'Alle Monate' && (
              <button onClick={() => setActiveMonth('Alle Monate')} className="text-[10px] tracking-journal uppercase text-charcoal bg-charcoal/5 px-3 py-1 flex items-center gap-2 hover:bg-charcoal/10 transition-colors">
                {activeMonth} <span className="text-charcoal/60">×</span>
              </button>
            )}
            {activeStyle !== 'Alle Stile' && (
              <button onClick={() => setActiveStyle('Alle Stile')} className="text-[10px] tracking-journal uppercase text-charcoal bg-charcoal/5 px-3 py-1 flex items-center gap-2 hover:bg-charcoal/10 transition-colors">
                {activeStyle} <span className="text-charcoal/60">×</span>
              </button>
            )}
            <button
              onClick={() => { setActiveStyle('Alle Stile'); setActiveMonth('Alle Monate'); }}
              className="text-[10px] tracking-journal uppercase text-charcoal/60 hover:text-charcoal transition-colors ml-2"
            >
              Alle zurücksetzen
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {filtered.map((artist, i) => (
            <a key={i} href={artist.instagram} target="_blank" rel="noopener noreferrer" className="group">
              <div className="overflow-hidden mb-3">
                <img src={artist.image} alt={artist.name} className="w-full aspect-square object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-sans text-charcoal/90 tracking-wide">@{artist.name}</p>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">{artist.dates}</p>
                </div>
                <Instagram className="w-3.5 h-3.5 text-charcoal/60 group-hover:text-charcoal transition-colors mt-0.5 shrink-0" />
              </div>
              <p className="text-[11px] text-charcoal/60 mt-1 tracking-wide">{artist.style}</p>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-20 font-serif italic text-charcoal/60">Keine Guest Artists gefunden.</p>
        )}

        {/* Results count */}
        <p className="text-[10px] tracking-journal uppercase text-charcoal/60 mt-8">
          {filtered.length} {filtered.length === 1 ? 'Artist' : 'Artists'}
        </p>

        {/* Bottom photos */}
        <div className="mt-32 md:mt-40 grid grid-cols-3 gap-4 md:gap-6">
          <div className="overflow-hidden"><img src="/images/studio/JollySchwarz-4003.webp" alt="Studio" className="w-full aspect-[4/5] object-cover grayscale" loading="lazy" /></div>
          <div className="overflow-hidden mt-12"><img src="/images/studio/JollySchwarz-4146.webp" alt="Studio" className="w-full aspect-[4/5] object-cover grayscale" loading="lazy" /></div>
          <div className="overflow-hidden"><img src="/images/studio/JollySchwarz-4268.webp" alt="Studio" className="w-full aspect-[4/5] object-cover grayscale" loading="lazy" /></div>
        </div>

        {/* Apply CTA */}
        <div className="mt-32 md:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center border-t border-charcoal/10 pt-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans tracking-[0.12em] uppercase text-charcoal mb-4">Dein Guestspot in Wien</h2>
            <p className="font-serif text-charcoal/70 text-base leading-relaxed max-w-lg">
              Du möchtest als Artist bei True Canvas arbeiten? Wir bieten dir einen voll ausgestatteten Arbeitsplatz in einem modernen, hellen Studio im Herzen Wiens.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <a href="https://form.jotform.com/210883790627060" target="_blank" rel="noopener noreferrer"
              className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500">
              Jetzt bewerben
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
