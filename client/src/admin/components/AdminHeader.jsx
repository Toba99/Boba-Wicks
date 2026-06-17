export default function AdminHeader({ title, subtitle, onMenuClick, actions }) {
  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 backdrop-blur-md border-b border-blush-100 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-blush-50 text-ink-700"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 truncate">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-ink-500 mt-0.5 truncate">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
