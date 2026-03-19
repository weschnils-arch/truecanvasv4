import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { Footer } from './sections/Footer';
import { LanguageProvider, useLang, useTranslate } from './context/LanguageContext';
import logoSrc from './assets/images/logo_truecanvas.webp';

// Lazy-loaded pages
const ArtistsPage = lazy(() => import('./pages/ArtistsPage'));
const GuestArtists = lazy(() => import('./pages/GuestArtists'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TattooRemovalPage = lazy(() => import('./pages/TattooRemovalPage'));
const CareInstructionsPage = lazy(() => import('./pages/CareInstructionsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PiercingPage = lazy(() => import('./pages/PiercingPage'));

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ARTISTS = [
  { name: 'Max', role: 'Gründer & Artist', instagram: '@thommesen_ink', image: '/images/artists/max.webp', styles: 'Realismus · Surrealismus' },
  { name: 'Vroni', role: 'Resident Artist', instagram: '@tattooist_veronika', image: '/images/artists/vroni.webp', styles: 'Fineline · Floral' },
  { name: 'Roli', role: 'Resident Artist', instagram: '@roli_ink', image: '/images/artists/roli.webp', styles: 'Realismus · Cover-up' },
  { name: 'Rita', role: 'Resident Artist', instagram: '@innerbloom.ink', image: '/images/artists/rita.webp', styles: 'Floral · Watercolor' },
  { name: 'Nana', role: 'Resident Artist', instagram: '@n.ana.ink', image: '/images/artists/nana.webp', styles: 'Realismus B&G · Dotwork' },
  { name: 'Hera', role: 'Resident Artist', instagram: '@tati.tatts.od', image: '/images/artists/hera.webp', styles: 'Anime · Illustrativ' },
  { name: 'Alina', role: 'Resident Artist', instagram: '@a.l.i.e.n.tattoo', image: '/images/artists/alina.webp', styles: 'Realismus · Dark Art' },
];


/* ─────────────────────────────────────────────
   NAVIGATION (shared between Hero & Header)
───────────────────────────────────────────── */
function Navigation({ isHero: _isHero = false }: { isHero?: boolean }) {
  void _isHero;
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, toggle: toggleLang } = useLang();
  const t = useTranslate();

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

  const textColor = 'text-charcoal';
  const bgClass = navScrolled
    ? 'bg-paper/90 backdrop-blur-md border-b border-charcoal/5'
    : 'bg-paper/80 backdrop-blur-sm';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoSrc} alt="TrueCanvas" className="h-8 w-8 object-contain"
            style={{ filter: 'none' }} />
          <span className={`text-xs heading-caps hidden md:block transition-colors duration-500 ${textColor}`}>True Canvas</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Artists', href: '/artists' },
            { label: 'Guest Artists', href: '/guest-artists' },
            { label: 'Studio', href: '/studio' },
          ].map(l => (
            <button key={l.label} onClick={() => handleNavClick(l.href)}
              className={`text-[11px] heading-caps transition-colors duration-500 hover:opacity-60 ${textColor}`}>
              {l.label}
            </button>
          ))}

          {/* Info Dropdown */}
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setInfoOpen(!infoOpen); setExtrasOpen(false); }}
              className={`text-[11px] heading-caps transition-colors duration-500 hover:opacity-60 flex items-center gap-1 ${textColor}`}>
              Info
              <svg className={`w-3 h-3 transition-transform duration-300 ${infoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {infoOpen && (
              <div className="absolute top-full right-0 mt-4 w-48 bg-paper border border-charcoal/10 py-3">
                {[{ label: 'FAQ', href: '/faq' }, { label: 'Blog', href: '/blog' }].map(item => (
                  <button key={item.label} onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-5 py-2 text-[11px] heading-caps text-charcoal hover:bg-charcoal/5 transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Extras Dropdown */}
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setExtrasOpen(!extrasOpen); setInfoOpen(false); }}
              className={`text-[11px] heading-caps transition-colors duration-500 hover:opacity-60 flex items-center gap-1 ${textColor}`}>
              Extras
              <svg className={`w-3 h-3 transition-transform duration-300 ${extrasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {extrasOpen && (
              <div className="absolute top-full right-0 mt-4 w-48 bg-paper border border-charcoal/10 py-3">
                {[
                  { label: 'Tattoo Entfernung', href: '/tattoo-removal' },
                  { label: 'Pflegeempfehlung', href: '/care' },
                  { label: 'Piercing', href: '/piercing' },
                ].map(item => (
                  <button key={item.label} onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-5 py-2 text-[11px] heading-caps text-charcoal hover:bg-charcoal/5 transition-colors">
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <button onClick={toggleLang}
            className="text-[11px] heading-caps text-charcoal/40 hover:text-charcoal transition-colors">
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          <a href="https://form.jotform.com/210883790627060" target="_blank" rel="noopener noreferrer"
            className="text-[11px] heading-caps px-6 py-3 border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500">
            {t('nav.cta')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden ${textColor}`} aria-label="Menu">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-px bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-paper ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col gap-6">
          {[
            { label: 'Artists', href: '/artists' },
            { label: 'Guest Artists', href: '/guest-artists' },
            { label: 'Studio', href: '/studio' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Blog', href: '/blog' },
            { label: 'Tattoo Entfernung', href: '/tattoo-removal' },
            { label: 'Pflegeempfehlung', href: '/care' },
            { label: 'Piercing', href: '/piercing' },
          ].map(item => (
            <button key={item.label} onClick={() => handleNavClick(item.href)}
              className="text-[11px] heading-caps text-left text-charcoal">
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-6">
            <button onClick={toggleLang}
              className="text-[11px] heading-caps text-charcoal/40 hover:text-charcoal transition-colors">
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a href="https://form.jotform.com/210883790627060" target="_blank" rel="noopener noreferrer"
              className="text-[11px] heading-caps px-6 py-3 border border-charcoal/20 text-charcoal self-start">
              {t('nav.cta')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────── */
function Divider() {
  return <div className="section-divider mx-8 md:mx-20 my-8 md:my-12" />;
}

/* ─────────────────────────────────────────────
   HOMEPAGE
───────────────────────────────────────────── */
function HomePage() {
  useLenis();
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const parallaxWrapRef = useRef<HTMLDivElement>(null);
  const t = useTranslate();

  useEffect(() => {
    document.title = 'True Canvas — Mehr als nur Tinte unter deiner Haut';

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.hero-heading', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.hero-image', { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.hero-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo('.hero-quote', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 });

      // Fade ups
      document.querySelectorAll('.fade-up').forEach(el => {
        gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      // Stagger
      document.querySelectorAll('.stagger-group').forEach(group => {
        gsap.fromTo(group.children, { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
      });

      // Parallax
      if (parallaxImgRef.current && parallaxWrapRef.current) {
        gsap.fromTo(parallaxImgRef.current, { yPercent: -10 },
          { yPercent: 10, ease: 'none',
            scrollTrigger: { trigger: parallaxWrapRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-paper text-charcoal">
      <Navigation isHero />

      {/* ─── HERO ─── */}
      <section className="min-h-screen pt-20 flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="flex flex-col justify-between h-full min-h-[400px] md:min-h-[600px]">
              <div className="hero-heading">
                <h1 className="text-5xl md:text-6xl lg:text-7xl heading-caps leading-[0.95]">
                  {t('hero.title1')}<br />{t('hero.title2')}<br />{t('hero.title3')}
                </h1>
              </div>
              <div className="hero-quote mt-auto pt-16">
                <p className="serif-italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xs">
                  {t('hero.quote1')}
                </p>
                <p className="serif-italic text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xs mt-4">
                  {t('hero.quote2')}
                </p>
              </div>
            </div>
            <div className="hero-image overflow-hidden">
              <img src="/images/hero_truecanvas.webp" alt="True Canvas Studio"
                className="w-full h-[500px] md:h-[700px] object-cover object-center" />
            </div>
            <div className="hero-text flex flex-col justify-between h-full min-h-[400px] md:min-h-[600px]">
              <div className="space-y-6 text-[15px] text-charcoal/70 leading-[1.9]">
                <p>{t('hero.p1')}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{t('hero.p2')}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{t('hero.p3')}</p>
                <p style={{ whiteSpace: 'pre-line' }}>{t('hero.p4')}</p>
                <p className="font-medium text-charcoal">{t('hero.p5')}</p>
              </div>
              <div className="mt-auto pt-16 flex justify-center">
                <img src={logoSrc} alt="True Canvas" className="w-12 h-12 object-contain" style={{ filter: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── STUDIO STORY ─── */}
      <section id="studio" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="fade-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl heading-caps-tight leading-[1.1] mb-10" style={{ whiteSpace: 'pre-line' }}>
                {t('studio.title')}
              </h2>
              <div className="space-y-6 text-[15px] text-charcoal/70 leading-[1.9] max-w-lg">
                <p>{t('studio.p1')}</p>
                <p>{t('studio.p2')}</p>
                <p>{t('studio.p3')}</p>
              </div>
            </div>
            <div className="fade-up overflow-hidden">
              <img src="/images/studio/JollySchwarz-4211.webp" alt="True Canvas Studio Wien" className="w-full aspect-[4/5] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── VALUES ─── */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('values.title')}</h2>
          </div>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: t('values.v1.title'), text: t('values.v1.text') },
              { title: t('values.v2.title'), text: t('values.v2.text') },
              { title: t('values.v3.title'), text: t('values.v3.text') },
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

      {/* ─── ARTISTS ─── */}
      <section id="artists" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('artists.title')}</h2>
            <Link to="/artists" className="text-[11px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors border-b border-charcoal/20 pb-1 self-start">
              {t('artists.all')}
            </Link>
          </div>
          <div className="stagger-group grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {ARTISTS.map((artist, i) => (
              <a key={i} href={`https://www.instagram.com/${artist.instagram.replace('@', '')}/`}
                target="_blank" rel="noopener noreferrer" className="artist-card group">
                <div className="overflow-hidden mb-5">
                  <img src={artist.image} alt={artist.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                </div>
                <h3 className="text-base heading-caps-tight mb-1">{artist.name}</h3>
                <p className="text-[11px] text-charcoal/50 mb-1">{artist.styles}</p>
                <p className="text-[11px] text-charcoal/40">{artist.instagram}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="fade-up mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl heading-caps-tight">{t('process.title')}</h2>
            <p className="text-[15px] text-charcoal/60 leading-[1.9] mt-6 max-w-2xl">
              {t('process.intro')}
            </p>
          </div>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: t('process.s1.title'), text: t('process.s1.text') },
              { title: t('process.s2.title'), text: t('process.s2.text') },
              { title: t('process.s3.title'), text: t('process.s3.text') },
            ].map((step, i) => (
              <div key={i} className="border-t border-charcoal/10 pt-8">
                <span className="text-[11px] heading-caps text-charcoal/40 block mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-sm heading-caps mb-4">{step.title}</h3>
                <p className="text-[15px] text-charcoal/60 leading-[1.9]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH STUDIO ─── */}
      <div ref={parallaxWrapRef} className="parallax-container w-full h-[50vh] md:h-[70vh] my-8 md:my-16">
        <img ref={parallaxImgRef} src="/images/studio/JollySchwarz-4173.webp" alt="True Canvas Studio"
          className="parallax-image w-full h-[130%] object-cover" />
      </div>

      <Divider />

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="fade-up map-container aspect-square lg:aspect-auto lg:min-h-[500px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d16.366!3d48.193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWeyringergasse+19%2C+1040+Wien!5e0!3m2!1sde!2sat!4v1"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="TrueCanvas Studio Wien" />
            </div>
            <div className="fade-up flex flex-col justify-center">
              <div className="w-12 h-px bg-charcoal/20 mb-10" />
              <h2 className="text-3xl md:text-4xl heading-caps-tight mb-8 leading-[1.15]" style={{ whiteSpace: 'pre-line' }}>{t('contact.title')}</h2>
              <p className="text-[15px] text-charcoal/60 leading-[1.9] mb-10 max-w-md">
                {t('contact.text')}
              </p>
              <div className="space-y-3 mb-10 text-[14px] text-charcoal/50">
                <p>Weyringergasse 19/1-3<br />1040 Wien</p>
                <p>info@truecanvas.at</p>
                <p>+43 650 60 70 320</p>
              </div>
              <a href="https://form.jotform.com/210883790627060" target="_blank" rel="noopener noreferrer"
                className="cta-button inline-block self-start px-12 py-4 border border-charcoal/15 text-[11px] heading-caps text-charcoal hover:bg-charcoal hover:text-paper transition-all duration-500">
                {t('nav.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────
   PAGE WRAPPER (for subpages)
───────────────────────────────────────────── */
function PageWrapper({ children }: { children: React.ReactNode }) {
  useLenis();
  return (
    <main className="relative w-full overflow-x-hidden bg-paper text-charcoal">
      <Navigation />
      <div className="pt-32">{children}</div>
      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artists" element={<PageWrapper><ArtistsPage /></PageWrapper>} />
          <Route path="/guest-artists" element={<PageWrapper><GuestArtists /></PageWrapper>} />
          <Route path="/studio" element={<PageWrapper><StudioPage /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
          <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
          <Route path="/tattoo-removal" element={<PageWrapper><TattooRemovalPage /></PageWrapper>} />
          <Route path="/care" element={<PageWrapper><CareInstructionsPage /></PageWrapper>} />
          <Route path="/piercing" element={<PageWrapper><PiercingPage /></PageWrapper>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </LanguageProvider>
  );
}
