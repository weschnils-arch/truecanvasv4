import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: 'Gut befeuchtet, gut tätowiert',
    subtitle: 'So bereitest du deine Haut optimal vor',
    category: 'Vorbereitung',
    date: 'März 2026',
    excerpt: 'Warum du deine Haut vor dem Tätowieren gut mit Feuchtigkeit versorgen solltest — und warum du es am Tag des Termins besser lässt.',
    image: '/images/studio/JollySchwarz-4038.webp',
  },
  {
    id: 2,
    title: 'Narben werden zu Kunst',
    subtitle: 'Tattoos als Heilung',
    category: 'Haut',
    date: 'Februar 2026',
    excerpt: 'Tattoos über Narben und Dehnungsstreifen: Möglichkeiten, Risiken und wichtige Überlegungen.',
    image: '/images/studio/JollySchwarz-4075.webp',
  },
  {
    id: 3,
    title: 'Fine Line Tattoos',
    subtitle: 'Feine Linien — Große Kunst',
    category: 'Fineline Tattoo',
    date: 'Februar 2026',
    excerpt: 'Fine Line Tattoos haben eine ganz eigene Faszination. Richtige Pflege und die Notwendigkeit des Nachstechens.',
    image: '/images/studio/JollySchwarz-4112.webp',
  },
  {
    id: 4,
    title: 'Tattoo-Alterung erklärt',
    subtitle: 'Was passiert wirklich unter deiner Haut?',
    category: 'Haut',
    date: 'Januar 2026',
    excerpt: 'Warum bleibt ein Tattoo eigentlich in der Haut? Eine spannende Reise durch unser Immunsystem und die Hautalterung.',
    image: '/images/studio/JollySchwarz-4146.webp',
  },
  {
    id: 5,
    title: 'Hand- und Fußtattoos',
    subtitle: 'Warum sie oft nicht halten, was sie versprechen',
    category: 'Haut',
    date: 'Dezember 2025',
    excerpt: 'Warum Tattoos auf Händen und Füßen häufig verblassen, verschwimmen oder unvollständig heilen.',
    image: '/images/studio/JollySchwarz-4253.webp',
  },
  {
    id: 6,
    title: 'Tattoo und Urheberrecht',
    subtitle: 'Ist mein Tattoo einzigartig?',
    category: 'Urheberrecht',
    date: 'November 2025',
    excerpt: 'Der Anspruch eines Tätowierten ist es, etwas Einzigartiges unter die Haut zu bekommen. Doch wie sieht die Rechtslage aus?',
    image: '/images/studio/JollySchwarz-4173.webp',
  },
  {
    id: 7,
    title: 'Tattoo Gurken',
    subtitle: 'Wenn Tattoos daneben gehen',
    category: 'Tattoo',
    date: 'Oktober 2025',
    excerpt: 'Sogenannte Tattoo Gurken — ein Begriff für besonders misslungene Tätowierungen. Wie es dazu kommt und wie man sie vermeidet.',
    image: '/images/studio/JollySchwarz-4017.webp',
  },
  {
    id: 8,
    title: 'Wenn sich ein Tattoo entzündet',
    subtitle: 'Ursachen, Erkennung und Behandlung',
    category: 'Aftercare',
    date: 'September 2025',
    excerpt: 'Keime, Bakterien, Viren und Pilze können eine Infektion verursachen. So erkennst du die Anzeichen und reagierst richtig.',
    image: '/images/studio/JollySchwarz-3975.webp',
  },
];

const categories = ['Alle', ...new Set(posts.map(p => p.category))];

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered = posts.filter(post => {
    const matchesSearch = search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Alle' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
  }, [activeCategory, search]);

  // Featured post is the first one
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div ref={containerRef} className="bg-paper min-h-screen pb-32">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <p className="blog-eyebrow text-[11px] heading-caps text-charcoal/50 mb-6">Wissen & Inspiration</p>
            <h1 className="blog-title text-5xl md:text-7xl heading-caps leading-[0.95]">
              Tattoo-Blog
            </h1>
          </div>
          <div className="flex items-end">
            <p className="blog-intro serif-italic text-lg text-charcoal/55 max-w-md leading-relaxed">
              Hintergründe, Pflege-Tipps und alles rund ums Tätowieren — von unserem Team für dich geschrieben.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Search + Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              placeholder="Suche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-charcoal/10 focus:border-charcoal/40 outline-none pl-7 pb-2 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] heading-caps px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-paper border-charcoal'
                    : 'text-charcoal/50 border-charcoal/12 hover:border-charcoal/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
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
              <p className="serif-italic text-base text-charcoal/50 mb-5">{featured.subtitle}</p>
              <p className="text-sm text-charcoal/60 leading-relaxed max-w-md">{featured.excerpt}</p>
            </div>
          </article>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-12 md:my-16" />

      {/* Rest — magazine grid with varying sizes */}
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
                <p className="serif-italic text-sm text-charcoal/45 mb-3">{post.subtitle}</p>
                <p className="text-sm text-charcoal/55 leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-24 max-w-[1400px] mx-auto px-6">
          <p className="serif-italic text-charcoal/50 text-lg">Keine Beiträge gefunden.</p>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent my-16 md:my-24" />

      {/* External Blogs */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[11px] heading-caps text-charcoal/40 mb-6">Empfohlene externe Blogs</p>
        <div className="flex flex-wrap gap-8">
          {[
            { name: 'Feelfarbig', url: 'https://feelfarbig.de' },
            { name: 'Zum Buntspecht', url: 'https://zumbuntspecht.de' },
            { name: 'Madlyne van Looy', url: 'https://madlynevanlooy.com' },
          ].map(blog => (
            <a key={blog.name} href={blog.url} target="_blank" rel="noopener noreferrer"
              className="text-sm text-charcoal/55 hover:text-charcoal transition-colors border-b border-charcoal/10 pb-0.5">
              {blog.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
