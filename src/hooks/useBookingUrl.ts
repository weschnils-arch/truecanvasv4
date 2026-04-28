import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';

const DESKTOP_URL = 'https://form.jotform.com/250012566607047';
const MOBILE_DE_URL = 'https://form.jotform.com/210883790627060';
const MOBILE_EN_URL = 'https://form.jotform.com/210892400664352';

export function useBookingUrl(): string {
  const { lang } = useLang();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) return DESKTOP_URL;
  return lang === 'en' ? MOBILE_EN_URL : MOBILE_DE_URL;
}
