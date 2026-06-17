import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '◈', end: true },
  { to: '/admin/analytics', label: 'Analytics', icon: '◉' },
  { to: '/admin/products', label: 'Products', icon: '◇' },
  { to: '/admin/categories', label: 'Categories', icon: '◎' },
  { to: '/admin/orders', label: 'Orders', icon: '▣' },
  { to: '/admin/custom-requests', label: 'Custom Requests', icon: '✦' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: '✉' },
  { to: '/admin/homepage', label: 'Homepage', icon: '⌂' },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  const { logout, user } = useAdminAuth();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-ink-900/50 z-40 lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-ink-900 text-cream-100 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <p className="font-display text-xl font-semibold text-white">Boba Wicks</p>
          <p className="text-xs text-cream-200/60 mt-1 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blush-500/20 text-blush-300 border border-blush-500/30'
                    : 'text-cream-200/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-blush-400 w-5 text-center">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-cream-200/70 hover:text-white rounded-xl hover:bg-white/5"
          >
            View storefront ↗
          </a>
          <button
            type="button"
            onClick={logout}
            className="w-full px-4 py-2.5 text-sm text-left text-cream-200/70 hover:text-blush-300 rounded-xl hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
