import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 md:py-8 text-left group"
      >
        <span className="text-sm md:text-base text-charcoal pr-8" style={{ fontWeight: 400 }}>
          {question}
        </span>
        <span className="text-charcoal/70 flex-shrink-0 transition-transform duration-500" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height }}
      >
        <p className="text-sm text-charcoal/70 leading-relaxed pb-8 pr-16 max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-heading', {
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

      gsap.from('.faq-list', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="faq-heading mb-16 md:mb-20">
            <p className="text-[11px] tracking-archive uppercase text-charcoal/70 mb-6">
              {faqConfig.subtitle}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-archive uppercase text-charcoal">
              {faqConfig.titleRegular} {faqConfig.titleItalic}
            </h2>
          </div>

          {/* Accordion */}
          <div className="faq-list border-t border-charcoal/10">
            {faqConfig.faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>

          {/* More Button */}
          <div className="mt-12 text-center">
            <a
              href="/faq"
              className="inline-block px-10 py-3 border border-charcoal/15 text-[11px] tracking-archive uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
            >
              Alle Fragen ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
