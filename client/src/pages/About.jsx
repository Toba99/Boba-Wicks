import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { CandleVisual } from '../utils/candleVisuals';

/** About page — brand story and quality pillars */
export default function About() {
  return (
    <div className="min-h-screen">
      <section className="section-padding bg-hero-gradient">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <SectionHeader
            title="Where boba meets candlelight"
            subtitle="Boba Wicks was born from a simple idea: the joy of ordering your perfect cup should live on long after the last sip."
            align="left"
          />
          <div className="flex justify-center">
            <div className="glass rounded-3xl p-10 shadow-glass">
              <CandleVisual variant="matcha" className="w-48 sm:w-56 h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto prose prose-lg text-ink-600 space-y-6">
          <p className="text-xl leading-relaxed text-ink-700">
            It started in a small kitchen, after one too many taro lattes and a longing for that
            cozy tea-shop feeling at home. We wondered: what if you could <em>light</em> your
            favourite boba order?
          </p>
          <p>
            Today, Boba Wicks is a luxury scent house dedicated to capturing the nostalgia,
            warmth, and indulgence of boba culture. Each candle is inspired by real drink
            profiles — from brown sugar boba to honeydew mist — and poured by hand in our studio.
          </p>
          <p>
            We believe gifting should feel special. That&apos;s why every order arrives in our
            signature blush packaging: tissue-wrapped, wax-sealed, and accompanied by a care card
            that guides you to the perfect first burn.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="The Boba Wicks promise"
            subtitle="Quality you can see, scent you can feel, gifts they'll remember."
            className="mx-auto mb-16"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Handmade',
                desc: 'Every candle is poured, wicked, and labelled by hand in small batches.',
                icon: '✋',
              },
              {
                title: 'Premium wax',
                desc: 'Coconut-soy blend for a clean burn and exceptional hot throw.',
                icon: '🕯️',
              },
              {
                title: 'Long-lasting scent',
                desc: '45–70 hours of fragrance from our signature oil blends.',
                icon: '✨',
              },
              {
                title: 'Gift-ready',
                desc: 'Luxury packaging designed for unboxing moments that delight.',
                icon: '🎁',
              },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                className="glass rounded-2xl p-8 text-center hover:shadow-glow transition-shadow duration-300"
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-display text-xl font-semibold text-ink-900">{title}</h3>
                <p className="text-ink-600 mt-3 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/scents" className="btn-primary">
              Explore Our Scents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
