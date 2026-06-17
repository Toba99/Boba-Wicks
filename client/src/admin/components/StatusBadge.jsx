const STYLES = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  processing: 'bg-blue-50 text-blue-800 border-blue-200',
  in_review: 'bg-purple-50 text-purple-800 border-purple-200',
  shipped: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  cancelled: 'bg-red-50 text-red-800 border-red-200',
  open: 'bg-blush-50 text-blush-800 border-blush-200',
  resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  poured: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  inactive: 'bg-ink-50 text-ink-600 border-ink-200',
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase?.() ?? 'pending';
  const style = STYLES[key] || STYLES.pending;
  const label = key.replace(/_/g, ' ');

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${style}`}>
      {label}
    </span>
  );
}
