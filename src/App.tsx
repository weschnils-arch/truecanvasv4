import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { useBookingUrl } from './hooks/useBookingUrl';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { LanguageProvider, useLang, useTranslate } from './context/LanguageContext';
import logoSrc from './assets/images/logo_truecanvas.webp';

// Lazy-loaded pages
const ArtistsPage = lazy(() => import('./pages/ArtistsPage'));
const GuestArtists = lazy(() => import('./pages/GuestArtists'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const CareInstructionsPage = lazy(() => import('./pages/CareInstructionsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PiercingPage = lazy(() => import('./pages/PiercingPage'));
const MaydunaPage = lazy(() => import('./pages/MaydunaPage'));
const LaserentfernungPage = lazy(() => import('./pages/LaserentfernungPage'));

gsap.registerPlugin(ScrollTrigger);

/* ─── Residents (4-up grid) ─── */
const RESIDENTS = [
  { name: 'Max',   instagram: '@thommesen_ink',        image: '/images/artists/max.webp' },
  { name: 'Vroni', instagram: '@tattooist_veronika',   image: '/images/artists/vroni.webp' },
  { name: 'Roli',  instagram: '@roli_ink',             image: '/images/artists/roli.webp' },
  { name: 'Rita',  instagram: '@innerbloom.ink',       image: '/images/artists/rita.webp' },
];

/* ─── Navigation ─── */
function Navigation({ transparent = false }: { transparent?: boolean }) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, toggle: toggleLang } = useLang();
  const t = useTranslate();
  const bookingUrl = useBookingUrl();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = () => { setInfoOpen(false); setExtrasOpen(false); };
    if (infoOpen || extrasOpen) {
      setTimeout(() => document.addEventListener('click', handleClick), 0);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [infoOpen, extrasOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false); setInfoOpen(false); setExtrasOpen(false);
    if (href.startsWith('/')) { navigate(href); }
    else if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const overHero = transparent && !navScrolled;
  const textColor = overHero ? 'text-white' : 'text-charcoal';
  const bgClass = overHero
    ? 'bg-transparent'
    : navScrolled
      ? 'bg-paper/90 backdrop-blur-md border-b border-charcoal/5'
      : 'bg-paper/80 backdrop-blur-sm';

  const navLinkBase = 'text-[16px] heading-caps transition-colors duration-500 hover:opacity-60';

  const EXTRAS_LINKS = [
    { label: t('nav.removal'),   href: '/laserentfernung' },
    { label: t('nav.piercing'),  href: '/mayduna' },
    { label: t('nav.care'),      href: '/care' },
    { label: t('nav.vouchers'),  href: 'https://form.jotform.com/253372602051346', external: true },
  ];

  const INFO_LINKS = [
    { label: t('nav.faq'),  href: '/faq' },
    { label: t('nav.blog'), href: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center" aria-label={t('nav.home')}>
          <img
            src={logoSrc}
            alt="True Canvas"
            className={`h-16 w-16 object-contain transition-all duration-700 ${overHero ? 'invert' : ''}`}
            style={{ filter: overHero ? 'invert(1)' : 'none' }}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <button onClick={() => handleNavClick('/artists')} className={`${navLinkBase} ${textColor}`}>
            {t('nav.artists')}
          </button>
          <button onClick={() => handleNavClick('/studio')} className={`${navLinkBase} ${textColor}`}>
            {t('nav.studio')}
          </button>

          {/* Info */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setInfoOpen(!infoOpen); setExtrasOpen(false); }}
              className={`${navLinkBase} ${textColor} flex items-center gap-1`}
            >
              {t('nav.info')}
              <svg className={`w-3 h-3 transition-transform duration-300 ${infoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {infoOpen && (
              <div className="absolute top-full right-0 mt-4 w-52 bg-paper border border-charcoal/10 py-3 shadow-lg">
                {INFO_LINKS.map(item => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-5 py-2.5 text-[12px] heading-caps text-charcoal hover:bg-charcoal/5 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Extras */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setExtrasOpen(!extrasOpen); setInfoOpen(false); }}
              className={`${navLinkBase} ${textColor} flex items-center gap-1`}
            >
              {t('nav.extras')}
              <svg className={`w-3 h-3 transition-transform duration-300 ${extrasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {extrasOpen && (
              <div className="absolute top-full right-0 mt-4 w-56 bg-paper border border-charcoal/10 py-3 shadow-lg">
                {EXTRAS_LINKS.map(item => (
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-left px-5 py-2.5 text-[12px] heading-caps text-charcoal hover:bg-charcoal/5 transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-5 py-2.5 text-[12px] heading-caps text-charcoal hover:bg-charcoal/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleLang}
            className={`text-[15px] heading-caps transition-colors duration-500 ${overHero ? 'text-white/85 hover:text-white' : 'text-charcoal hover:opacity-60'}`}
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          {/* CTA box is fixed-width so nav never shifts on language toggle; label still translates */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[15px] heading-caps px-6 py-3 border transition-all duration-500 inline-flex items-center justify-center w-[230px] whitespace-nowrap ${
              overHero
                ? 'border-white/40 text-white hover:bg-white hover:text-charcoal'
                : 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-paper'
            }`}
          >
            {t('nav.cta')}
          </a>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden ${textColor}`} aria-label={t('nav.menu')}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-px bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-paper ${mobileMenuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col gap-5">
          {[
            { label: t('nav.artists'),  href: '/artists' },
            { label: t('nav.studio'),   href: '/studio' },
            { label: t('nav.faq'),      href: '/faq' },
            { label: t('nav.blog'),     href: '/blog' },
            { label: t('nav.removal'),  href: '/laserentfernung' },
            { label: t('nav.piercing'), href: '/mayduna' },
            { label: t('nav.care'),     href: '/care' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-[15px] heading-caps text-left text-charcoal"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://form.jotform.com/253372602051346"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] heading-caps text-left text-charcoal"
          >
            {t('nav.vouchers')} ↗
          </a>
          <div className="flex items-center gap-6 pt-4">
            <button
              onClick={toggleLang}
              className="text-[15px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors"
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] heading-caps px-6 py-3 border border-charcoal/20 text-charcoal self-start inline-flex items-center justify-center w-[230px] whitespace-nowrap"
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <div className="section-divider mx-8 md:mx-20 my-8 md:my-12" />;
}

/* ─── CTA Band (white, Omega Sans) ─── */
function CTABand() {
  const bookingUrl = useBookingUrl();
  const t = useTranslate();
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-white text-3xl md:text-5xl heading-caps-tight mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-white/70 text-[15px] leading-[1.9] max-w-xl mx-auto mb-10">
          {t('cta.subtitle')}
        </p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button inline-block px-12 py-4 border border-white/40 text-[12px] heading-caps text-white hover:bg-white hover:text-charcoal transition-all duration-500"
        >
          {t('nav.cta')}
        </a>
      </div>
    </section>
  );
}

/* ─── Homepage ─── */
function HomePage() {
  useLenis();
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const parallaxWrapRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();
  const bookingUrl = useBookingUrl();

  useEffect(() => {
    document.title = 'True Canvas — Mehr als nur Tinte unter deiner Haut';
    const ctx = gsap.context(() => {
      document.querySelectorAll('.fade-up').forEach(el => {
        gsap.to(el, {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      document.querySelectorAll('.stagger-group').forEach(group => {
        gsap.fromTo(group.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true } }
        );
      });
      if (parallaxImgRef.current && parallaxWrapRef.current) {
        gsap.fromTo(parallaxImgRef.current,
          { yPercent: -6 },
          { yPercent: 6, ease: 'none',
            scrollTrigger: { trigger: parallaxWrapRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-paper text-charcoal">
      <Navigation transparent />

      <Hero />

      {/* ─── V3 verbatim: "Wo Kunst ein Zuhause hat" — 2-col, heading+3 paragraphs LEFT, square image RIGHT ─── */}
      <section id="studio" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="fade-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl heading-caps-tight leading-[1.1] mb-10" style={{ whiteSpace: 'pre-line' }}>
                {t('home.studio.title')}
              </h2>
              <div className="space-y-6 text-[15px] text-charcoal/70 leading-[1.9] max-w-lg">
                <p>{t('home.studio.p1')}</p>
                <p>{t('home.studio.p2')}</p>
                <p>{t('home.studio.p3')}</p>
              </div>
            </div>
            <div className="fade-up overflow-hidden">
              <img src="/images/studio/JollySchwarz-4211.webp" alt="True Canvas Studio Wien" className="w-full aspect-[4/5] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── 3 Studios in einem Gebäude — client asked for 3 videos side-by-side ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="text-[11px] heading-caps text-charcoal/40 text-center mb-12">{t('home.studio.threebuildings')}</p>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { n: 1, poster: '/images/studio/JollySchwarz-3999.webp' },
              { n: 2, poster: '/images/studio/JollySchwarz-4134.webp' },
              { n: 3, poster: '/images/studio/JollySchwarz-4173.webp' },
            ].map(studio => (
              <div key={studio.n} className="aspect-[3/4] overflow-hidden bg-charcoal/5 relative">
                {/* TODO: swap poster for real studio video from shared Google Drive */}
                <video
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                  autoPlay muted loop playsInline
                  poster={studio.poster}
                >
                  {/* <source src={`/videos/studio-${studio.n}.webm`} type="video/webm" /> */}
                </video>
                <div className="absolute bottom-4 left-4 text-white text-[11px] heading-caps">
                  {t('home.studio.label')} {studio.n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── V3 verbatim: VALUES — "Bei uns stehst du im Mittelpunkt" + 3 columns ─── */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('home.values.title')}</h2>
          </div>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: t('home.values.v1.title'), text: t('home.values.v1.text') },
              { title: t('home.values.v2.title'), text: t('home.values.v2.text') },
              { title: t('home.values.v3.title'), text: t('home.values.v3.text') },
            ].map((v, i) => (
              <div key={i} className="border-t border-charcoal/10 pt-8">
                <h3 className="text-sm heading-caps mb-4">{v.title}</h3>
                <p className="text-[15px] text-charcoal/60 leading-[1.9]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── V3 verbatim: ARTISTS — "Unsere Artists" + "Alle Artists" link + 4-col grid (4 residents per client) ─── */}
      <section id="artists" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('home.artists.title')}</h2>
            <Link to="/artists" className="text-[11px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors border-b border-charcoal/20 pb-1 self-start">
              {t('home.artists.all')}
            </Link>
          </div>
          <div className="stagger-group grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {RESIDENTS.map((artist, i) => (
              <a
                key={i}
                href={`https://www.instagram.com/${artist.instagram.replace('@', '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="artist-card group"
              >
                <div className="overflow-hidden mb-5">
                  <img src={artist.image} alt={artist.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                </div>
                <h3 className="text-base heading-caps-tight mb-1">{artist.name}</h3>
                <p className="text-[11px] text-charcoal/40">{artist.instagram}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── V3 verbatim: PROCESS — "Dein Weg zum Tattoo" + intro + 3 steps, plus booking button per client ─── */}
      <section id="process" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('home.process.title')}</h2>
            <p className="text-[15px] text-charcoal/60 leading-[1.9] mt-6 max-w-2xl">
              {t('home.process.intro')}
            </p>
          </div>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
            {[
              { title: t('home.process.s1.title'), text: t('home.process.s1.text') },
              { title: t('home.process.s2.title'), text: t('home.process.s2.text') },
              { title: t('home.process.s3.title'), text: t('home.process.s3.text') },
            ].map((step, i) => (
              <div key={i} className="border-t border-charcoal/10 pt-8">
                <span className="text-[11px] heading-caps text-charcoal/40 block mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-sm heading-caps mb-4">{step.title}</h3>
                <p className="text-[15px] text-charcoal/60 leading-[1.9]">{step.text}</p>
              </div>
            ))}
          </div>
          {/* Client addition: booking button below process */}
          <div className="fade-up flex justify-center">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-block px-12 py-4 border border-charcoal/20 text-[12px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500"
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* ─── V3 parallax full-width image — narrower per client ("niedriger in der Breite") ─── */}
      <div ref={parallaxWrapRef} className="parallax-container w-full h-[28vh] md:h-[34vh] my-8 md:my-12">
        <img
          ref={parallaxImgRef}
          src="/images/studio/JollySchwarz-4173.webp"
          alt="True Canvas Studio"
          className="parallax-image w-full h-[115%] object-cover"
          loading="lazy"
        />
      </div>

      {/* ─── V2 Testimonials ("Feedback") — client: "Feedback ... gefällt uns" ─── */}
      <Testimonials />

      {/* ─── V2 FAQ — client: "FAQs gefällt uns" ─── */}
      <FAQ />

      <Footer />
    </main>
  );
}

function PageWrapper({ children, withCTA = true }: { children: React.ReactNode; withCTA?: boolean }) {
  useLenis();
  return (
    <main className="relative w-full overflow-x-hidden bg-paper text-charcoal">
      <Navigation />
      <div className="pt-24">{children}</div>
      {withCTA && <CTABand />}
      <Footer />
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artists" element={<PageWrapper withCTA={false}><ArtistsPage /></PageWrapper>} />
            <Route path="/guestartists" element={<PageWrapper><GuestArtists /></PageWrapper>} />
            <Route path="/studio" element={<PageWrapper><StudioPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
            <Route path="/laserentfernung" element={<PageWrapper><LaserentfernungPage /></PageWrapper>} />
            <Route path="/mayduna" element={<PageWrapper><MaydunaPage /></PageWrapper>} />
            <Route path="/care" element={<PageWrapper><CareInstructionsPage /></PageWrapper>} />
            <Route path="/piercing" element={<PageWrapper><PiercingPage /></PageWrapper>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
