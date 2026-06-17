/**
 * Reusable section header with optional subtitle, alignment, and decorative line.
 */
export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left'
      ? 'text-left items-start'
      : align === 'right'
        ? 'text-right items-end'
        : 'text-center items-center';

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass} ${className}`}>
      <div className="flex items-center gap-3">
        {align !== 'left' && (
          <span className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent to-blush-400" />
        )}
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blush-600">
          Boba Wicks
        </span>
        {align !== 'right' && (
          <span className="hidden sm:block h-px w-12 bg-gradient-to-l from-transparent to-blush-400" />
        )}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-600 text-lg leading-relaxed max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
