import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import { artistsConfig, tattooStylesConfig } from '../config';

const allStyles = ['Alle', ...tattooStylesConfig.styles.map(s => s.name)];

export default function ArtistsPage() {
  const [activeStyle, setActiveStyle] = useState('Alle');

  const filtered = activeStyle === 'Alle'
    ? artistsConfig.artists
    : artistsConfig.artists.filter(a => a.styles.includes(activeStyle));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#F7F6F4] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">Das Kollektiv</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.15em] uppercase text-charcoal leading-none">
              Unsere Artists
            </h1>
          </div>
          <div className="flex items-end">
            <p className="font-serif italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-md">
              True Canvas ist ein Kollektiv aus Resident Artists, die technisches Fachwissen mit künstlerischer Leidenschaft verbinden.
            </p>
          </div>
        </div>

        {/* Atmospheric photo */}
        <div className="mb-24 md:mb-32 overflow-hidden">
          <img src="/images/studio/JollySchwarz-4211.webp" alt="True Canvas Studio" className="w-full aspect-[21/9] object-cover grayscale" loading="lazy" />
        </div>

        {/* Style Filter — horizontal scroll */}
        <div className="relative mb-12">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12">
            <div className="flex gap-2 pb-6 border-b border-charcoal/10 min-w-max">
              {allStyles.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStyle(s)}
                  className={`text-[10px] tracking-journal uppercase transition-all duration-300 px-4 py-2 shrink-0 ${
                    activeStyle === s
                      ? 'text-charcoal bg-charcoal/5 border border-charcoal/20'
                      : 'text-charcoal/60 border border-transparent hover:border-charcoal/10 hover:text-charcoal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-24 md:gap-y-32">
          {filtered.map((artist, i) => (
            <a
              key={artist.id}
              href={`https://www.instagram.com/${artist.instagram?.replace('@', '')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${i % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="overflow-hidden mb-6">
                <img src={artist.image} alt={artist.name}
                  className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans tracking-[0.12em] uppercase text-charcoal mb-2">{artist.name}</h3>
                  <p className="text-[11px] tracking-journal uppercase text-charcoal/60">{artist.styles.join(' / ')}</p>
                </div>
                <Instagram className="w-4 h-4 text-charcoal/60 group-hover:text-charcoal transition-colors mt-2 shrink-0" />
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-20 font-serif italic text-charcoal/60">Keine Artists in diesem Stil gefunden.</p>
        )}

        {/* Bottom photos */}
        <div className="mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden"><img src="/images/studio/JollySchwarz-4295.webp" alt="Studio" className="w-full aspect-square object-cover grayscale" loading="lazy" /></div>
          <div className="overflow-hidden md:mt-16"><img src="/images/studio/JollySchwarz-4112.webp" alt="Studio" className="w-full aspect-square object-cover grayscale" loading="lazy" /></div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <p className="font-serif italic text-lg text-charcoal/70 mb-8">Finde den Artist, der deine Vision versteht.</p>
          <a href="https://form.jotform.com/210883790627060" target="_blank" rel="noopener noreferrer"
            className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500">
            Termin anfragen
          </a>
        </div>
      </div>
    </div>
  );
}
