import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { studioConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

function Slideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % images.length), 5000);
  }, [images.length]);

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetInterval]);

  const go = (idx: number) => { setCurrent(idx); resetInterval(); };

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy" />
      ))}
      <button onClick={() => go((current - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-label="Previous">
        <ChevronLeft className="w-4 h-4 text-charcoal" />
      </button>
      <button onClick={() => go((current + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-label="Next">
        <ChevronRight className="w-4 h-4 text-charcoal" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

const detailPhotos = [
  { src: '/images/studio/JollySchwarz-4038.webp', alt: 'Framed artwork detail' },
  { src: '/images/studio/JollySchwarz-4295.webp', alt: 'Wall lights' },
  { src: '/images/studio/JollySchwarz-4075.webp', alt: 'Mirror reflection' },
  { src: '/images/studio/JollySchwarz-4253.webp', alt: 'Ring light detail' },
];

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wideImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.studio-header', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });

      if (wideImageRef.current) {
        gsap.to(wideImageRef.current.querySelector('img'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: wideImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      gsap.from('.studio-photo', {
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.studio-photos', start: 'top 85%' },
      });

      gsap.from('.detail-photo', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.detail-grid', start: 'top 85%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const descParagraphs = studioConfig.description.split('\n\n');

  return (
    <div ref={containerRef} className="bg-[#F7F6F4] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="studio-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 md:mb-32">
          <div>
            <p className="text-[11px] tracking-archive uppercase text-charcoal/60 mb-6">
              {studioConfig.subtitle}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.15em] uppercase text-charcoal leading-none">
              {studioConfig.title}
            </h1>
          </div>
          <div className="flex items-end">
            <p className="font-serif italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-md">
              {descParagraphs[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed wide studio image with parallax */}
      <div ref={wideImageRef} className="w-full overflow-hidden mb-32 md:mb-40" style={{ height: '70vh' }}>
        <img
          src="/images/studio/JollySchwarz-4189.webp"
          alt="True Canvas Studio Lounge"
          className="w-full h-[120%] object-cover grayscale"
          loading="lazy"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Studio story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-32 md:mb-40">
          {descParagraphs.slice(1).map((p, i) => (
            <p key={i} className="font-serif text-charcoal/70 text-base md:text-lg leading-[1.9]">
              {p}
            </p>
          ))}
        </div>

        {/* Three Studios — each with photo, name, description */}
        <div className="flex flex-col gap-32 md:gap-40 mb-32 md:mb-40">
          {[
            {
              number: '01',
              name: 'Studio 1',
              subtitle: 'Der Empfang',
              description: 'Ein einladender Raum mit warmem Licht und durchdachtem Design. Hier beginnt dein Tattoo-Erlebnis — entspannt, persönlich und mit voller Aufmerksamkeit auf dich.',
              images: [
                '/images/studio/JollySchwarz-3999.webp',
                '/images/studio/JollySchwarz-4003.webp',
                '/images/studio/JollySchwarz-3975.webp',
              ],
            },
            {
              number: '02',
              name: 'Studio 2',
              subtitle: 'Das Atelier',
              description: 'Hell, modern und auf Präzision ausgelegt. Unser zweites Studio bietet Platz für detailreiches Arbeiten in ruhiger Atmosphäre — mit natürlichem Licht und professionellem Equipment.',
              images: [
                '/images/studio/JollySchwarz-4134.webp',
                '/images/studio/JollySchwarz-4112.webp',
                '/images/studio/JollySchwarz-4146.webp',
              ],
            },
            {
              number: '03',
              name: 'Studio 3',
              subtitle: 'Das Gewölbe',
              description: 'Unter historischen Bögen entsteht zeitgenössische Kunst. Das größte unserer drei Studios vereint Wiener Altbau-Charme mit moderner Tattoo-Ausstattung.',
              images: [
                '/images/studio/JollySchwarz-4173.webp',
                '/images/studio/JollySchwarz-4185.webp',
                '/images/studio/JollySchwarz-4189.webp',
              ],
            },
          ].map((studio, i) => (
            <div
              key={studio.number}
              className="studio-photo grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <Slideshow images={studio.images} alt={studio.name} />
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-[80px] md:text-[100px] font-sans text-charcoal/[0.04] leading-none block -mb-8">
                  {studio.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-sans tracking-[0.12em] uppercase text-charcoal mb-2">
                  {studio.name}
                </h3>
                <p className="font-serif italic text-base text-charcoal/60 mb-6">
                  {studio.subtitle}
                </p>
                <p className="font-serif text-charcoal/70 text-base leading-relaxed max-w-lg">
                  {studio.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mb-32 md:mb-40 max-w-3xl mx-auto">
          <p className="font-serif italic text-2xl md:text-3xl text-charcoal/70 leading-relaxed">
            "Ein kuratierter Raum, in dem Tätowieren zur Kunst wird."
          </p>
        </div>

        {/* Detail photos */}
        <div className="detail-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32 md:mb-40">
          {detailPhotos.map((photo, i) => (
            <div key={i} className={`detail-photo overflow-hidden ${i % 2 === 1 ? 'mt-8 md:mt-12' : ''}`}>
              <img src={photo.src} alt={photo.alt} className="w-full aspect-square object-cover grayscale" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Contact with Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Map */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d16.366!3d48.193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWeyringergasse+19%2C+1040+Wien!5e0!3m2!1sde!2sat!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TrueCanvas Studio Wien"
            />
          </div>

          {/* CTA Content */}
          <div className="flex flex-col justify-center">
            <div className="w-12 h-px bg-charcoal/20 mb-10" />
            <p className="text-[11px] tracking-archive uppercase text-charcoal/70 mb-6">
              Kontakt
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-archive uppercase text-charcoal mb-8">
              Zeit fur dein neues Tattoo
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-10 max-w-md">
              Bereit fur dein nachstes Tattoo? Beschreibe uns kurz deine Idee, die gewunschte Stelle und den Stil. Wir melden uns zeitnah bei dir.
            </p>

            <div className="space-y-4 mb-10">
              <p className="text-sm text-charcoal/60">
                Weyringergasse 19/1-3
                <br />
                1040 Wien
              </p>
              <p className="text-sm text-charcoal/60">
                info@truecanvas.at
              </p>
            </div>

            <a
              href="https://form.jotform.com/210883790627060"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500 self-start"
            >
              Termin anfragen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
