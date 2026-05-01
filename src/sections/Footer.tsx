import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoSrc from '../assets/images/logo_truecanvas.webp';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = '+43 650 6070 320';
const PHONE_TEL = '+436506070320';
const EMAIL = 'info@truecanvas.at';
const ADDRESS_LINE1 = 'Weyringergasse 19/1-3';
const ADDRESS_LINE2_DE = '1040 Wien';
const ADDRESS_LINE2_EN = '1040 Vienna';
const WHATSAPP_URL = 'https://whatsapp.com/channel/0029Vb7vegp0gcfA1Yi7a71f';
const INSTAGRAM_URL = 'https://instagram.com/truecanvas';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const t = useTranslate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 88%', once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-paper border-t border-charcoal/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12">
        <div className="footer-col flex items-center gap-4 mb-16 md:mb-20">
          <img src={logoSrc} alt="True Canvas Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" />
          <span className="text-lg md:text-xl heading-caps text-charcoal">True Canvas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          {/* Kontakt / Contact */}
          <div className="footer-col md:col-span-3">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-5 pb-3 border-b border-charcoal/10">
              {t('footer.contact')}
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="block text-[14px] text-charcoal hover:text-charcoal/60 transition-colors mb-2"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="block text-[14px] text-charcoal/70 hover:text-charcoal transition-colors mb-4"
            >
              {EMAIL}
            </a>
            <p className="text-[14px] text-charcoal/70 leading-[1.75]">
              {ADDRESS_LINE1}<br />{t('footer.copyright').includes('Vienna') ? ADDRESS_LINE2_EN : ADDRESS_LINE2_DE}
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-col md:col-span-2">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-5 pb-3 border-b border-charcoal/10">
              {t('footer.navigation')}
            </p>
            <ul className="flex flex-col gap-3">
              <li><a href="/artists" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.artists')}</a></li>
              <li><a href="/studio" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.studio')}</a></li>
              <li><a href="/blog" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.blog')}</a></li>
              <li><a href="/faq" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.faq')}</a></li>
            </ul>
          </div>

          {/* Extras */}
          <div className="footer-col md:col-span-2">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-5 pb-3 border-b border-charcoal/10">
              {t('footer.extras')}
            </p>
            <ul className="flex flex-col gap-3">
              <li><a href="/laserentfernung" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.removal')}</a></li>
              <li><a href="/mayduna" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.piercing')}</a></li>
              <li><a href="/care" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">{t('nav.care')}</a></li>
              <li>
                <a
                  href="https://form.jotform.com/253372602051346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  {t('nav.vouchers')} ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Folge uns / Follow us */}
          <div className="footer-col md:col-span-2">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-5 pb-3 border-b border-charcoal/10">
              {t('footer.social')}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-charcoal/70 hover:text-charcoal transition-colors">
                  {t('footer.whatsapp')} ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="footer-col md:col-span-3">
            <p className="text-[11px] heading-caps text-charcoal/50 mb-5 pb-3 border-b border-charcoal/10">
              {t('footer.findus')}
            </p>
            <div className="map-container aspect-[4/3] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d16.366!3d48.193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWeyringergasse+19%2C+1040+Wien!5e0!3m2!1sde!2sat!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="True Canvas Studio — Weyringergasse 19, 1040 Wien"
              />
            </div>
          </div>
        </div>

        <div className="footer-col border-t border-charcoal/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] heading-caps text-charcoal/50">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a href="/impressum" className="text-[11px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors">{t('footer.impressum')}</a>
            <a href="/datenschutz" className="text-[11px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors">{t('footer.datenschutz')}</a>
            <a href="/agb" className="text-[11px] heading-caps text-charcoal/50 hover:text-charcoal transition-colors">{t('footer.agb')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
