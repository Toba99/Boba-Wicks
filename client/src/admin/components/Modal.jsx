export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full ${sizeClass} bg-white rounded-2xl shadow-2xl border border-blush-100 max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blush-100">
          <h2 id="modal-title" className="font-display text-xl font-semibold text-ink-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blush-50 text-ink-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
