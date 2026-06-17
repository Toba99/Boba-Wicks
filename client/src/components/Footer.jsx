import { Link } from 'react-router-dom';

/**
 * Site footer with navigation, social links, and brand tagline.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-100">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-semibold text-white">
              Boba Wicks
            </Link>
            <p className="mt-4 text-cream-200/80 text-sm leading-relaxed max-w-xs">
              Luxury hand-poured candles inspired by the world&apos;s most beloved boba flavours.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-blush-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/scents', label: 'Shop Scents' },
                { to: '/custom', label: 'Custom Candles' },
                { to: '/about', label: 'Our Story' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-cream-200/70 hover:text-blush-300 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-blush-400 mb-4">
              Connect
            </h3>
            <ul className="space-y-3 text-sm text-cream-200/70">
              <li>
                <a href="mailto:hello@bobacandles.com" className="hover:text-blush-300 transition-colors">
                  hello@bobacandles.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush-300 transition-colors">
                  @bobacandles
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush-300 transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-blush-400 mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-cream-200/70 mb-4">
              New scents and seasonal drops — no spam, just glow.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-cream-200/50 focus:outline-none focus:ring-2 focus:ring-blush-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-blush-500 text-white text-sm font-medium hover:bg-blush-600 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream-200/50">
          <p>&copy; {year} Boba Wicks. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blush-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blush-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
