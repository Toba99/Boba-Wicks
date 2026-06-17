import { Link } from 'react-router-dom';
import { CandleVisual } from '../utils/candleVisuals';

const DEFAULT = {
  eyebrow: 'Luxury Boba-Inspired Candles',
  title: 'Sip the scent.',
  titleAccent: 'Feel the moment.',
  subtitle:
    'Hand-poured candles that capture your favourite boba flavours — from taro latte to brown sugar boba — in gift-worthy, long-lasting luxury.',
  ctaPrimary: 'Shop Scents',
  ctaSecondary: 'Create Custom Candle',
  stats: [
    { value: '50hr+', label: 'Burn time' },
    { value: '100%', label: 'Hand-poured' },
    { value: '12+', label: 'Signature scents' },
  ],
};

/**
 * Homepage hero with brand messaging, CTAs, and premium visual treatment.
 */
export default function Hero({ content }) {
  const hero = { ...DEFAULT, ...content?.hero };
  const stats = content?.stats ?? DEFAULT.stats;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blush-200/40 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-blush-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cream-200/30 blur-3xl" />
      </div>

      <div className="relative section-padding w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <p className="opacity-0-start animate-fade-in-up text-sm font-semibold tracking-[0.25em] uppercase text-blush-600">
              {hero.eyebrow}
            </p>
            <h1 className="opacity-0-start animate-fade-in-up animate-delay-100 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-900 leading-[1.1] tracking-tight">
              {hero.title}
              <br />
              <span className="italic text-blush-600">{hero.titleAccent}</span>
            </h1>
            <p className="opacity-0-start animate-fade-in-up animate-delay-200 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-lg">
              {hero.subtitle}
            </p>
            <div className="opacity-0-start animate-fade-in-up animate-delay-300 flex flex-wrap gap-4">
              <Link to="/scents" className="btn-primary">
                {hero.ctaPrimary}
                <ArrowIcon />
              </Link>
              <Link to="/custom" className="btn-secondary">
                {hero.ctaSecondary}
              </Link>
            </div>
            <div className="opacity-0-start animate-fade-in-up animate-delay-400 flex flex-wrap gap-8 pt-4 border-t border-blush-200/60">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="opacity-0-start animate-fade-in animate-delay-300 relative">
              <div className="glass rounded-3xl p-8 sm:p-12 shadow-glass animate-float">
                <CandleVisual variant="taro" className="w-48 sm:w-64 h-auto mx-auto" />
              </div>
              <div className="absolute -left-4 sm:-left-8 top-1/4 glass rounded-2xl px-4 py-3 shadow-soft animate-fade-in-up animate-delay-500">
                <p className="text-xs text-ink-500">Top rated</p>
                <p className="font-display text-lg text-ink-900">Taro Latte</p>
              </div>
              <div className="absolute -right-2 sm:-right-6 bottom-1/4 glass rounded-2xl px-4 py-3 shadow-soft animate-fade-in-up animate-delay-500">
                <p className="text-xs text-ink-500">New arrival</p>
                <p className="font-display text-lg text-blush-600">Ube Dream</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500 mt-0.5">{label}</p>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
