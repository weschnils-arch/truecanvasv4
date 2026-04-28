import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// V2 landing "Feedback" section — ported 1:1 (client: "Feedback und FAQs gefällt uns")
const reviews = [
  {
    name: 'Alex R.',
    initials: 'AR',
    dateKey: 'testi.date.2weeks',
    rating: 5,
    textKey: 'testi.1.text',
  },
  {
    name: 'Priya S.',
    initials: 'PS',
    dateKey: 'testi.date.1month',
    rating: 5,
    textKey: 'testi.2.text',
  },
  {
    name: 'Marco T.',
    initials: 'MT',
    dateKey: 'testi.date.3weeks',
    rating: 5,
    textKey: 'testi.3.text',
  },
  {
    name: 'Julia K.',
    initials: 'JK',
    dateKey: 'testi.date.2months',
    rating: 5,
    textKey: 'testi.4.text',
  },
  {
    name: 'David M.',
    initials: 'DM',
    dateKey: 'testi.date.1month',
    rating: 5,
    textKey: 'testi.5.text',
  },
  {
    name: 'Sarah L.',
    initials: 'SL',
    dateKey: 'testi.date.3months',
    rating: 5,
    textKey: 'testi.6.text',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLImageElement>(null);
  const t = useTranslate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-heading', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      gsap.from('.review-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.review-card', start: 'top 88%', once: true },
      });

      if (innerImageRef.current && imageWrapperRef.current) {
        gsap.fromTo(
          innerImageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 md:pt-24 bg-[#EDECE9]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="testimonials-heading mb-16 md:mb-24">
          <p className="text-[11px] heading-caps text-charcoal/70 mb-6">
            {t('testi.eyebrow')}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl heading-caps text-charcoal">
            {t('testi.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="review-card bg-white p-8 md:p-10">
              <StarRating count={review.rating} />
              <p className="text-sm text-charcoal/70 leading-[1.85] mt-5 mb-8">
                "{t(review.textKey)}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center">
                  <span className="text-[10px] heading-caps text-charcoal/70">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-charcoal">{review.name}</p>
                  <p className="text-[10px] text-charcoal/60">{t(review.dateKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] heading-caps text-charcoal/60 mt-12 text-center">
          {t('testi.google')}
        </p>
      </div>

      {/* Full-bleed landscape image with parallax — client's "Querformat Bild über FAQs als Trennung" */}
      <div ref={imageWrapperRef} className="w-full overflow-hidden aspect-[21/7] md:aspect-[21/6] mt-16 md:mt-24">
        <img
          ref={innerImageRef}
          src="/images/studio/JollySchwarz-4003.webp"
          alt="True Canvas Studio"
          loading="lazy"
          className="w-full h-[120%] object-cover"
        />
      </div>
    </section>
  );
}
