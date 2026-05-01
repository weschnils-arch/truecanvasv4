import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    catKey: 'faqp.cat1',
    questions: [
      { qKey: 'faqp.c1.q1.q', aKey: 'faqp.c1.q1.a' },
      { qKey: 'faqp.c1.q2.q', aKey: 'faqp.c1.q2.a' },
      { qKey: 'faqp.c1.q3.q', aKey: 'faqp.c1.q3.a' },
      { qKey: 'faqp.c1.q4.q', aKey: 'faqp.c1.q4.a' },
      { qKey: 'faqp.c1.q5.q', aKey: 'faqp.c1.q5.a' },
    ],
  },
  {
    catKey: 'faqp.cat2',
    questions: [
      { qKey: 'faqp.c2.q1.q', aKey: 'faqp.c2.q1.a' },
      { qKey: 'faqp.c2.q2.q', aKey: 'faqp.c2.q2.a' },
      { qKey: 'faqp.c2.q3.q', aKey: 'faqp.c2.q3.a' },
      { qKey: 'faqp.c2.q4.q', aKey: 'faqp.c2.q4.a' },
      { qKey: 'faqp.c2.q5.q', aKey: 'faqp.c2.q5.a' },
      { qKey: 'faqp.c2.q6.q', aKey: 'faqp.c2.q6.a' },
      { qKey: 'faqp.c2.q7.q', aKey: 'faqp.c2.q7.a' },
    ],
  },
  {
    catKey: 'faqp.cat3',
    questions: [
      { qKey: 'faqp.c3.q1.q', aKey: 'faqp.c3.q1.a' },
      { qKey: 'faqp.c3.q2.q', aKey: 'faqp.c3.q2.a' },
      { qKey: 'faqp.c3.q3.q', aKey: 'faqp.c3.q3.a' },
    ],
  },
  {
    catKey: 'faqp.cat4',
    questions: [
      { qKey: 'faqp.c4.q1.q', aKey: 'faqp.c4.q1.a' },
      { qKey: 'faqp.c4.q2.q', aKey: 'faqp.c4.q2.a' },
      { qKey: 'faqp.c4.q3.q', aKey: 'faqp.c4.q3.a' },
      { qKey: 'faqp.c4.q4.q', aKey: 'faqp.c4.q4.a' },
      { qKey: 'faqp.c4.q5.q', aKey: 'faqp.c4.q5.a' },
      { qKey: 'faqp.c4.q6.q', aKey: 'faqp.c4.q6.a' },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-charcoal/8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 group"
      >
        <span className="text-sm md:text-base text-charcoal/80 group-hover:text-charcoal transition-colors leading-snug pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          {isOpen ? <Minus className="w-4 h-4 text-charcoal/40" /> : <Plus className="w-4 h-4 text-charcoal/40" />}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm text-charcoal/60 leading-[1.85] pb-6 pr-10">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.faq-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.faq-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.faq-category').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <p className="faq-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('faqp.eyebrow')}</p>
        <h1 className="faq-title text-4xl md:text-6xl lg:text-7xl heading-caps leading-[0.95] mb-8 whitespace-nowrap">
          {t('faqp.title.l1')} {t('faqp.title.l2')}
        </h1>
        <p className="faq-intro text-lg text-charcoal/70 max-w-lg leading-[1.75]">
          {t('faqp.intro')}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[900px] mx-auto px-6">
        {CATEGORIES.map((group, gi) => (
          <div key={gi} className="faq-category mb-16 md:mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[11px] heading-caps text-charcoal/35">{String(gi + 1).padStart(2, '0')}</span>
              <h2 className="text-lg md:text-xl heading-caps-tight">{t(group.catKey)}</h2>
            </div>
            <div>
              {group.questions.map((item, qi) => (
                <AccordionItem key={qi} question={t(item.qKey)} answer={t(item.aKey)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="text-lg text-charcoal/70 mb-6">
          {t('faqp.contact.line')}
        </p>
        <a
          href="mailto:info@truecanvas.at"
          className="text-base text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-1"
        >
          info@truecanvas.at
        </a>
      </div>
    </div>
  );
}
