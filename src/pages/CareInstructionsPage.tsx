import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    period: 'Tag 1 – 7',
    title: 'Die Membran arbeitet',
    instructions: [
      'Solange die Folie auf der Haut ist machst du gar nichts. Nichts. Überhaupt Nichts. Das ist eine der wichtigsten Pflegeempfehlungen überhaupt — überfordere deine Haut nicht.',
      'Sollte sich in den ersten Stunden eine störende Blase mit Wundflüssigkeit gebildet haben, dann ist das nicht schlimm. Das dickt durch die Verdunstung ein.',
      'Duschen ist mit der Membran ganz normal möglich.',
    ],
  },
  {
    period: 'Tag 8',
    title: 'Folie entfernen',
    instructions: [
      'Nach 7 Tagen entfernst du die Membran, indem du sie an einer Ecke oder Kante anhebst und lauwarmes Wasser zwischen Haut und Folie laufen lässt und dann vorsichtig abziehst.',
      'Wasche die Haut mit warmem Wasser und PH-neutraler Seife mit sauberen, frisch gewaschenen Händen.',
      'Trockne die Haut anschließend mit einem Einwegtuch (Küchenrolle) tupfend ab.',
    ],
  },
  {
    period: 'Tag 8 – 22',
    title: 'Pflege & Heilung',
    instructions: [
      'Bis etwa zwei Wochen nach dem Ablösen der Folie wiederholst du das hauchdünne Eincremen (mit sauberen, gewaschenen Händen) täglich 2-3 Mal.',
      'Verwende ausschließlich die im Studio erhältlichen Aftercare-Cremes.',
      'Weniger ist mehr — eine dünne Schicht reicht völlig aus.',
    ],
  },
];

const donts = [
  { label: '3 – 4 Wochen', text: 'Kein Schwimmbad, Meer oder Badewanne — die Haut quillt auf und die Farbe kann beeinträchtigt werden.' },
  { label: 'Sonne', text: '3-4 Wochen lang tabu. Danach ist Sonnenschutz mit hohem LSF absolute Pflicht.' },
  { label: 'Körperpflege', text: 'Keine Saunagänge, Dampfbäder oder intensiver Sport. Schwitzen auf der frischen Wunde unbedingt vermeiden.' },
  { label: 'Produkte', text: 'Verwende nur die empfohlenen Aftercare-Produkte. Keine parfümierten Lotions oder Cremes.' },
  { label: 'Kleidung', text: 'Vermeide enge, reibende Kleidung auf dem frischen Tattoo. Lockere, atmungsaktive Stoffe sind ideal.' },
  { label: 'Berührung', text: 'Nicht kratzen, nicht zupfen. Auch wenn es juckt — lass die Haut in Ruhe heilen.' },
];

export default function CareInstructionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ci-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.ci-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.ci-quote', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.ci-phase').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.ci-dont').forEach(el => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      {/* Hero */}
      <div className="max-w-[1000px] mx-auto px-6 pt-12">
        <p className="ci-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">Aftercare</p>
        <h1 className="ci-title text-4xl md:text-6xl lg:text-7xl heading-caps leading-[0.95] mb-8">
          Pflege deines<br />neuen Tattoos
        </h1>
        <p className="ci-quote serif-italic text-xl md:text-2xl text-charcoal/55 max-w-xl leading-relaxed">
          "Ein perfektes Ergebnis braucht die richtige Heilung."
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Timeline Phases */}
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="space-y-16 md:space-y-24">
          {phases.map((phase, i) => (
            <div key={i} className="ci-phase grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              {/* Left — label */}
              <div className="md:col-span-4">
                <span className="text-[48px] md:text-[64px] heading-caps text-charcoal/[0.06] leading-none block -mb-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[11px] heading-caps text-charcoal/45 mb-1">{phase.period}</p>
                <h3 className="text-lg md:text-xl heading-caps-tight">{phase.title}</h3>
              </div>

              {/* Right — content */}
              <div className="md:col-span-8 space-y-4">
                {phase.instructions.map((text, j) => (
                  <p key={j} className="text-charcoal/60 text-base leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-16 md:my-24" />

      {/* Do's & Don'ts — dark section */}
      <div className="bg-charcoal text-paper py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-[11px] heading-caps text-paper/40 mb-4">Wichtig</p>
          <h2 className="text-2xl md:text-4xl heading-caps leading-[1.05] mb-12 md:mb-16">
            Was du tun oder<br />lassen sollst
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {donts.map((item, i) => (
              <div key={i} className="ci-dont">
                <p className="text-[11px] heading-caps text-paper/35 mb-2">{item.label}</p>
                <p className="text-paper/70 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Important Note */}
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto text-center">
          <p className="serif-italic text-xl text-charcoal/55 leading-relaxed mb-8">
            "Sollte etwas nicht so aussehen wie erwartet oder du dir unsicher sein, melde dich jederzeit bei uns."
          </p>
          <div className="space-y-3 text-sm text-charcoal/50">
            <p>Weyringergasse 19/1-3, 1040 Wien</p>
            <a
              href="mailto:info@truecanvas.at"
              className="serif-italic text-charcoal hover:text-charcoal/60 transition-colors border-b border-charcoal/20 pb-0.5 inline-block"
            >
              info@truecanvas.at
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
