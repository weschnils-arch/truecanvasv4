import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoSrc from '../assets/images/logo_truecanvas.webp';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Hero = V2 layout per client.
 * Reveal: logo (delay 1s) → "True Canvas" brand name (delay 1.8s).
 * Client: "Sanftes Auftauchen des Logos und der Schrift ... eine Sekunde schneller".
 * No tagline — client feedback only referenced the logo + brand name reveal.
 */
export function Hero({
  imageSrc = '/images/studio/JollySchwarz-4031.webp',
  imageAlt = 'True Canvas Studio',
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRevealRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRevealRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.6, delay: 1, ease: 'power2.out' }
      );

      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.6, delay: 1.8, ease: 'power2.out' }
      );

      if (imageRef.current && heroRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (textRef.current && heroRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '20% top',
            end: '60% top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          style={{
            filter: 'grayscale(100%)',
            objectPosition: '72% center',
            transform: 'scale(1.18)',
            transformOrigin: '72% center',
          }}
        />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
      >
        <img
          ref={logoRevealRef}
          src={logoSrc}
          alt="True Canvas"
          className="w-20 h-20 md:w-28 md:h-28 object-contain mb-8 md:mb-10 opacity-0"
          style={{ filter: 'invert(1)' }}
        />
        <h1
          ref={brandRef}
          className="text-white text-5xl md:text-7xl lg:text-8xl heading-caps opacity-0"
        >
          True Canvas
        </h1>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-white/30 mx-auto animate-pulse" />
      </div>
    </section>
  );
}
