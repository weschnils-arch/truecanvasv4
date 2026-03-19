import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const studios = [
  {
    number: '01',
    name: 'Der Empfang',
    description: 'Ein einladender Raum mit warmem Licht und durchdachtem Design. Hier beginnt dein Tattoo-Erlebnis — entspannt, persönlich und mit voller Aufmerksamkeit auf dich.',
    images: ['/images/studio/JollySchwarz-3999.webp', '/images/studio/JollySchwarz-4003.webp', '/images/studio/JollySchwarz-3975.webp'],
  },
  {
    number: '02',
    name: 'Das Atelier',
    description: 'Hell, modern und auf Präzision ausgelegt. Unser zweites Studio bietet Platz für detailreiches Arbeiten in ruhiger Atmosphäre — mit natürlichem Licht und professionellem Equipment.',
    images: ['/images/studio/JollySchwarz-4134.webp', '/images/studio/JollySchwarz-4112.webp', '/images/studio/JollySchwarz-4146.webp'],
  },
  {
    number: '03',
    name: 'Das Gewölbe',
    description: 'Unter historischen Bögen entsteht zeitgenössische Kunst. Das größte unserer drei Studios vereint Wiener Altbau-Charme mit moderner Tattoo-Ausstattung.',
    images: ['/images/studio/JollySchwarz-4173.webp', '/images/studio/JollySchwarz-4185.webp', '/images/studio/JollySchwarz-4189.webp'],
  },
];

const galleryImages = [
  '/images/studio/JollySchwarz-4038.webp',
  '/images/studio/JollySchwarz-4075.webp',
  '/images/studio/JollySchwarz-4017.webp',
  '/images/studio/JollySchwarz-4211.webp',
  '/images/studio/JollySchwarz-4253.webp',
  '/images/studio/JollySchwarz-4146.webp',
];

function MiniSlideshow({ images, alt }: { images: string[]; alt: string }) {
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

  const go = (dir: number) => {
    setCurrent(c => (c + dir + images.length) % images.length);
    resetInterval();
  };

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group">
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy" />
      ))}
      <button onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-paper/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Zurück">
        <ChevronLeft className="w-4 h-4 text-charcoal" />
      </button>
      <button onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-paper/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Weiter">
        <ChevronRight className="w-4 h-4 text-charcoal" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); resetInterval(); }}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'bg-paper w-4' : 'bg-paper/50 w-1.5'}`} aria-label={`Bild ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.sp-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.sp-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.sp-quote', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

      // Horizontal gallery parallax
      const gallery = document.querySelector('.sp-hgallery');
      if (gallery) {
        gsap.to(gallery, {
          x: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: '.sp-hgallery-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Studio sections
      gsap.utils.toArray<HTMLElement>('.sp-studio-block').forEach(el => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Pull quote
      const pq = document.querySelector('.sp-pullquote');
      if (pq) {
        gsap.fromTo(pq, { scale: 0.95, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: pq, start: 'top 80%' },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <p className="sp-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">Weyringergasse 19, 1040 Wien</p>
        <h1 className="sp-title text-5xl md:text-7xl lg:text-[6rem] heading-caps leading-[0.92] max-w-5xl">
          Das Studio
        </h1>
      </div>

      {/* Full-width hero image */}
      <div className="w-full overflow-hidden mt-10 mb-0" style={{ height: '65vh', minHeight: '400px' }}>
        <img
          src="/images/studio/JollySchwarz-4189.webp"
          alt="True Canvas Studio"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Intro text */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <p className="sp-quote serif-italic text-2xl md:text-3xl text-charcoal/70 leading-relaxed">
            "Ein kuratierter Raum, in dem Tätowieren zur Kunst wird."
          </p>
          <div className="space-y-6">
            <p className="text-charcoal/65 text-base md:text-lg leading-[1.85]">
              Tattoo Studio True Canvas wurde 2019 in Wien gegründet — mit dem Anspruch, einen Ort zu schaffen, an dem höchste künstlerische Qualität auf eine Atmosphäre trifft, in der sich jeder wohlfühlt.
            </p>
            <p className="text-charcoal/65 text-base md:text-lg leading-[1.85]">
              Auf über 200m² vereinen wir drei individuelle Studios, einen einladenden Empfangsbereich und einen Raum für Beratungsgespräche. Jedes Detail wurde mit Sorgfalt ausgewählt.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Horizontal scrolling gallery */}
      <div className="sp-hgallery-wrap overflow-hidden py-16 md:py-24">
        <div className="sp-hgallery flex gap-4 md:gap-6 pl-6 md:pl-12" style={{ width: 'max-content' }}>
          {galleryImages.map((src, i) => (
            <div key={i} className={`overflow-hidden flex-shrink-0 ${i % 2 === 0 ? 'w-[300px] md:w-[400px] aspect-[3/4]' : 'w-[400px] md:w-[500px] aspect-[4/3]'}`}>
              <img src={src} alt={`Studio Detail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Three Studios */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="text-[11px] heading-caps text-charcoal/50 mb-16">Drei Räume — eine Vision</p>

        <div className="space-y-24 md:space-y-32">
          {studios.map((studio, i) => (
            <div key={studio.number} className={`sp-studio-block grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <MiniSlideshow images={studio.images} alt={studio.name} />
              </div>
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <span className="text-[72px] md:text-[96px] heading-caps text-charcoal/[0.04] leading-none block -mb-6 md:-mb-8">
                  {studio.number}
                </span>
                <h3 className="text-2xl md:text-3xl heading-caps-tight mb-4">{studio.name}</h3>
                <p className="text-charcoal/60 text-base leading-relaxed max-w-md">
                  {studio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pull Quote */}
      <div className="sp-pullquote max-w-3xl mx-auto px-6 text-center py-20 md:py-28">
        <p className="serif-italic text-2xl md:text-4xl text-charcoal/65 leading-relaxed">
          "Wir glauben, dass die Umgebung die Kunst beeinflusst. Deshalb haben wir einen Raum geschaffen, der Kreativität atmet."
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Contact & Map */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[450px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d16.366!3d48.193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWeyringergasse+19%2C+1040+Wien!5e0!3m2!1sde!2sat!4v1"
              width="100%" height="100%"
              style={{ border: 0, filter: 'grayscale(1)' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TrueCanvas Studio Wien"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-6">Kontakt</p>
            <h2 className="text-3xl md:text-4xl heading-caps leading-[1.05] mb-6">Besuche uns</h2>
            <div className="space-y-3 text-charcoal/55 text-sm mb-10">
              <p>Weyringergasse 19/1-3<br />1040 Wien</p>
              <p>info@truecanvas.at</p>
            </div>
            <a
              href="https://form.jotform.com/210883790627060"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block self-start px-12 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
            >
              Termin anfragen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
