import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';
import { useTranslate } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Post IDs map to translation keys blog.postN.{title,subtitle,date,excerpt}
const POSTS = [
  { id: 1, catKey: 'blog.cat.prep',      image: '/images/studio/JollySchwarz-4038.webp' },
  { id: 2, catKey: 'blog.cat.skin',      image: '/images/studio/JollySchwarz-4075.webp' },
  { id: 3, catKey: 'blog.cat.fineline',  image: '/images/studio/JollySchwarz-4112.webp' },
  { id: 4, catKey: 'blog.cat.skin',      image: '/images/studio/JollySchwarz-4146.webp' },
  { id: 5, catKey: 'blog.cat.skin',      image: '/images/studio/JollySchwarz-4253.webp' },
  { id: 6, catKey: 'blog.cat.copyright', image: '/images/studio/JollySchwarz-4173.webp' },
  { id: 7, catKey: 'blog.cat.tattoo',    image: '/images/studio/JollySchwarz-4017.webp' },
  { id: 8, catKey: 'blog.cat.aftercare', image: '/images/studio/JollySchwarz-3975.webp' },
];

const ALL_CAT_KEY = 'blog.cat.all';

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [activeCatKey, setActiveCatKey] = useState(ALL_CAT_KEY);
  const t = useTranslate();

  const visiblePosts = POSTS
    .map(p => ({
      ...p,
      title:    t(`blog.post${p.id}.title`),
      subtitle: t(`blog.post${p.id}.subtitle`),
      date:     t(`blog.post${p.id}.date`),
      excerpt:  t(`blog.post${p.id}.excerpt`),
      category: t(p.catKey),
    }))
    .filter(post => {
      const q = search.toLowerCase();
      const matchesSearch = q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      const matchesCategory = activeCatKey === ALL_CAT_KEY || post.catKey === activeCatKey;
      return matchesSearch && matchesCategory;
    });

  // Unique category keys present in POSTS
  const categoryKeys = [ALL_CAT_KEY, ...Array.from(new Set(POSTS.map(p => p.catKey)))];

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.blog-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.blog-intro', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-article',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeCatKey, search]);

  const featured = visiblePosts[0];
  const rest = visiblePosts.slice(1);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <p className="blog-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">{t('blog.search.heading')}</p>
            <h1 className="blog-title text-5xl md:text-7xl heading-caps leading-[0.95]">
              {t('blog.title.l1')}-{t('blog.title.l2')}
            </h1>
          </div>
          <div className="flex items-end">
            <p className="blog-intro text-lg text-charcoal/70 max-w-md leading-[1.75]">
              {t('blog.intro')}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              placeholder={t('blog.search.input')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-charcoal/10 focus:border-charcoal/40 outline-none pl-7 pb-2 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryKeys.map(catKey => (
              <button
                key={catKey}
                onClick={() => setActiveCatKey(catKey)}
                className={`text-[11px] heading-caps px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCatKey === catKey
                    ? 'bg-charcoal text-paper border-charcoal'
                    : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
                }`}
              >
                {t(catKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {featured && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
          <article className="blog-article group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-[10px] heading-caps text-charcoal/40 mb-4">{featured.category} — {featured.date}</p>
              <h2 className="text-2xl md:text-4xl heading-caps-tight leading-[1.1] mb-3 group-hover:text-charcoal/70 transition-colors">
                {featured.title}
              </h2>
              <p className="text-base text-charcoal/60 mb-5">{featured.subtitle}</p>
              <p className="text-sm text-charcoal/70 leading-[1.85] max-w-md">{featured.excerpt}</p>
            </div>
          </article>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {rest.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {rest.map((post, i) => (
              <article
                key={post.id}
                className={`blog-article group cursor-pointer ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                <div className="overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                      i === 0 ? 'aspect-[21/9]' : 'aspect-[3/2]'
                    }`}
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] heading-caps text-charcoal/40 mb-3">{post.category} — {post.date}</p>
                <h3 className="text-lg md:text-xl heading-caps-tight leading-snug mb-2 group-hover:text-charcoal/70 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal/55 mb-3">{post.subtitle}</p>
                <p className="text-sm text-charcoal/65 leading-[1.85]">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {visiblePosts.length === 0 && (
        <div className="text-center py-24 max-w-[1400px] mx-auto px-6">
          <p className="text-charcoal/50 text-lg">{t('blog.empty')}</p>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-16 md:my-24" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-6">{t('blog.external.heading')}</p>
        <div className="flex flex-wrap gap-8">
          {[
            { name: 'Feelfarbig',         url: 'https://feelfarbig.de' },
            { name: 'Zum Buntspecht',     url: 'https://zumbuntspecht.de' },
            { name: 'Madlyne van Looy',   url: 'https://madlynevanlooy.com' },
          ].map(blog => (
            <a
              key={blog.name}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-charcoal/55 hover:text-charcoal transition-colors border-b border-charcoal/10 pb-0.5"
            >
              {blog.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
