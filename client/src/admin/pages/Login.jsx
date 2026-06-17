import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const [email, setEmail] = useState('admin@bobacandles.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-hero-gradient">
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-900/40 to-transparent" />
        <div className="relative text-center max-w-md">
          <p className="font-display text-5xl font-semibold text-white">Boba Wicks</p>
          <p className="text-cream-200/70 mt-4 text-lg">
            Manage products, orders, custom scents, and your storefront — all in one place.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 shadow-glass">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blush-600 mb-2">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink-900 mb-8">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-xs text-ink-500 text-center">
            Demo: admin@bobacandles.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
