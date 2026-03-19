import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Alex R.',
    initials: 'AR',
    date: 'vor 2 Wochen',
    rating: 5,
    text: 'Die ruhigste Studio-Atmosphare, in der ich je war. Das Tattoo ist perfekt geheilt und sieht fantastisch aus.',
  },
  {
    name: 'Priya S.',
    initials: 'PS',
    date: 'vor 1 Monat',
    rating: 5,
    text: 'Lena hat mir zugehort, Anpassungen vorgenommen und genau das geliefert, was ich mir vorgestellt habe.',
  },
  {
    name: 'Marco T.',
    initials: 'MT',
    date: 'vor 3 Wochen',
    rating: 5,
    text: 'Saubere Linien, tolle Energie, null Stress. Ich komme definitiv wieder fur mein nachstes Tattoo.',
  },
  {
    name: 'Julia K.',
    initials: 'JK',
    date: 'vor 2 Monaten',
    rating: 5,
    text: 'Ein Studio, das wirklich anders ist. Man fuhlt sich sofort willkommen und verstanden. Absolut empfehlenswert!',
  },
  {
    name: 'David M.',
    initials: 'DM',
    date: 'vor 1 Monat',
    rating: 5,
    text: 'Professionell von Anfang bis Ende. Die Beratung war ehrlich und das Ergebnis ubertrifft meine Erwartungen.',
  },
  {
    name: 'Sarah L.',
    initials: 'SL',
    date: 'vor 3 Monaten',
    rating: 5,
    text: 'Mein drittes Tattoo bei True Canvas und jedes Mal bin ich begeistert. Hygiene, Beratung und Ergebnis stimmen einfach.',
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-heading', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.review-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.review-card',
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-[#EDECE9]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <div className="testimonials-heading mb-16 md:mb-24">
          <p className="text-[11px] tracking-archive uppercase text-charcoal/70 mb-6">
            Kundenstimmen
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-archive uppercase text-charcoal">
            Feedback
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="review-card bg-white p-8 md:p-10"
            >
              <StarRating count={review.rating} />
              <p className="text-sm text-charcoal/60 leading-relaxed mt-5 mb-8">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center">
                  <span className="text-[10px] tracking-journal uppercase text-charcoal/70">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-charcoal">{review.name}</p>
                  <p className="text-[10px] text-charcoal/60">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Attribution */}
        <p className="text-[10px] tracking-journal uppercase text-charcoal/60 mt-12 text-center">
          Basierend auf Google Rezensionen
        </p>
      </div>
    </section>
  );
}
