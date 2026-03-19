import { useEffect, useState, useRef } from 'react';
import { Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artists = [
  { name: 'Max', handle: '@thommesen_ink', styles: ['Realismus', 'Surrealismus'], image: '/images/artists/max.webp', instagram: 'https://instagram.com/thommesen_ink' },
  { name: 'Vroni', handle: '@tattooist_veronika', styles: ['Fineline', 'Floral'], image: '/images/artists/vroni.webp', instagram: 'https://instagram.com/tattooist_veronika' },
  { name: 'Roli', handle: '@roli_ink', styles: ['Realismus', 'Cover-up'], image: '/images/artists/roli.webp', instagram: 'https://instagram.com/roli_ink' },
  { name: 'Rita', handle: '@innerbloom.ink', styles: ['Floral', 'Watercolor'], image: '/images/artists/rita.webp', instagram: 'https://instagram.com/innerbloom.ink' },
  { name: 'Nana', handle: '@n.ana.ink', styles: ['Realismus B&G', 'Dotwork'], image: '/images/artists/nana.webp', instagram: 'https://instagram.com/n.ana.ink' },
  { name: 'Hera', handle: '@tati.tatts.od', styles: ['Anime', 'Illustrativ'], image: '/images/artists/hera.webp', instagram: 'https://instagram.com/tati.tatts.od' },
  { name: 'Alina', handle: '@a.l.i.e.n.tattoo', styles: ['Realismus', 'Dark Art'], image: '/images/artists/alina.webp', instagram: 'https://instagram.com/a.l.i.e.n.tattoo' },
];

const allStyles = [...new Set(artists.flatMap(a => a.styles))];

export default function ArtistsPage() {
  const [activeStyle, setActiveStyle] = useState('Alle');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = activeStyle === 'Alle'
    ? artists
    : artists.filter(a => a.styles.includes(activeStyle));

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
  }, [activeStyle]);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      {/* Hero — full width, left-aligned */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-8">
        <p className="ap-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">Das Kollektiv</p>
        <h1 className="ap-title text-5xl md:text-7xl lg:text-[5.5rem] heading-caps leading-[0.95] mb-8 max-w-4xl">
          Unsere<br />Artists
        </h1>
        <p className="ap-subtitle serif-italic text-lg md:text-xl text-charcoal/60 max-w-xl leading-relaxed">
          Sieben Künstler. Sieben Handschriften. Vereint unter einem Dach im Herzen Wiens.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Pill Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="ap-pills flex flex-wrap gap-2 mb-4">
          <button onClick={() => setActiveStyle('Alle')}
            className={`text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
              activeStyle === 'Alle' ? 'bg-charcoal text-paper border-charcoal' : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
            }`}>
            Alle
          </button>
          {allStyles.map(s => (
            <button key={s} onClick={() => setActiveStyle(s)}
              className={`text-[11px] heading-caps px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeStyle === s ? 'bg-charcoal text-paper border-charcoal' : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
              }`}>
              {s}
            </button>
          ))}
        </div>
        <p className="text-[11px] heading-caps text-charcoal/35 mb-10">{filtered.length} {filtered.length === 1 ? 'Artist' : 'Artists'}</p>
      </div>

      {/* Masonry-style alternating grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8">
          {filtered.map((artist, i) => {
            // Alternating sizes: every 3rd card is tall, others normal
            const isTall = i % 3 === 0;
            const hasTopOffset = i % 3 === 1;

            return (
              <a
                key={artist.handle}
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`artist-tile group block mb-8 md:mb-12 ${hasTopOffset ? 'md:mt-16' : ''}`}
              >
                <div className={`overflow-hidden relative ${isTall ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-end p-6">
                    <Instagram className="w-5 h-5 text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Info below image */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg md:text-xl heading-caps-tight leading-tight">{artist.name}</h3>
                    <p className="text-[12px] text-charcoal/50 mt-1">{artist.handle}</p>
                  </div>
                  <p className="text-[11px] text-charcoal/40 text-right leading-snug mt-1">
                    {artist.styles.join(' / ')}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 serif-italic text-charcoal/50 text-lg">Keine Artists in dieser Kategorie.</p>
        )}
      </div>

      {/* CTA */}
      <div className="bg-charcoal text-paper py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl heading-caps-tight mb-3">Bereit für dein Projekt?</h2>
            <p className="serif-italic text-paper/60 max-w-md">
              Sende uns deine Idee und wir verbinden dich mit dem passenden Artist.
            </p>
          </div>
          <a
            href="https://form.jotform.com/210883790627060"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-paper/20 text-[11px] heading-caps text-paper hover:bg-paper hover:text-charcoal transition-all duration-500"
          >
            Termin anfragen
          </a>
        </div>
      </div>
    </div>
  );
}
