import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoSrc from '../assets/images/logo_truecanvas.webp';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = () => {
      setInfoOpen(false);
      setExtrasOpen(false);
    };
    if (infoOpen || extrasOpen) {
      setTimeout(() => document.addEventListener('click', handleClick), 0);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [infoOpen, extrasOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tagline slow reveal
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, delay: 2, ease: 'power2.out' }
      );

      // Brand name reveal
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.8, delay: 2.8, ease: 'power2.out' }
      );

      // Parallax on scroll
      if (imageRef.current) {
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

      // Fade out content on scroll
      if (textRef.current) {
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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setInfoOpen(false);
    setExtrasOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinkClass = (scrolled: boolean) =>
    `text-[11px] tracking-journal uppercase transition-colors duration-500 hover:opacity-60 ${
      scrolled ? 'text-charcoal' : 'text-white'
    }`;

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/images/studio/JollySchwarz-4211.webp"
          alt="TrueCanvas Studio — Lounge mit Gewolbedecken"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navScrolled
            ? 'bg-paper/90 backdrop-blur-md border-b border-charcoal/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoSrc} alt="TrueCanvas" className={`h-8 w-8 object-contain transition-all duration-700 ${navScrolled ? '' : 'invert'}`} />
            <span
              className={`text-xs tracking-archive uppercase transition-colors duration-700 ${
                navScrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              True Canvas
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => handleNavClick('/artists')} className={navLinkClass(navScrolled)}>
              Artists
            </button>
            <button onClick={() => handleNavClick('/guest-artists')} className={navLinkClass(navScrolled)}>
              Guest Artists
            </button>
            <button onClick={() => handleNavClick('/studio')} className={navLinkClass(navScrolled)}>
              Studio
            </button>

            {/* Info Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setInfoOpen(!infoOpen); setExtrasOpen(false); }}
                className={`${navLinkClass(navScrolled)} flex items-center gap-1`}
              >
                Info
                <svg className={`w-3 h-3 transition-transform duration-300 ${infoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {infoOpen && (
                <div className="absolute top-full right-0 mt-4 w-48 bg-paper border border-charcoal/10 py-3">
                  {[
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Blog', href: '/blog' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-5 py-2 text-[11px] tracking-journal uppercase text-charcoal hover:bg-charcoal/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Extras Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setExtrasOpen(!extrasOpen); setInfoOpen(false); }}
                className={`${navLinkClass(navScrolled)} flex items-center gap-1`}
              >
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
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-5 py-2 text-[11px] tracking-journal uppercase text-charcoal hover:bg-charcoal/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://form.jotform.com/210883790627060"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] tracking-journal uppercase px-6 py-3 border transition-all duration-500 ${
                navScrolled
                  ? 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-paper'
                  : 'border-white/30 text-white hover:border-white hover:bg-white hover:text-charcoal'
              }`}
            >
              Termin anfragen
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden transition-colors duration-500 ${navScrolled ? 'text-charcoal' : 'text-white'}`}
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`block h-px bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          } ${navScrolled ? 'bg-paper' : 'bg-charcoal/90 backdrop-blur-md'}`}
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {[
              { label: 'Artists', href: '/artists' },
              { label: 'Guest Artists', href: '/guest-artists' },
              { label: 'Studio', href: '/studio' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Blog', href: '/blog' },
              { label: 'Tattoo Entfernung', href: '/tattoo-removal' },
              { label: 'Pflegeempfehlung', href: '/care' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-[11px] tracking-journal uppercase text-left transition-colors ${navScrolled ? 'text-charcoal' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://form.jotform.com/210883790627060"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] tracking-journal uppercase px-6 py-3 border self-start transition-colors ${navScrolled ? 'border-charcoal/20 text-charcoal' : 'border-white/30 text-white'}`}
            >
              Termin anfragen
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <img src={logoSrc} alt="True Canvas" className="w-14 h-14 md:w-20 md:h-20 object-contain invert mb-8 opacity-0" ref={taglineRef} />
        <p className="text-white text-[11px] md:text-xs tracking-archive uppercase mb-6">
          Measured in seasons, not noise
        </p>
        <h1 ref={brandRef} className="text-white text-4xl md:text-6xl lg:text-7xl tracking-archive uppercase opacity-0">
          True Canvas
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-white/30 mx-auto animate-pulse" />
      </div>
    </section>
  );
}
