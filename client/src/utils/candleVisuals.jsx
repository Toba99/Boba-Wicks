/**
 * SVG placeholder visuals for candle products — premium aesthetic without external images.
 */

const GRADIENTS = {
  taro: ['#c9b8e8', '#e8dff5', '#f5e6fa'],
  'brown-sugar': ['#8b5a3c', '#c4956a', '#e8c9a8'],
  matcha: ['#7a9e6e', '#a8c99a', '#d4e8c8'],
  lychee: ['#f4a8b8', '#fce4ec', '#fff0f3'],
  mango: ['#f5a623', '#ffd180', '#fff3e0'],
  honeydew: ['#a8e6cf', '#d4f5e9', '#e8faf3'],
  ube: ['#9b7ec8', '#c4b5e8', '#e8dff5'],
  rose: ['#e07a98', '#f4c0ce', '#fceef1'],
  winter: ['#e8eef5', '#f0f4f8', '#ffffff'],
  coconut: ['#f5f0e8', '#faf6ef', '#fffdf8'],
  strawberry: ['#e85a7a', '#f4a8b8', '#fce4ec'],
  custom: ['#e07a98', '#f4c0ce', '#faf3e8'],
};

export function CandleVisual({ variant = 'taro', className = '' }) {
  const colors = GRADIENTS[variant] ?? GRADIENTS.taro;
  const gradId = `grad-${variant}`;

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </linearGradient>
        <filter id={`glow-${variant}`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Jar */}
      <rect x="55" y="80" width="90" height="150" rx="8" fill="rgba(255,255,255,0.4)" stroke="rgba(224,122,152,0.3)" strokeWidth="1" />
      <rect x="60" y="90" width="80" height="130" rx="6" fill={`url(#${gradId})`} opacity="0.9" />
      {/* Wax surface */}
      <ellipse cx="100" cy="95" rx="38" ry="6" fill="rgba(255,255,255,0.5)" />
      {/* Wick */}
      <line x1="100" y1="70" x2="100" y2="95" stroke="#5c4a52" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="100" cy="68" rx="4" ry="3" fill="#e07a98" filter={`url(#glow-${variant})`} className="animate-shimmer" />
      {/* Lid */}
      <rect x="50" y="55" width="100" height="18" rx="4" fill="rgba(255,255,255,0.85)" stroke="rgba(224,122,152,0.2)" strokeWidth="1" />
      {/* Boba pearls decoration */}
      <circle cx="75" cy="200" r="5" fill={colors[0]} opacity="0.7" />
      <circle cx="100" cy="210" r="5" fill={colors[0]} opacity="0.7" />
      <circle cx="125" cy="200" r="5" fill={colors[0]} opacity="0.7" />
    </svg>
  );
}
