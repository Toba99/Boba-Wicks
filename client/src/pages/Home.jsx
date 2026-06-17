import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { products as fallbackProducts } from '../data/products';
import { CandleVisual } from '../utils/candleVisuals';

/** Homepage with CMS-driven hero, featured products, and brand highlights */
export default function Home() {
  const [content, setContent] = useState(null);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/homepage')
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content);
        setFeatured(
          data.featuredProducts?.length
            ? data.featuredProducts
            : fallbackProducts.filter((p) => p.type !== 'custom').slice(0, 4)
        );
      })
      .catch(() => {
        setFeatured(fallbackProducts.filter((p) => p.type !== 'custom').slice(0, 4));
      });
  }, []);

  const pillars = content?.pillars ?? [
    { title: 'Premium wax blend', description: 'Clean-burning coconut-soy for 45–70 hours of fragrance.' },
    { title: 'Gift-worthy packaging', description: 'Blush tissue, wax seal, and care card in every box.' },
    { title: 'Small-batch poured', description: 'Hand-poured in our studio — never mass-produced.' },
  ];

  const customCta = content?.customCta ?? {
    eyebrow: 'Bespoke',
    title: 'Create your signature scent',
    subtitle:
      "Mix base notes, top accents, jar styles, and a personalised label — we'll hand-pour a candle that's uniquely yours.",
    buttonText: 'Start Customising',
  };

  return (
    <>
      <Hero content={content} />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Signature Scents"
            subtitle="Our most-loved boba-inspired candles, hand-poured in small batches."
            className="mx-auto mb-12 sm:mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/scents" className="btn-secondary">
              View All Scents
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center">
              <div className="glass rounded-3xl p-10 shadow-glass">
                <CandleVisual variant="brown-sugar" className="w-56 h-auto" />
              </div>
            </div>
            <div>
              <SectionHeader
                title="Crafted like your favourite cup"
                subtitle="Every candle begins with premium coconut-soy wax, phthalate-free fragrance oils, and the same care you'd expect from a luxury tea house."
                align="left"
              />
              <ul className="mt-10 space-y-6">
                {pillars.map((pillar) => (
                  <li key={pillar.title} className="flex gap-4">
                    <span className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 text-blush-600">
                      ✦
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink-900">{pillar.title}</h3>
                      <p className="text-ink-600 mt-1">{pillar.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-block mt-8 text-blush-600 font-medium hover:text-blush-700 transition-colors">
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ink-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-900/30 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-blush-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {customCta.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6">
            {customCta.title}
          </h2>
          <p className="text-cream-200/80 text-lg max-w-2xl mx-auto mb-10">
            {customCta.subtitle}
          </p>
          <Link to="/custom" className="btn-primary bg-blush-500 hover:bg-blush-400">
            {customCta.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}
