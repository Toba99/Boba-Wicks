export default function StatCard({ label, value, change, icon, accent = 'blush' }) {
  const accentClasses = {
    blush: 'bg-blush-50 text-blush-600 border-blush-100',
    ink: 'bg-ink-900/5 text-ink-700 border-ink-100',
    cream: 'bg-cream-200 text-ink-700 border-cream-300',
  };

  return (
    <div className="bg-white rounded-2xl border border-blush-100/80 p-5 sm:p-6 shadow-soft hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-ink-500">{label}</p>
          <p className="font-display text-3xl sm:text-4xl font-semibold text-ink-900 mt-2">{value}</p>
          {change != null && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        {icon && (
          <span
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${accentClasses[accent]}`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
