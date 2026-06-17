/** Simple responsive bar chart — no external dependencies */
export default function BarChart({ data, labelKey = 'month', valueKey = 'revenue', formatValue }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  const fmt = formatValue || ((v) => v);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 sm:gap-3 h-48 sm:h-56">
        {data.map((item, i) => {
          const pct = (item[valueKey] / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-[10px] sm:text-xs text-ink-500 font-medium hidden sm:block">
                {fmt(item[valueKey])}
              </span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-blush-500 to-blush-300 transition-all duration-500 hover:from-blush-600 min-h-[4px]"
                style={{ height: `${pct}%` }}
                title={`${item[labelKey]}: ${fmt(item[valueKey])}`}
              />
              <span className="text-[10px] sm:text-xs text-ink-600 font-medium">{item[labelKey]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
